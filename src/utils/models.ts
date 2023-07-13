export type GenomeDetailsShortened = {
    filename?: string
    completeness?: number
    contamination?: number
    passGnuc?: boolean
    trna?: number
    s16?: number
    s5?: number
    s23?: number
    //extra fields appended after downloading the data file
    downloadLink?: string
    detailsLink?: string
    project?: string
    sample?: string
    genomeQuality?: GenomeQuality
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

export enum GenomeQuality {
    Low,
    Medium,
    High,
    Unknown
}

export type GenomeContextType = {
    manifest: Manifest;
    flattenedManifest: GenomeDetailsShortened[];
    selectedProject: Project
    setSelectedProject: (project: Project) => void;
    selectedSample: Sample
    setSelectedSample: (sample: Sample) => void;
    filters: GenomeOverviewFilterState;
    binsCount: { low: number, medium: number, high: number };
    setBinsCount: (bins: { low: number, medium: number, high: number }) => void;
    setFilters: (filters: GenomeOverviewFilterState) => void;
    items: GenomeDetailsShortened[];
    setItems: (items: GenomeDetailsShortened[]) => void;
    filteredAndSortedItems: GenomeDetailsShortened[];
    setFilteredAndSortedItems: (items: GenomeDetailsShortened[]) => void;
    paginatedItems: GenomeDetailsShortened[];
    setPaginatedItems: (items: GenomeDetailsShortened[]) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    sortSettings: { name: string, isAscending: boolean };
    changeSortSettings: (fieldName: string) => void;
};

export type GenomeOverviewFilterState = {
    completenessMin: number;
    completenessMax: number;
    contaminationMin: number;
    contaminationMax: number;
    passGnuc?: boolean;
    trnaMin: number;
    trnaMax: number;
    s16Min: number;
    s16Max: number;
    s5Min: number;
    s5Max: number;
    s23Min: number;
    s23Max: number;
};

