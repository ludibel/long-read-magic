export type MetadataItem = {
    filename?: string,
    completeness?: number,
    contamination?: number,
    passGnuc?: boolean,
    trna?: number,
    s16?: number,
    s5?: number,
    s23?: number,
    downloadLink?: string,
}

export type Manifest = {
    projects: Project[]
}

export type Project = {
    name: string,
    samples: Sample[]
}

export type Sample = {
    name: string
    items: MetadataItem[]
}

export type TaxonomyTreeNode = {
    name: string
    children: TaxonomyTreeNode[],
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
    name: string
}
