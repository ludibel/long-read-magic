import React from "react"

import { Table } from "@/components/GenomesTable/Table";
import { Container } from "@/components/Container";
import { ProjectSelector } from "@/components/GenomesTable/ProjectSelector";
import Head from "next/head";
import { DownloadMetadataLinks } from "@/components/GenomesTable/DownloadMetadataLinks";
import { Filters } from "@/components/GenomesTable/Filters";
import Pagination from "@/components/GenomesTable/Pagination";
import { GenomeContextProvider } from "@/components/GenomesTable/GenomesContext";
import { GenomeOverviewTexts } from "@/utils/texts";

export default function Genomes() {
    const texts = GenomeOverviewTexts

    return (
        <>
            <Head>
                <title>Genomes - list</title>
                <meta
                    name="description"
                    content="List of available genomes."
                />
            </Head>
            <Container inner={{className: ""}} bgClassName="bg-dna h-[600px] w-full" className="flex">
                <GenomeContextProvider>
                    <div className="mt-32 text-white text-center">
                        <p className="text-6xl mb-8">{texts.title}</p>
                        <p className="text-2xl">{texts.titleComment}</p>
                    </div>
                    <div className="my-20 p-8 lg:p-16 bg-grey-light shadow-xl">
                        <div className="flex mb-16">
                            <ProjectSelector className=""/>
                            <DownloadMetadataLinks className="mt-auto ml-auto"/>
                        </div>

                        <Filters className="mb-16"/>

                        <Pagination className="mb-8"/>
                        <Table className="mb-8 mx-[-40px]"/>
                        <Pagination/>
                    </div>
                </GenomeContextProvider>

            </Container>
        </>
    )
}
