import { BinQuality, GenomeDetails, GenomeDetailsShortened, Manifest } from "./models";

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

export function flattenManifest(manifest: Manifest): GenomeDetailsShortened[] {
    const flattenedArray: GenomeDetailsShortened[] = [];

    manifest.projects.forEach((project) => {
        project.samples.forEach((sample) => {
            sample.items.forEach((item) => {
                item.downloadLink = getBinsLinkPrefix(project.name, sample.name) + item.filename;
                item.project = project.name;
                item.sample = sample.name;
                flattenedArray.push(item);
            })
        })
    })

    return flattenedArray
}

export function detectBinQuality(bin: GenomeDetailsShortened | GenomeDetails): BinQuality {
    if (bin.completeness > 90 && bin.contamination < 5 && bin.passGnuc === true && bin.trna >= 18 && bin.s16 >= 1 && bin.s5 >= 1 && bin.s23 >= 1) {
        return BinQuality.High;
    }
    if (bin.completeness >= 50 && bin.completeness <= 90 && bin.contamination < 10) {
        return BinQuality.Medium
    }
    if (bin.contamination < 50 && bin.contamination < 10) {
        return BinQuality.Low
    }
    return BinQuality.Unknown

}

export function countBinsQuality(bins: GenomeDetailsShortened[]) {
    let low = 0;
    let medium = 0;
    let high = 0;
    bins.forEach(bin => {
        switch (detectBinQuality(bin)) {
            case BinQuality.Low:
                low++;
                break;
            case BinQuality.Medium:
                medium++;
                break;
            case BinQuality.High:
                high++;
                break;
        }
    })
    return {low, medium, high}
}

export function parseClassificationString(value: string) {
    const classification = value.split(";").map((item) => item.trim().substring(3));
    return {
        domain: classification[0],
        phylum: classification[1],
        class: classification[2],
        order: classification[3],
        family: classification[4],
        genus: classification[5],
        species: classification[6],
    };
}
