import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import React, { FC, useEffect, useState } from "react";
import { MetadataItem } from "@/utils/models";
import Link from "next/link";
import clsx from "clsx";

export type TableProps = {
    items: MetadataItem[]
}

export const Table: FC<TableProps> = ({items}) => {
    const fields = ["filename", "completeness", "contamination", "passGnuc"]

    const [displayItems, setDisplayItems] = useState(items)
    const [sortSettings, setSortSettings] = useState({name: fields[0], isAscending: true})
    const [filters, setFilters] = useState({
        contaminationMin: 0,
        contaminationMax: 999,
        completenessMin: 0,
        completenessMax: 100,
        passGnuc: undefined
    })

    const [bins, setBins] = useState({low: 0, mid: 0, high: 0})

    useEffect(() => {
        const filteredItems = filter(items);
        const sortedItems = sort(filteredItems, sortSettings.name, sortSettings.isAscending);
        setDisplayItems(sortedItems)

        const newBins = {
            high: sortedItems.filter(x => x.completeness > 90 && x.contamination < 5 && x.passGnuc === true && x.trna >= 18 && x.s16 >= 1 && x.s5 >= 1 && x.s23 >= 1).length,
            mid: sortedItems.filter(x => x.completeness >= 50 && x.contamination < 10).length,
            low: sortedItems.filter(x => x.completeness < 50 && x.contamination < 10).length
        }
        setBins(newBins);

    }, [items, sortSettings, filters])

    function changeSortSettings(fieldName) {
        if (fieldName === sortSettings.name) {
            setSortSettings({name: fieldName, isAscending: !sortSettings.isAscending})
        } else {
            setSortSettings({name: fieldName, isAscending: true})
        }
    }

    function filter(items: MetadataItem[]): MetadataItem[] {
        return items.filter((item) => (
            item.completeness >= filters.completenessMin && item.completeness <= filters.completenessMax &&
            item.contamination >= filters.contaminationMin && item.contamination <= filters.contaminationMax &&
            (filters.passGnuc === undefined || item.passGnuc === filters.passGnuc)))
    }

    function sort(items, fieldName, isAscending): MetadataItem[] {
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
            <div className="flex flex-wrap gap-8 mb-12">
                <div>
                    <p>Completeness</p>
                    <input placeholder="0" min={0} max={100} type="number" className="border-b w-24 text-center"
                           onChange={(event) => setFilters({...filters, completenessMin: +event.target.value})}/>
                    <span>- </span>
                    <input placeholder="100" min={0} max={100} type="number" className="border-b w-24 text-center"
                           onChange={(event) => setFilters({...filters, completenessMax: +event.target.value})}/>
                </div>

                <div>
                    <p>Contamination</p>
                    <input placeholder="0" min={0} max={999} type="number" className="border-b w-24 text-center"
                           onChange={(event) => setFilters({...filters, contaminationMin: +event.target.value})}/>
                    <span>- </span>
                    <input placeholder="inf" min={0} max={999} type="number" className="border-b w-24 text-center"
                           onChange={(event) => setFilters({...filters, contaminationMax: +event.target.value})}/>
                </div>

                <div>
                    <p className="">Pass.GNUC</p>
                    <button type="button"
                            className={clsx(filters.passGnuc === undefined && "bg-blue-400 hover:bg-blue-500",
                                "relative inline-flex items-center first:rounded-l-md last:rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10")}
                            onClick={() => setFilters({...filters, passGnuc: undefined})}>
                        All GNUC
                    </button>

                    <button type="button"
                            className={clsx(filters.passGnuc === false && "bg-blue-400 hover:bg-blue-500",
                                "relative inline-flex items-center first:rounded-l-md last:rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10")}
                            onClick={() => setFilters({...filters, passGnuc: false})}>
                        No GNUC
                    </button>

                    <button type="button"
                            className={clsx(filters.passGnuc === true && "bg-blue-400 hover:bg-blue-500",
                                "relative inline-flex items-center first:rounded-l-md last:rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10")}
                            onClick={() => setFilters({...filters, passGnuc: true})}>
                        Yes GNUC
                    </button>
                </div>
            </div>


            <div>
                <p>High quality bins: <span className="text-green-500">{bins.high}</span></p>
                <p>Medium quality bins: <span className="text-yellow-500">{bins.mid}</span></p>
                <p>Low quality bins: <span className="text-pink-500">{bins.low}</span></p>
            </div>


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
                                                key={field}>
                                                <span className="group inline-flex cursor-pointer"
                                                      onClick={() => changeSortSettings(field)}>
                                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                                    <span
                                                        className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        {sortSettings.name === field && sortSettings.isAscending &&
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true"/>}
                                                        {sortSettings.name === field && !sortSettings.isAscending &&
                                                          <ChevronUpIcon className="h-5 w-5" aria-hidden="true"/>}
                      </span>
                                                </span>
                                            </th>)
                                    })}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {displayItems.map((item) => (
                                    <tr key={item.filename}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {item.filename}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.completeness}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.contamination}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.passGnuc ? "yes" : "no"}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                                            <Link href={item.downloadLink} className="text-indigo-600 hover:text-indigo-900">
                                                Download<span className="sr-only">, {item.downloadLink}</span>
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
        </>
    )
}
