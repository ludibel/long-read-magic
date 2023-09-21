import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import React, { FC } from "react";
import Link from "next/link";
import { useGenomeContext } from "@/components/GenomesTable/GenomesContext";
import { GenomeOverviewTexts, GlobalTexts } from "@/utils/texts";
import clsx from "clsx";
import { GenomeQuality } from "@/utils/models";

const texts = GenomeOverviewTexts.table;
const fields = [
    {name: "filename", label: texts.filenameLabel},
    {name: "completeness", label: texts.completenessLabel},
    {name: "contamination", label: texts.contaminationLabel},
    {name: "trna", label: texts.trnaLabel},
    {name: "s16", label: texts.s16Label},
    {name: "s5", label: texts.s5Label},
    {name: "s23", label: texts.s23Label},
    {name: "passGnuc", label: texts.passGnucLabel}]

export type TableProps = {
    className?: string
}
export const Table: FC<TableProps> = ({className}) => {
    const {
        paginatedItems: items,
        selectedProject: project,
        selectedSample: sample,
        sortSettings,
        changeSortSettings,
    } = useGenomeContext();

    return (
        <div className={className}>
            <div className="px-4 sm:px-6 lg:px-8 border rounded-md">
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
                                                    <span className="group inline-flex cursor-pointer font-bold text-xs"
                                                          onClick={() => changeSortSettings(field.name)}>
                                                        {field.label.toUpperCase()}
                                                        <span
                                                            className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                            {sortSettings.name === field.name && sortSettings.isAscending &&
                                                              <ChevronDownIcon className="h-5 w-5" aria-hidden="true"/>}
                                                            {sortSettings.name === field.name && !sortSettings.isAscending &&
                                                              <ChevronUpIcon className="h-5 w-5" aria-hidden="true"/>}
                                                        </span>
                                                    </span>
                                            </th>)
                                    })}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {items.map((item) => (
                                    <tr key={Math.random()}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 relative">
                                            <div className={clsx("absolute -left-3 top-5 w-1 h-4 inline-block",
                                                item.genomeQuality === GenomeQuality.High && "bg-qualitycolor-green",
                                                item.genomeQuality === GenomeQuality.Medium && "bg-qualitycolor-yellow",
                                                item.genomeQuality === GenomeQuality.Low && "bg-qualitycolor-red")}></div>
                                            <Link
                                                href={item.detailsLink}
                                                target="_blank"
                                                className="text-indigo-600 hover:text-indigo-900">
                                                {item.filename}
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.completeness}</td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.contamination}</td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.trna}</td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.s16}</td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.s5}</td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.s23}</td>
                                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">{item.passGnuc ? GlobalTexts.yes : GlobalTexts.no}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                                            <Link
                                                href={item.detailsLink}
                                                target="_blank"
                                                className="text-indigo-600 hover:text-indigo-900">
                                                <span>{texts.detailsButtonLabel}</span>
                                                <span className="sr-only">, {item.detailsLink}</span>
                                            </Link>
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                                            <Link href={item.downloadLink} className="text-indigo-600 hover:text-indigo-900">
                                                <span>{texts.downloadButtonLabel}</span>
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

        </div>
    )
}
