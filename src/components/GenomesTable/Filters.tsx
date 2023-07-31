import React, { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { useGenomeContext } from "@/components/GenomesTable/GenomesContext";
import { GenomeOverviewFilterState } from "@/utils/models";
import { GenomeOverviewTexts, GlobalTexts } from "@/utils/texts";
import { Dropdown } from "@/components/Dropdown";
import { FilterRange } from "@/components/GenomesTable/FilterRange";
import Image from "next/image";
import highQualityBins from "../../../public/images/high-quality-bin.svg"
import mediumQualityBins from "../../../public/images/medium-quality-bin.svg"
import lowQualityBins from "../../../public/images/low-quality-bin.svg"


export const defaultFilterState: GenomeOverviewFilterState = {
    completenessMin: 0,
    completenessMax: 100,
    contaminationMin: 0,
    contaminationMax: 999,
    passGnuc: undefined,
    trnaMin: 0,
    trnaMax: 999,
    s16Min: 0,
    s16Max: 999,
    s5Min: 0,
    s5Max: 999,
    s23Min: 0,
    s23Max: 999
};

const highQualityFilterState = {
    ...defaultFilterState,
    completenessMin: 90.0,
    contaminationMax: 5.0,
    passGnuc: true,
    trnaMin: 18,
    s16Min: 1,
    s5Min: 1,
    s23Min: 1
}
const mediumQualityFilterState = {...defaultFilterState, completenessMin: 50, completenessMax: 90, contaminationMax: 10.0}
const lowQualityFilterState = {...defaultFilterState, completenessMax: 50.0, contaminationMax: 10.0}

export type FiltersProps = {
    className?: string;
}

const texts = GenomeOverviewTexts.filters;
const genomeQualities = [
    {label: texts.genomeQualityHigh, value: highQualityFilterState},
    {label: texts.genomeQualityMedium, value: mediumQualityFilterState},
    {label: texts.genomeQualityLow, value: lowQualityFilterState},
]
const gnucOptions = [
    {label: texts.passGnucAll, value: undefined},
    {label: texts.passGnucYes, value: true},
    {label: texts.passGnucNo, value: false},
]


export const Filters: FC<FiltersProps> = ({className}) => {
    const {
        filters,
        setFilters,
        binsCount,
    } = useGenomeContext();

    const [currentGnuc, setCurrentGnuc] = useState(gnucOptions[0]);

    function setGenomeQuality(selectItem) {
        setFilters(selectItem.value);
    }

    function setGnuc(selectItem) {
        setCurrentGnuc(selectItem)
        setFilters({...filters, passGnuc: selectItem.value})
    }

    function resetFilters() {
        setCurrentGnuc(gnucOptions[0])
        setFilters(defaultFilterState);
    }

    return (
        <div className={clsx(className, "border")}>
            <p className="text-lg bg-darkBlue text-white px-4 py-2">{texts.title}</p>
            <div className="p-6">

                <div className="flex gap-8">
                    <div>
                        <p className="text-lg font-bold mb-2">{texts.genomeQualityLabel}</p>
                        <Dropdown options={genomeQualities} onChange={setGenomeQuality} value={null}
                                  placeholder={GlobalTexts.selectPlaceholder} id="genome-quality-selector"/>
                    </div>

                    <div>
                        <p className="text-lg font-bold mb-2">{texts.passGnucLabel}</p>
                        <Dropdown options={gnucOptions} onChange={setGnuc} value={currentGnuc} id="gnuc-selector"/>
                    </div>

                    <button
                        className="mt-auto mb-3 text-gray-500 hover:text-black"
                        onClick={() => resetFilters()}>
                        {texts.clearFiltersButton}
                    </button>
                </div>

                <hr className="my-8"/>


                <div className="flex flex-col gap-8 mb-8">
                    <div className="flex flex-wrap gap-8 mb-4">
                        <FilterRange label={texts.completenessLabel} min={filters.completenessMin} max={filters.completenessMax}
                                     onMinChange={(value) => setFilters({...filters, completenessMin: value})}
                                     onMaxChange={(value) => setFilters({...filters, completenessMax: value})}
                                     minBoundary={0} maxBoundary={100}/>

                        <FilterRange label={texts.contaminationLabel} min={filters.contaminationMin} max={filters.contaminationMax}
                                     onMinChange={(value) => setFilters({...filters, contaminationMin: value})}
                                     onMaxChange={(value) => setFilters({...filters, contaminationMax: value})}
                                     minBoundary={0} maxBoundary={1000}/>
                        <FilterRange label={texts.trnaLabel} min={filters.trnaMin} max={filters.trnaMax}
                                     onMinChange={(value) => setFilters({...filters, trnaMin: value})}
                                     onMaxChange={(value) => setFilters({...filters, trnaMax: value})}
                                     minBoundary={0} maxBoundary={1000}/>

                        <FilterRange label={texts.s16Label} min={filters.s16Min} max={filters.s16Max}
                                     onMinChange={(value) => setFilters({...filters, s16Min: value})}
                                     onMaxChange={(value) => setFilters({...filters, s16Max: value})}
                                     minBoundary={0} maxBoundary={1000}/>
                        <FilterRange label={texts.s5Label} min={filters.s5Min} max={filters.s5Max}
                                     onMinChange={(value) => setFilters({...filters, s5Min: value})}
                                     onMaxChange={(value) => setFilters({...filters, s5Max: value})}
                                     minBoundary={0} maxBoundary={1000}/>
                        <FilterRange label={texts.s23Label} min={filters.s23Min} max={filters.s23Max}
                                     onMinChange={(value) => setFilters({...filters, s23Min: value})}
                                     onMaxChange={(value) => setFilters({...filters, s23Max: value})}
                                     minBoundary={0} maxBoundary={1000}/>
                    </div>
                </div>

                <div>
                    <div className="mb-4">
                        <Image src={highQualityBins} alt="high quality bins" height={40} width={40} className="inline-block mr-4"/>
                        <span>{texts.highQualityGenomesCountLabel} <span className="text-green-500">{binsCount.high}</span></span>
                    </div>
                    <div className="mb-4">
                        <Image src={mediumQualityBins} alt="high quality bins" height={40} width={40} className="inline-block mr-4"/>
                        <span>{texts.mediumQualityGenomesCountLabel} <span className="text-yellow-500">{binsCount.medium}</span></span>
                    </div>
                    <div>
                        <Image src={lowQualityBins} alt="high quality bins" height={40} width={40} className="inline-block mr-4"/>
                        <span>{texts.lowQualityGenomesCountLabel} <span className="text-pink-500">{binsCount.low}</span></span>
                    </div>
                </div>

            </div>
        </div>
    )
};
