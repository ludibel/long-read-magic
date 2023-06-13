import React  from "react"
import { Container } from "@/components/Container";
import Head from "next/head";
import {GenomeDetails} from "@/utils/models";
import manifest from "public/data-manifest.json"

type GenomeDetailsProps = {
    project: string
    sample: string
    details: GenomeDetails
}

export default function GenomeDetails({details}) {
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
                <h2 className="text-xl font-bold tracking-tight sm:text-6xl text-center mb-8">Details</h2>
                {/*<p className="mb-8">Here you can download genomes based on filters</p>*/}

                <p className="mb-20">{details.name}</p>
            </Container>
        </>
    )
}

export async function getStaticProps(context): Promise<{props: GenomeDetailsProps }>{
    const [project, sample, binName] = context.params.slug;
    console.log(context.params.slug)

    if (project === "kek"){
        return {props:{project:"kek", sample: "kekekk", details: {name: "kekekekek"}}}
    }

    return {props:{project:"1", sample: "2", details: {name: "3"}}}
}
export async function getStaticPaths(context) {
    const paths = [];
    manifest.projects.forEach(project => {
        project.samples.forEach(sample => {
            sample.items.forEach(bin => {
                paths.push(`/genomeDetails/${project.name}/${sample.name}/${bin.filename}`)
            })
        })
    })
    paths.push("/genomeDetails/kek");
    return {
        paths: paths,
        fallback: false
    };
}
