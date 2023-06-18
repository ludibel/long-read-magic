import { ChevronDownIcon, ChevronUpIcon, ArrowDownTrayIcon } from "@heroicons/react/20/solid"
import React, { FC, useEffect, useState } from "react";
import { GenomeDetailsShortened } from "@/utils/models";
import Link from "next/link";
import clsx from "clsx";
import { countBinsQuality, getFastaLink, getResultLink } from "@/utils/utils";
import Pagination from "./Pagination";

export type TableProps = {
    items: GenomeDetailsShortened[]
    project?: string
    sample?: string
}

export const Table: FC<TableProps> = ({ project, sample, items }) => {
    const fields = [
        { name: "filename", label: "Filename" },
        { name: "completeness", label: "Completeness" },
        { name: "contamination", label: "Contamination" },
        { name: "trna", label: "tRNA" },
        { name: "s16", label: "16s" },
        { name: "s5", label: "5s" },
        { name: "s23", label: "23s" },
        { name: "passGnuc", label: "Pass.GNUC" }]
    const pageSize = 20;
    const defaultFilterState = {
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
    }

    const highQualityFilterState = {
        ...defaultFilterState,
        completenessMin: 90.0000001,
        contaminationMax: 4.9999999,
        passGnuc: true,
        trnaMin: 18,
        s16Min: 1,
        s5Min: 1,
        s23Min: 1
    }
    const mediumQualityFilterState = { ...defaultFilterState, completenessMin: 50, completenessMax: 90, contaminationMax: 9.9999999 }
    const lowQualityFilterState = { ...defaultFilterState, completenessMax: 49.9999999, contaminationMax: 9.9999999 }


    const [paginatedItems, setPaginatedItems] = useState(items)
    const [nonPaginatedItems, setNonPaginatedItems] = useState(items)
    const [currentPage, setCurrentPage] = useState(1);
    const [sortSettings, setSortSettings] = useState({ name: fields[0], isAscending: true })
    const [filters, setFilters] = useState(defaultFilterState)

    const [bins, setBins] = useState({ low: 0, medium: 0, high: 0 })

    useEffect(() => {
        const filteredItems = filter(items);
        const filteredAndSortedItems = sort(filteredItems, sortSettings.name, sortSettings.isAscending);


        setNonPaginatedItems(filteredAndSortedItems);
        setCurrentPage(1);

        const newBins = countBinsQuality(filteredAndSortedItems);
        setBins(newBins);

    }, [items, sortSettings, filters])

    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        setPaginatedItems(nonPaginatedItems.slice(firstPageIndex, lastPageIndex));
    }, [nonPaginatedItems, currentPage])


    function changeSortSettings(fieldName) {
        if (fieldName === sortSettings.name) {
            setSortSettings({ name: fieldName, isAscending: !sortSettings.isAscending })
        } else {
            setSortSettings({ name: fieldName, isAscending: true })
        }
    }

    function filter(items: GenomeDetailsShortened[]): GenomeDetailsShortened[] {
        return items.filter((item) => (
            item.completeness >= filters.completenessMin && item.completeness <= filters.completenessMax &&
            item.contamination >= filters.contaminationMin && item.contamination <= filters.contaminationMax &&
            item.trna >= filters.trnaMin && item.trna <= filters.trnaMax &&
            item.s16 >= filters.s16Min && item.s16 <= filters.s16Max &&
            item.s5 >= filters.s5Min && item.s5 <= filters.s5Max &&
            item.s23 >= filters.s23Min && item.s23 <= filters.s23Max &&
            (filters.passGnuc === undefined || item.passGnuc === filters.passGnuc)))
    }

    function sort(items, fieldName, isAscending): GenomeDetailsShortened[] {
        const sorted = [...items].sort((a, b) => {
            if (a[fieldName] < b[fieldName]) {
                return isAscending ? -1 : 1
            }
            if (a[fieldName] > b[fieldName]) {
                return isAscending ? 1 : -1
            }
            return 0
        });
        return sorted;
    }

    return (
        <>
            {sample && <div className="mb-8">
                <Link href={getFastaLink(project, sample)} className="text-indigo-600 hover:text-indigo-900">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                        <span><ArrowDownTrayIcon className="w-5 h-5 inline mb-1 mr-2" />Download Fasta file</span>
                        <span className="sr-only">, {getFastaLink(project, sample)}</span>
                    </button>
                </Link>
                <Link href={getResultLink(project, sample)} className="text-indigo-600 hover:text-indigo-900">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <span><ArrowDownTrayIcon className="w-5 h-5 inline mb-1 mr-2" />Download metadata CSV</span>
                        <span className="sr-only">, {getResultLink(project, sample)}</span>
                    </button>
                </Link>
            </div>
            }

            <p className="text-2xl mb-4">Filters</p>
            <div className="flex flex-col gap-8 mb-12">
                <div className="flex flex-wrap gap-8 mb-4">
                    <div >
                        <p>Completeness</p>
                        <input value={filters.completenessMin} placeholder="0" min={0} max={100} type="number" className="border-b w-24 text-center"
                            onChange={(event) => setFilters({ ...filters, completenessMin: +event.target.value })} />
                        <span>- </span>
                        <input value={filters.completenessMax} placeholder="100" min={0} max={100} type="number" className="border-b w-24 text-center"
                            onChange={(event) => setFilters({ ...filters, completenessMax: +event.target.value })} />
                    </div>

                    <div>
                        <p>Contamination</p>
                        <input value={filters.contaminationMin} placeholder="0" min={0} max={999} type="number" className="border-b w-24 text-center"
                            onChange={(event) => setFilters({ ...filters, contaminationMin: +event.target.value })} />
                        <span>- </span>
                        <input value={filters.contaminationMax} placeholder="inf" min={0} max={999} type="number" className="border-b w-24 text-center"
                            onChange={(event) => setFilters({ ...filters, contaminationMax: +event.target.value })} />
                    </div>

                    <div>
                        <p>tRNA</p>
                        <input value={filters.trnaMin} placeholder="0" min={0} max={999} type="number" className="border-b w-24 text-center"
                            onChange={(event) => setFilters({ ...filters, trnaMin: +event.target.value })} />
                        <span>- </span>
                        <input value={filters.trnaMax} placeholder="inf" min={0} max={999} type="number" className="border-b w-24 text-center"
                            onChange={(event) => setFilters({ ...filters, trnaMax: +event.target.value })} />
                    </div>
                </div>

                <div className="flex flex-wrap gap-8">
                <div>
                    <p>16s</p>
                    <input value={filters.s16Min} placeholder="0" min={0} max={999} type="number" className="border-b w-24 text-center"
                        onChange={(event) => setFilters({ ...filters, s16Min: +event.target.value })} />
                    <span>- </span>
                    <input value={filters.s16Max} placeholder="inf" min={0} max={999} type="number" className="border-b w-24 text-center"
                        onChange={(event) => setFilters({ ...filters, s16Max: +event.target.value })} />
                </div>

                <div>
                    <p>5s</p>
                    <input value={filters.s5Min} placeholder="0" min={0} max={999} type="number" className="border-b w-24 text-center"
                        onChange={(event) => setFilters({ ...filters, s5Min: +event.target.value })} />
                    <span>- </span>
                    <input value={filters.s5Max} placeholder="inf" min={0} max={999} type="number" className="border-b w-24 text-center"
                        onChange={(event) => setFilters({ ...filters, s5Max: +event.target.value })} />
                </div>

                <div>
                    <p>23s</p>
                    <input value={filters.s23Min} placeholder="0" min={0} max={999} type="number" className="border-b w-24 text-center"
                        onChange={(event) => setFilters({ ...filters, s23Min: +event.target.value })} />
                    <span>- </span>
                    <input value={filters.s23Max} placeholder="inf" min={0} max={999} type="number" className="border-b w-24 text-center"
                        onChange={(event) => setFilters({ ...filters, s23Max: +event.target.value })} />
                </div>
                </div>

                <div>
                    <p className="">Pass.GNUC</p>
                    <button type="button"
                        className={clsx(filters.passGnuc === undefined ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-gray-50",
                            "relative inline-flex items-center first:rounded-l-md last:rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10")}
                        onClick={() => setFilters({ ...filters, passGnuc: undefined })}>
                        All GNUC
                    </button>

                    <button type="button"
                        className={clsx(filters.passGnuc === false ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-gray-50",
                            "relative inline-flex items-center first:rounded-l-md last:rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10")}
                        onClick={() => setFilters({ ...filters, passGnuc: false })}>
                        No GNUC
                    </button>

                    <button type="button"
                        className={clsx(filters.passGnuc === true ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-gray-50",
                            "relative inline-flex items-center first:rounded-l-md last:rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10")}
                        onClick={() => setFilters({ ...filters, passGnuc: true })}>
                        Yes GNUC
                    </button>
                </div>
            </div>

            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-8 border border-gray-400 rounded shadow"
                onClick={() => setFilters(highQualityFilterState)}>
                High quality bins
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-8 border border-gray-400 rounded shadow"
                onClick={() => setFilters(mediumQualityFilterState)}>
                Medium quality bins
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-8 border border-gray-400 rounded shadow"
                onClick={() => setFilters(lowQualityFilterState)}>
                Low Quality bins
            </button>

            <div className="mb-8">
                <p>High quality bins: <span className="text-green-500">{bins.high}</span></p>
                <p>Medium quality bins: <span className="text-yellow-500">{bins.medium}</span></p>
                <p>Low quality bins: <span className="text-pink-500">{bins.low}</span></p>
            </div>

            <button className=" block bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-8 border border-gray-400 rounded shadow"
                onClick={() => setFilters(defaultFilterState)}>
                Reset Filters
            </button>

            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={nonPaginatedItems.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        {fields.map((field) => {
                                            return (
                                                <th scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                                    key={field.name}>
                                                    <span className="group inline-flex cursor-pointer"
                                                        onClick={() => changeSortSettings(field.name)}>
                                                        {field.label}
                                                        <span
                                                            className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                            {sortSettings.name === field && sortSettings.isAscending &&
                                                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />}
                                                            {sortSettings.name === field && !sortSettings.isAscending &&
                                                                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />}
                                                        </span>
                                                    </span>
                                                </th>)
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {paginatedItems.map((item) => (
                                        <tr key={Math.random()}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {item.filename}
                                            </td>
                                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.completeness}</td>
                                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.contamination}</td>
                                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.trna}</td>
                                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.s16}</td>
                                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.s5}</td>
                                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.s23}</td>
                                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.passGnuc ? "yes" : "no"}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                                                <Link href={`genome-details/${item.project ?? project}/${ item.sample ?? sample}/${item.filename}`} target="_blank"
                                                      className="text-indigo-600 hover:text-indigo-900">
                                                    <span> Details</span>
                                                    <span className="sr-only">, {item.downloadLink}</span>
                                                </Link>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                                                <Link href={item.downloadLink} className="text-indigo-600 hover:text-indigo-900">
                                                    <span> Download</span>
                                                    <span className="sr-only">, {item.downloadLink}</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination
                className="my-8"
                currentPage={currentPage}
                totalCount={nonPaginatedItems.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}
