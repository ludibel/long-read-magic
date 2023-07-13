import { S3 } from "@aws-sdk/client-s3";
import * as fs from "fs";
import { GenomeDetails, GenomeDetailsShortened, Project, Sample, TaxonomyTreeNode } from "../utils/models";
import { generateTaxonomyMetadataForFile as appendTaxonomyMetadataForFile } from "./generate-taxonomy-tree";
import * as dotenv from "dotenv"
import { getGenomeDownloadLink, parseClassificationString } from "../utils/utils"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({path: ".env.local"})

const bucketName = process.env.S3_BUCKET_NAME;
const metadataFilename = "result_merged.csv"
const fullManifestPath = "public/full-data-manifest.json"
const shortenedManifestPath = "public/shortened-data-manifest.json"
const taxonomyTreeManifestPath = "public/taxonomy-tree-manifest.json"


// Define field names to copy from metadata csv file.
// The order of these fields should be the same as in the csv file.
// Field names don't have to match the names specified in csv file. Feel free to name them as you'd like. You will also have to change them in the models.ts file.
const fieldNames = [
    "filename", "completeness", "contamination", "completenessModelUsed", "translationTableUsed", "codingDensity",
    "contigN50", "averageGeneLength", "genomeSize", "gcContent", "totalCodingSequences", "additionalNotes",
    "nGenesCalled", "nGenesMapped", "nContigs", "taxonomicLevel", "proportionGenesRetainedInMajorClades",
    "genesRetainedIndex", "cladeSeparationScore", "contaminationPortion", "nEffectiveSurplusClades",
    "meanHitIdentity", "referenceRepresentationScore", "passGnuc", "trna", "s16", "s5", "s23", "classification",
    "fastaniReference", "fastaniReferenceRadius", "fastaniTaxonomy", "fastaniAni", "fastaniAf", "closestPlacementReference",
    "closestPlacementRadius", "closestPlacementTaxonomy", "closestPlacementAni", "closestPlacementAf", "pplacerTaxonomy",
    "classificationMethod", "note", "otherReferences", "msaPercent", "translationTable", "redValue", "warnings"
];

// Define the fields to keep for the table view
const fieldsToKeepForTable = [
    "filename", "completeness", "contamination", "passGnuc", "trna", "s16", "s5", "s23"
];

// Configure the AWS SDK
const s3 = new S3({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.S3_ACCESS_KEY_SECRET ?? ""
    },
});

async function generateMetadataForFile(input: string): Promise<{
    fullMetadata: GenomeDetailsShortened[],
    shortenedMetadata: GenomeDetailsShortened[]
}> {
    let lines = input.split("\n");
    lines = lines.slice(1)

    const fullMetadata: GenomeDetailsShortened[] = []; // contains all data
    const shortenedMetadata: GenomeDetailsShortened[] = []; // contains only the fields to keep in the table


    lines.forEach(line => {
        const values = line.split(",");

        // skip empty lines
        if (values.length <= 1) {
            return;
        }

        //@ts-ignore
        const item: GenomeDetails = {};
        const shortenedItem: GenomeDetailsShortened = {};


        fieldNames.forEach((fieldName, index) => {
            const key = fieldNames[index];
            const value = values[index];

            if (!isNaN(parseFloat(value))) {
                //@ts-ignore
                item[key] = parseFloat(value);
            } else if (value === "N/A") {
                //@ts-ignore
                item[key] = null
            } else if (key === "passGnuc") {
                //@ts-ignore
                item[key] = value.toLowerCase() === "true"
            } else if (key === "classification" && value) {
                item.classification = parseClassificationString(value);
            } else if (key === "otherReferences" && value) {
                const references = value.split(";").map((item) => {
                    const reference = item.split("---");
                    return {
                        genomeId: reference[0],
                        speciesName: reference[1],
                        radius: parseFloat(reference[2]),
                        fastaniAni: parseFloat(reference[3]),
                        fastaniAf: parseFloat(reference[4]),

                    }
                });
                item.otherReferences = references;
            } else {
                //@ts-ignore
                item[key] = value;
            }
        });

        fieldsToKeepForTable.forEach((fieldName, index) => {
            //@ts-ignore
            shortenedItem[fieldName] = item[fieldName];
        });

        fullMetadata.push(item);
        shortenedMetadata.push(shortenedItem);
    })

    return {fullMetadata, shortenedMetadata};

}

function appendDownloadLink(items: GenomeDetailsShortened[], project: string, sample: string): void {
    items.forEach((item) => {
        item.downloadLink = getGenomeDownloadLink(project, sample, item.filename);
    });
}

async function processS3Bucket(metatadataFilename: string) {
    try {
        const shortenedProjects: Project[] = [];
        const fullProjects: Project[] = [];
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

            const shortenedSamples: Sample[] = []
            const fullSamples: Sample[] = []

            for (const sampleFolder of sampleFolders.CommonPrefixes) {
                if (sampleFolder.Prefix === undefined) {
                    throw new Error(`No sample folders found in the ${projectFolder.Prefix} folder.`);
                }

                const sampleName = sampleFolder.Prefix.split("/")[1];

                // Download the result.csv file from the current sample folder
                const csvMetadataFileKey = sampleFolder.Prefix + metatadataFilename;
                const csvMetadataFile = await s3.getObject({Bucket: bucketName, Key: csvMetadataFileKey});

                if (csvMetadataFile.Body === undefined) {
                    throw new Error(`No ${csvMetadataFileKey} file found in the ${sampleFolder.Prefix} folder.`)
                }

                const csvMetadataText = await csvMetadataFile.Body.transformToString()

                const {fullMetadata, shortenedMetadata} = await generateMetadataForFile(csvMetadataText);
                appendTaxonomyMetadataForFile(csvMetadataText, projectName, sampleName, taxonomyTree);

                appendDownloadLink(fullMetadata, projectName, sampleName);

                fullSamples.push({name: sampleName, items: fullMetadata});
                shortenedSamples.push({name: sampleName, items: shortenedMetadata});
            }
            fullProjects.push({name: projectName, samples: fullSamples});
            shortenedProjects.push({name: projectName, samples: shortenedSamples});
        }

        // Save the final JSON structure to a file
        fs.writeFileSync(fullManifestPath, JSON.stringify({projects: fullProjects}, null, 0));
        fs.writeFileSync(shortenedManifestPath, JSON.stringify({projects: shortenedProjects}, null, 0));
        fs.writeFileSync(taxonomyTreeManifestPath, JSON.stringify({tree: taxonomyTree}, null, 0));
        console.log("Final JSON output saved");
    } catch (error) {
        console.error("Error processing S3 bucket:", error);
    }
}

// Run the processS3Bucket function
processS3Bucket(metadataFilename)
    .then(() => console.log("S3 bucket processed successfully."))
    .catch((error) => console.error("Error processing S3 bucket:", error));
