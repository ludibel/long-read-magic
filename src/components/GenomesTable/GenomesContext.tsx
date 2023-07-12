import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { GenomeContextType, GenomeDetailsShortened, GenomeOverviewFilterState, Manifest, Project, Sample } from "@/utils/models";
import manifestJson from "public/shortened-data-manifest.json"
import { countGenomesQuality, appendDataToManifestItems, sortByFieldName, flattenManifest } from "@/utils/utils";
import { defaultPageSize } from "@/components/GenomesTable/Pagination";
import { defaultFilterState } from "@/components/GenomesTable/Filters";
import { GenomeOverviewTexts } from "@/utils/texts";

const defaultSortSettings = {name: "", isAscending: true};

const GenomeContext = createContext<GenomeContextType>({
    manifest: {} as Manifest,
    flattenedManifest: [],
    selectedProject: undefined,
    setSelectedProject: () => {},
    selectedSample: undefined,
    setSelectedSample: () => {},
    filters: defaultFilterState,
    setFilters: () => {},
    binsCount: { low: 0, medium: 0, high: 0 },
    setBinsCount: () => {},
    items: [],
    setItems: () => {},
    filteredAndSortedItems: [],
    setFilteredAndSortedItems: () => {},
    paginatedItems: [],
    setPaginatedItems: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    pageSize: defaultPageSize,
    setPageSize: () => {},
    sortSettings: defaultSortSettings,
    changeSortSettings: () => {},
});

export const GenomeContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const enrichedManifest = useMemo(() => appendDataToManifestItems(manifestJson), []);
    const flattenedManifest = useMemo(() => flattenManifest(enrichedManifest), [])
    const manifest = useMemo<Manifest>(() => {
        const newProjects = enrichedManifest.projects.slice(0);
        newProjects.unshift({name: GenomeOverviewTexts.projectSelector.allProjects, samples: [{name: GenomeOverviewTexts.projectSelector.allSamples, items: flattenedManifest}]});
        return {projects: newProjects}
    }, []);


    const [selectedProject, setSelectedProject] = useState<Project>(manifest.projects[0]);
    const [selectedSample, setSelectedSample] = useState<Sample>(manifest.projects[0]?.samples[0]);
    const [filters, setFilters] = useState<GenomeOverviewFilterState>(defaultFilterState);
    const [binsCount, setBinsCount] = useState({ low: 0, medium: 0, high: 0 })
    const [items, setItems] = useState<GenomeDetailsShortened[]>(manifest.projects[0]?.samples[0]?.items)
    const [filteredAndSortedItems, setFilteredAndSortedItems] = useState([])
    const [paginatedItems, setPaginatedItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [sortSettings, setSortSettings] = useState(defaultSortSettings)

    useEffect(() => {
        const filteredItems = filter(items, filters);
        const newFilteredAndSortedItems = sortByFieldName(filteredItems, sortSettings.name, sortSettings.isAscending);
        const newBins = countGenomesQuality(newFilteredAndSortedItems);


        setFilteredAndSortedItems(newFilteredAndSortedItems);
        setCurrentPage(1);
        setBinsCount(newBins);

    }, [items, sortSettings, filters])

    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        setPaginatedItems(filteredAndSortedItems.slice(firstPageIndex, lastPageIndex));
    }, [filteredAndSortedItems, currentPage])

    const changeSortSettings = (fieldName) => {
        if (fieldName === sortSettings.name) {
            setSortSettings({ name: fieldName, isAscending: !sortSettings.isAscending })
        } else {
            setSortSettings({ name: fieldName, isAscending: true })
        }
    }

    const value: GenomeContextType = {
        manifest,
        flattenedManifest,
        selectedProject,
        setSelectedProject,
        selectedSample,
        setSelectedSample,
        filters,
        setFilters,
        binsCount,
        setBinsCount,
        items,
        setItems,
        paginatedItems,
        setPaginatedItems,
        filteredAndSortedItems,
        setFilteredAndSortedItems,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        sortSettings,
        changeSortSettings
    };

    return <GenomeContext.Provider value={value}>{children}</GenomeContext.Provider>;
};

export const useGenomeContext = () => useContext(GenomeContext);


function filter(items: GenomeDetailsShortened[], filters: GenomeOverviewFilterState): GenomeDetailsShortened[] {
    return items.filter((item) => (
        item.completeness >= filters.completenessMin && item.completeness <= filters.completenessMax &&
        item.contamination >= filters.contaminationMin && item.contamination <= filters.contaminationMax &&
        item.trna >= filters.trnaMin && item.trna <= filters.trnaMax &&
        item.s16 >= filters.s16Min && item.s16 <= filters.s16Max &&
        item.s5 >= filters.s5Min && item.s5 <= filters.s5Max &&
        item.s23 >= filters.s23Min && item.s23 <= filters.s23Max &&
        (filters.passGnuc === undefined || item.passGnuc === filters.passGnuc)))
}

