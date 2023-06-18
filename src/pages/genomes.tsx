import React, { useMemo, useState } from "react"
import manifest from "public/shortened-data-manifest.json"
import { Table } from "@/components/Table";
import { Container } from "@/components/Container";
import { ProjectSelector } from "@/components/ProjectSelector";
import Head from "next/head";
import { flattenManifest } from "@/utils/utils";
import clsx from "clsx";

export default function Genomes() {
    const [selectedData, setSelectedData] = useState({project: undefined, sample: undefined, items:[]});
    const flattenedManifest = useMemo(() => flattenManifest(manifest), []);



    return (
        <>
            <Head>
                <title>Genomes - list</title>
                <meta
                    name="description"
                    content="List of available genomes."
                />
            </Head>
            <Container>
                <h2 className="text-xl font-bold tracking-tight sm:text-6xl text-center mb-8">Download Genomes</h2>
                <p className="mb-8">Here you can download genomes based on filters</p>

                <ProjectSelector manifest={manifest} setSelectedData={setSelectedData} classname="mb-12"/>

                {selectedData.project && selectedData.items.length > 0 && <Table items={selectedData.items} project={selectedData.project} sample={selectedData.sample}/>}
                <div className={clsx(selectedData.project !== undefined && "hidden")}>
                    <Table items={flattenedManifest}/>
                </div>

            </Container>
        </>
    )
}
