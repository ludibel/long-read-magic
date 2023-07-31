import { GenomeDetails, GenomeDetailsShortened, GenomeQuality, Manifest, Project, Sample } from "./models";

function getBaseLinkPrefix(project: string, sample: string) {
    return `${process.env.NEXT_PUBLIC_S3_URL_PREFIX}/${project}/${sample}/`;
}

export function getBinsLinkPrefix(project: string, sample: string) {
    return getBaseLinkPrefix(project, sample) + "output_bins/";
}

export function getGenomeDownloadLink(project: string, sample: string, filename: string) {
    const prefix = getBinsLinkPrefix(project, sample);
    return `${prefix}${filename}.fa.gz`;
}

export function getFastaLink(project: string, sample: string) {
    return getBaseLinkPrefix(project, sample) + "assembly.fasta.gz";
}

export function getResultLink(project: string, sample: string) {
    return getBaseLinkPrefix(project, sample) + "result_merged.csv";
}

export function appendDataToManifestItems(manifest: Manifest): Manifest {
    const projects: Project[] = [];
    manifest.projects.forEach((project) => {
        const samples: Sample[] = [];
        project.samples.forEach((sample) => {
            const items: GenomeDetailsShortened[] = [];
            sample.items.forEach((item) => {
                const newItem = {...item};
                newItem.project = project.name;
                newItem.sample = sample.name;
                newItem.genomeQuality = detectGenomeQuality(item);
                newItem.downloadLink = getGenomeDownloadLink(newItem.project, newItem.sample, newItem.filename);
                newItem.detailsLink = `genomes/${newItem.project}/${newItem.sample}/${newItem.filename}`
                items.push(newItem);
            })
            const newSample = {...sample, items};
            samples.push(newSample);
        })
        const newProject = {...project, samples};
        projects.push(newProject);
    })

    const newManifest: Manifest = {projects}
    return newManifest
}

export function flattenManifest(manifest: Manifest): GenomeDetailsShortened[] {
    const flattenedArray: GenomeDetailsShortened[] = [];

    manifest.projects.forEach((project) => {
        project.samples.forEach((sample) => {
            sample.items.forEach((item) => {
                flattenedArray.push(item);
            })
        })
    })

    return flattenedArray
}

export function detectGenomeQuality(genome: GenomeDetailsShortened | GenomeDetails): GenomeQuality {
    if (genome.completeness > 90 && genome.contamination < 5 && genome.passGnuc === true && genome.trna >= 18 && genome.s16 >= 1 && genome.s5 >= 1 && genome.s23 >= 1) {
        return GenomeQuality.High;
    }
    if (genome.completeness >= 50 && genome.completeness <= 90 && genome.contamination < 10) {
        return GenomeQuality.Medium
    }
    if (genome.completeness < 50 && genome.contamination < 10) {
        return GenomeQuality.Low
    }
    return GenomeQuality.Unknown

}

export function countGenomesQuality(genomes: GenomeDetailsShortened[]) {
    let low = 0;
    let medium = 0;
    let high = 0;
    genomes.forEach(genome => {
        switch (genome.genomeQuality) {
            case GenomeQuality.Low:
                low++;
                break;
            case GenomeQuality.Medium:
                medium++;
                break;
            case GenomeQuality.High:
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

export function sortByFieldName(items, fieldName, isAscending): GenomeDetailsShortened[] {
    const sorted = [...items].sort((a, b) => {
        if (a[fieldName] < b[fieldName]) {
            return isAscending ? 1 : -1
        }
        if (a[fieldName] > b[fieldName]) {
            return isAscending ? -1 : 1
        }
        return 0
    });
    return sorted;
}
