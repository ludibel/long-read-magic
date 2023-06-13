import React from "react"
import taxonomyTreeManifest from "public/taxonomy-tree-manifest.json"
import { Container } from "@/components/Container";
import Head from "next/head";
import { Tree } from "@/components/Tree/Tree";

export default function Genomes() {
    return (
        <>
            <Head>
                <title>Taxonomy tree</title>
                <meta
                    name="description"
                    content="List of available genomes."
                />
            </Head>
            <Container>
                <h2 className="text-xl font-bold tracking-tight sm:text-6xl text-center mb-8">Taxonomy Tree</h2>
                {/*<p className="mb-8">Here you can download genomes based on filters</p>*/}

                <Tree rootNode={taxonomyTreeManifest.tree}/>
                <p className="mb-20"></p>
            </Container>
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}
