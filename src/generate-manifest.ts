import { S3 } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { MetadataItem, Project, ProjectVariation } from "./utils/models";
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

async function csvToJson(input: string): Promise<any> {
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

            if (key === "filename") {
                item[key] = `${value}.fa`;
            } else if (!isNaN(parseFloat(value))) {
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

    return {"items": resultArray};

}

function appendDownloadLink(json: { items: MetadataItem[] }, linkPrefix: string): void {
    json.items.forEach((item) => {
        item.downloadLink = `${linkPrefix}/${item.filename}`;
    });
}

async function processS3Bucket() {
    try {
        const projects: Project[] = []

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

            // List all project variation folders in the current project folder
            const projectVariationFolders = await s3
                .listObjects({Bucket: bucketName, Delimiter: "/", Prefix: projectFolder.Prefix});

            if (projectVariationFolders.CommonPrefixes === undefined) {
                throw new Error(`No project variation folders found in the ${projectFolder.Prefix} folder.`);
            }

            const variations: ProjectVariation[] = []

            for (const projectVariationFolder of projectVariationFolders.CommonPrefixes) {
                if (projectVariationFolder.Prefix === undefined) {
                    throw new Error(`No project variation folders found in the ${projectFolder.Prefix} folder.`);
                }

                const projectVariationName = projectVariationFolder.Prefix.split("/")[1];

                // Download the result.csv file from the current project variation folder
                const csvMetadataFileKey = `${projectVariationFolder.Prefix}result.csv`;
                const csvMetadataFile = await s3.getObject({Bucket: bucketName, Key: csvMetadataFileKey});

                if (csvMetadataFile.Body === undefined) {
                    throw new Error(`No result.csv file found in ${csvMetadataFileKey}`)
                }

                const csvMetadata = await csvMetadataFile.Body.transformToString()

                const jsonOutput = await csvToJson(csvMetadata);
                const linkPrefix = `https://gene-stag.s3.eu-central-1.amazonaws.com/${projectName}/${projectVariationName}/output_bins`;

                appendDownloadLink(jsonOutput, linkPrefix);

                variations.push({name: projectVariationName, items: jsonOutput.items});
            }
            projects.push({name: projectName, variations: variations});
        }

        // Save the final JSON structure to a file
        const json = {projects};
        fs.writeFileSync("public/data-manifest.json", JSON.stringify(json, null, 2));
        console.log("Final JSON output saved");
    } catch (error) {
        console.error("Error processing S3 bucket:", error);
    }
}

// Run the processS3Bucket function
processS3Bucket()
    .then(() => console.log("S3 bucket processed successfully."))
    .catch((error) => console.error("Error processing S3 bucket:", error));
