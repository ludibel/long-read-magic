export type GenomeDetailsShortened = {
    filename?: string
    completeness?: number
    contamination?: number
    passGnuc?: boolean
    trna?: number
    s16?: number
    s5?: number
    s23?: number
    downloadLink?: string
    project?: string
    sample?: string
}

export type Manifest = {
    projects: Project[]
}

export type Project = {
    name: string
    samples: Sample[]
}

export type Sample = {
    name: string
    items: GenomeDetailsShortened[]
}

export type TaxonomyTreeNode = {
    name: string
    children: TaxonomyTreeNode[]
    count: number
    binDetails?: BinDetails[]
}

export type BinDetails = {
    project: string
    sample: string
    name: string

}

export type KeyValuePair = {
    key: string
    value: string
}

export type GenomeDetails = {
    filename: string;
    completeness: number;
    contamination: number;
    completenessModelUsed: string;
    translationTableUsed: number;
    codingDensity: number;
    contigN50: number;
    averageGeneLength: number;
    genomeSize: number;
    gcContent: number;
    totalCodingSequences: number;
    additionalNotes: string;
    nGenesCalled: number;
    nGenesMapped: number;
    nContigs: number;
    taxonomicLevel: string;
    proportionGenesRetainedInMajorClades: number;
    genesRetainedIndex: number;
    cladeSeparationScore: number;
    contaminationPortion: number;
    nEffectiveSurplusClades: number;
    meanHitIdentity: number;
    referenceRepresentationScore: number;
    passGnuc: boolean;
    trna: number;
    s16: number;
    s5: number;
    s23: number;
    classification?: Classification;
    fastaniReference?: string;
    fastaniReferenceRadius?: number;
    fastaniTaxonomy?: string;
    fastaniAni?: number;
    fastaniAf?: number;
    closestPlacementReference?: string;
    closestPlacementRadius?: number;
    closestPlacementTaxonomy?: string;
    closestPlacementAni?: number;
    closestPlacementAf?: number;
    pplacerTaxonomy?: string;
    classificationMethod?: string;
    note?: string;
    otherReferences?: OtherReference[];
    msaPercent?: number;
    translationTable?: number;
    redValue?: number;
    warnings?: string;
    downloadLink?: string
}

export type Classification = {
    domain: string
    phylum: string
    class: string
    order: string
    family: string
    genus: string
    species: string
}

export type OtherReference = {
    genomeId: string
    speciesName: string,
    radius: number,
    fastaniAni: number,
    fastaniAf: number
}

export enum BinQuality {
    Low,
    Medium,
    High,
    Unknown
}
