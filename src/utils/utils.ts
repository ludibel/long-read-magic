import { ManifestItem } from "next/dist/server/load-components";
import { Manifest, MetadataItem } from "./models";

function getBaseLinkPrefix(project: string, sample: string) {
    return `https://gene-stag.s3.eu-central-1.amazonaws.com/${project}/${sample}/`;
}

export function getBinsLinkPrefix(project: string, sample: string) {
    return getBaseLinkPrefix(project, sample) + "output_bins/";
}

export function getFastaLink(project: string, sample: string) {
    return getBaseLinkPrefix(project, sample) + "assembly.fasta";
}

export function getResultLink(project: string, sample: string) {
    return getBaseLinkPrefix(project, sample) + "result_merged";
}

export function flattenManifest(manifest: Manifest): MetadataItem[] {
    const flattenedArray = [];

    manifest.projects.forEach((project) => {
        project.samples.forEach((sample) => {
            sample.items.forEach((item) => {
                item.downloadLink = getBinsLinkPrefix(project.name, sample.name) + item.filename;
                flattenedArray.push(item);
            })
        })
    })

    return flattenedArray
}