import React, { useState } from "react"
import manifest from "public/data-manifest.json"
import { Table } from "@/components/Table";
import { Container } from "@/components/Container";
import { ProjectSelector } from "@/components/ProjectSelector";
import Head from "next/head";

export default function Genomes() {
    const [selectedItems, setSelectedItems] = useState([]);

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

                <ProjectSelector manifest={manifest} setSelectedItems={setSelectedItems} classname="mb-12"/>

                {selectedItems.length > 0 && <Table items={selectedItems}/>}
            </Container>
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}
