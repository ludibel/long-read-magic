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
    variations: ProjectVariation[]
}

export type ProjectVariation = {
    name: string
    items: MetadataItem[]
}
