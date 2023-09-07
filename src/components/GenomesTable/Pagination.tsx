import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import React, { FC } from "react";
import clsx from "clsx";
import { useGenomeContext } from "@/components/GenomesTable/GenomesContext";
import { GenomeOverviewTexts } from "@/utils/texts";
import Select from "react-select";

export const defaultPageSize = 100;

export type PaginationProps = {
    className?: string
}
export const Pagination: FC<PaginationProps> = ({className}) => {
    const {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        filteredAndSortedItems,
    } = useGenomeContext();
    const texts = GenomeOverviewTexts.pagination;

    const totalCount = filteredAndSortedItems.length;
    const totalPageCount = Math.ceil(totalCount / pageSize);

    function onPageSizeChange(selectItem) {
        setPageSize(selectItem.value)
    }

    function onPageInputChange(event) {
        const page = event.target.value ? Number(event.target.value) : NaN;
        if (Number.isNaN(page)) {
            return;
        }
        if (page > totalPageCount) {
            setCurrentPage(totalPageCount);
            return;
        } else if (page < 1) {
            setCurrentPage(1);
            return;
        }
        setCurrentPage(page);
    }

    const pageSizeOptions = [{label: 100, value: 100}, {label: 500, value: 500}, {label: 1000, value: 1000}]

    const itemsCountLabel = texts.itemsCountLabel.replace("%{from}", `${(currentPage - 1) * pageSize + 1}`)
                                 .replace("%{to}", `${Math.min(currentPage * pageSize, totalCount)}`)
                                 .replace("%{count}", `${totalCount}`);
    const pagesCountLabel = texts.pagesCountLabel.replace("%{count}", `${totalPageCount}`);

    const pageSwitchersColorClass = "cursor-pointer disabled:text-navyBlue-light text-navyBlue hover:text-navyBlue-light";

    return (
        <>
            <div className={clsx("flex flex-wrap justify-center lg:justify-between gap-4", className)}>
                <div className="flex">
                    <span className="mr-2">{texts.itemsPerPage}</span>
                    <Select options={pageSizeOptions} value={{label: pageSize, value: pageSize}} onChange={onPageSizeChange}
                            unstyled={true}
                            className="mr-4"
                            classNames={{
                                control: (state) =>
                                    "bg-white border border-gray-300 text-center rounded focus:outline-none flex w-[60px] !min-h-[30px]",
                                option: (state) => "p-2 bg-white hover:bg-gray-100",
                                menu: (state) => "border"
                            }}/>
                    <span>{itemsCountLabel}</span>
                </div>
                <div className="flex items-center justify-center">
                    <button className={clsx(pageSwitchersColorClass, "flex items-cnter justify-ceter")} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                        <ChevronDoubleLeftIcon className="w-5 h-5 mr-6 mt-[2px]"/>
                    </button>

                    <button
                        className={clsx("flex mr-4 flex items-center justify-center", pageSwitchersColorClass)}
                        onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        <ChevronLeftIcon className="w-5 h-5 mt-[2px]"/>
                        <span>{texts.previous}</span>
                    </button>

                    <div className="flex ">
                    <input value={currentPage} className="w-12 h-6 text-center mr-2" onChange={onPageInputChange}/>
                    <span className="mr-6">{pagesCountLabel}</span>
                    </div>

                    <button className={clsx("flex mr-6 flex items-center justify-center", pageSwitchersColorClass)}
                            onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPageCount}>
                        <span>{texts.next}</span>
                        <ChevronRightIcon className="w-5 h-5 mt-[2px]"/>
                    </button>

                    <button className={clsx(pageSwitchersColorClass, "flex items-center justify-center")} onClick={() => setCurrentPage(totalPageCount)}
                            disabled={currentPage === totalPageCount}>
                        <ChevronDoubleRightIcon className="w-5 h-5 mt-[2px]"/>
                    </button>
                </div>
            </div>
        </>
    )
};

export default Pagination;
