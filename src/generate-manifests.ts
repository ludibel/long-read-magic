import { S3 } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { MetadataItem, Project, Sample, TaxonomyTreeNode } from "./utils/models";
import {generateTaxonomyMetadataForFile as appendTaxonomyMetadataForFile} from "./generate-taxonomy-tree";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '.env.local' })

// Configure the AWS SDK
const s3 = new S3({
    region: "eu-central-1",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.S3_ACCESS_KEY_SECRET ?? ""
    },
});
const bucketName = "gene-stag";
const metadataFilename = "result_merged.csv"
const manifestPath = "public/data-manifest.json"
const taxonomyTreeManifestPath = "public/taxonomy-tree-manifest.json"


// Define CSV field names
const fieldNames = [
    "filename", "completeness", "contamination", "completeness_model_used", "translation_table_used", "coding_density",
    "contig_n50", "average_gene_length", "genome_size", "gc_content", "total_coding_sequences", "additional_notes",
    "n_genes_called", "n_genes_mapped", "n_contigs", "taxonomic_level", "proportion_genes_retained_in_major_clades",
    "genes_retained_index", "clade_separation_score", "contamination_portion", "n_effective_surplus_clades",
    "mean_hit_identity", "reference_representation_score", "passGnuc", "trna", "s16", "s5", "s23"
];

// Define the fields to keep in the output JSON
const fieldsToKeep = [
    "filename", "completeness", "contamination", "passGnuc", "trna", "s16", "s5", "s23"
];

async function generateMetadataForFile(input: string): Promise<{items: MetadataItem[]}> {
    let lines = input.split("\n");
    lines = lines.slice(1)

    const resultArray: MetadataItem[] = [];


    lines.forEach(line => {
        const values = line.split(",");

        // skip empty lines
        if (values.length <= 1) {
            return;
        }

        const item: MetadataItem = {};

        fieldNames.forEach((fieldName, index) => {
            const key = fieldNames[index];
            const value = values[index];

            if (!fieldsToKeep.includes(key)) {
                return;
            }

            if (!isNaN(parseFloat(value))) {
                //@ts-ignore
                item[key] = parseFloat(value);
            } else if (key === "passGnuc") {
                //@ts-ignore
                item[key] = value.toLowerCase() === "true"
            } else {
                //@ts-ignore
                item[key] = value;
            }
        });

        resultArray.push(item);
    })

    return {items: resultArray};

}

function appendDownloadLink(json: { items: MetadataItem[] }, linkPrefix: string): void {
    json.items.forEach((item) => {
        item.downloadLink = `${linkPrefix}/${item.filename}`;
    });
}

async function processS3Bucket(metatadataFilename: string) {
    try {
        const projects: Project[] = [];
        const taxonomyTree: TaxonomyTreeNode = {name: "root", children: [], count: 0};

        // List all project folders in the root level of the bucket
        const projectFolders = await s3.listObjects({Bucket: bucketName, Delimiter: "/"});

        if (projectFolders.CommonPrefixes === undefined) {
            throw new Error("No project folders found in the root level of the bucket.");
        }

        for (const projectFolder of projectFolders.CommonPrefixes) {
            if (projectFolder.Prefix === undefined) {
                continue;
            }

            const projectName = projectFolder.Prefix.split("/")[0];

            // List all sample folders in the current project folder
            const sampleFolders = await s3
                .listObjects({Bucket: bucketName, Delimiter: "/", Prefix: projectFolder.Prefix});

            if (sampleFolders.CommonPrefixes === undefined) {
                throw new Error(`No sample folders found in the ${projectFolder.Prefix} folder.`);
            }

            const samples: Sample[] = []

            for (const sampleFolder of sampleFolders.CommonPrefixes) {
                if (sampleFolder.Prefix === undefined) {
                    throw new Error(`No sample folders found in the ${projectFolder.Prefix} folder.`);
                }

                const sampleName = sampleFolder.Prefix.split("/")[1];

                // Download the result.csv file from the current sample folder
                const csvMetadataFileKey = sampleFolder.Prefix + metatadataFilename;
                const csvMetadataFile = await s3.getObject({Bucket: bucketName, Key: csvMetadataFileKey});

                if (csvMetadataFile.Body === undefined) {
                    throw new Error(`No result.csv file found in ${csvMetadataFileKey}`)
                }

                const csvMetadataText = await csvMetadataFile.Body.transformToString()

                const metadata = await generateMetadataForFile(csvMetadataText);
                appendTaxonomyMetadataForFile(csvMetadataText, projectName, sampleName, taxonomyTree);

                //const linkPrefix = `https://gene-stag.s3.eu-central-1.amazonaws.com/${projectName}/${projectVariationName}/output_bins`;
                //appendDownloadLink(jsonOutput, linkPrefix);

                samples.push({name: sampleName, items: metadata.items});
            }
            projects.push({name: projectName, samples: samples});
        }

        // Save the final JSON structure to a file
        fs.writeFileSync(manifestPath, JSON.stringify({projects}, null, 2));
        fs.writeFileSync(taxonomyTreeManifestPath, JSON.stringify({tree: taxonomyTree}, null, 2));
        console.log("Final JSON output saved");
    } catch (error) {
        console.error("Error processing S3 bucket:", error);
    }
}

// Run the processS3Bucket function
processS3Bucket(metadataFilename)
    .then(() => console.log("S3 bucket processed successfully."))
    .catch((error) => console.error("Error processing S3 bucket:", error));
