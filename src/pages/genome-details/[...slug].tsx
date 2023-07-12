import React, { useState } from "react"
import { Container } from "@/components/Container";
import Head from "next/head";
import { GenomeQuality, GenomeDetails } from "@/utils/models";
import manifest from "public/full-data-manifest.json"
import Link from "next/link";
import { genomeDetailsTexts, GlobalTexts } from "@/utils/texts";
import { Cell, Cells } from "@/components/Cells";
import Image from "next/image";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { detectGenomeQuality } from "@/utils/utils";

type GenomeDetailsProps = {
    project: string
    sample: string
    details: GenomeDetails
}

export default function GenomeDetails({details}: GenomeDetailsProps) {
    const texts = genomeDetailsTexts;
    const topRow: Cell[] = [
        {label: texts.genomeSize, value: details.genomeSize, importance: "high"},
        {label: texts.completeness, value: details.completeness, importance: "low"},
        {label: texts.contamination, value: details.contamination, importance: "low"},
        {label: texts.gcContent, value: details.gcContent, importance: "low"},
        {label: texts.totalCodingSequences, value: details.totalCodingSequences, importance: "high"},
    ]
    const midRow = [
        {
            title: texts.numberOfGenes,
            label1: texts.called,
            label2: texts.mapped,
            value1: details.nGenesCalled,
            value2: details.nGenesMapped
        },
        {
            title: texts.contigComposition,
            label1: texts.nContigs,
            label2: texts.contigN50,
            value1: details.nContigs,
            value2: details.contigN50
        }
    ]
    const bottomRow: Cell[] = [
        {label: texts.msaPercent, value: details.msaPercent, importance: "high"},
        {label: texts.redValue, value: details.redValue, importance: "low"},
        {label: texts.proportionGenesRetainedInMajorClades, value: details.proportionGenesRetainedInMajorClades, importance: "low"},
        {label: texts.genesRetainedIndex, value: details.genesRetainedIndex, importance: "low"},
        {label: texts.cladeSeparationScore, value: details.cladeSeparationScore, importance: "high"},
        {label: texts.contaminationPortion, value: details.contaminationPortion, importance: "high"},
        {label: texts.nEffectiveSurplusClades, value: details.nEffectiveSurplusClades, importance: "low"},
        {label: texts.meanHitIdentity, value: details.meanHitIdentity, importance: "low"},
        {label: texts.referenceRepresentationScore, value: details.referenceRepresentationScore, importance: "low"},
        {label: texts.passGNUC, value: details.passGnuc ? "Yes" : "No", importance: "high"},
        {label: texts.trnaNumber, value: details.trna, importance: "high"},
        {label: texts.s16Number, value: details.s16, importance: "low"},
        {label: texts.s5Number, value: details.s5, importance: "low"},
        {label: texts.s23Number, value: details.s23, importance: "low"},
    ]

    const classification = [
        {label: texts.domain, value: details.classification?.domain || "N/A"},
        {label: texts.phylum, value: details.classification?.phylum || "N/A"},
        {label: texts.class, value: details.classification?.class || "N/A"},
        {label: texts.order, value: details.classification?.order || "N/A"},
        {label: texts.family, value: details.classification?.family || "N/A"},
        {label: texts.genus, value: details.classification?.genus || "N/A"},
        {label: texts.species, value: details.classification?.species || "N/A"}
    ]
    const classificationString = details.classification?.domain ? classification.map(x => x.value).join(" > ") : GlobalTexts.unknown
    const genomeQuality = detectGenomeQuality(details);
    let genomeQualityIcon = undefined;
    switch (genomeQuality) {
        case GenomeQuality.Low:
            genomeQualityIcon = <Image src="/images/low-quality-bin-text.svg" alt="icon" width={60} height={60}/>;
            break;
        case GenomeQuality.Medium:
            genomeQualityIcon = <Image src="/images/medium-quality-bin-text.svg" alt="icon" width={60} height={60}/>;
            break;
        case GenomeQuality.High:
            genomeQualityIcon = <Image src="/images/high-quality-bin-text.svg" alt="icon" width={60} height={60}/>;
            break;
    }

    const [showClassificationTable, setShowClassificationTable] = useState(false)

    return (
        <>
            <Head>
                <title>Genome Details</title>
                <meta
                    name="description"
                    content="List of available genomes."
                />
            </Head>
            <Container className="bg-zinc-50 pt-28">
                <div className="flex flex-wrap gap-4 mb-4 items-center">
                    {genomeQualityIcon}
                    <p className="font-bold text-2xl">{texts.genome}: {details.filename}</p>
                    <Link href={details.downloadLink}
                          className="bg-blue-800 hover:bg-blue-700 ml-auto text-white font-bold py-2 px-4 rounded h-10">
                        <span>{texts.download}</span>
                        <span className="sr-only">, {details.downloadLink}</span>
                    </Link>
                </div>

                {details.classification?.species && <div className="text-xl">
                    <span className="font-bold">{texts.species.toUpperCase()}: </span>
                    <span>{details.classification.species}</span>
                </div>
}

                <div className="bg-white drop-shadow-md p-4 lg:p-16 mt-8">
                    <div>
                        <Cells cells={topRow} className="mb-16"/>

                        <div className="flex gap-8 mb-16">
                            <Image
                                src="/images/logo_header.png"
                                alt="DNA sequence picture"
                                width={280}
                                height={280}
                                quality={80}
                                loading="lazy"
                                className="hidden lg:block"
                            />

                            <div className="flex flex-col justify-between mb-16">
                                <div className="flex flex-wrap mb-16">
                                    {midRow.map((item) =>
                                        <div key={item.title} className="sm:last-of-type:border-l sm:last-of-type:pl-8">
                                            <p className="font-bold ml-2 mb-2">{item.title.toUpperCase()}</p>
                                            <div key={item.title} className="flex flex-wrap gap-4">
                                                <div className="flex flex-col p-2 basis-[18%] min-w-[100px] justify-between">
                                                    <p className="font-bold">{item.label1}</p>
                                                    <p>{item.value1}</p>
                                                </div>
                                                <div className="flex flex-col p-2 border-l basis-[18%] min-w-[100px] justify-between">
                                                    <p className="font-bold">{item.label2}</p>
                                                    <p>{item.value2}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className="font-bold">{texts.additionalNotes}</p>
                                <p>{details.additionalNotes}</p>
                            </div>
                        </div>

                        <div className="mb-16">
                            <p className="font-bold mb-4">{texts.classification}</p>
                            <p className="mb-4">{classificationString}</p>
                            <div className="flex cursor-pointer text-blue-500 hover:text-blue-950"
                                 onClick={() => setShowClassificationTable(!showClassificationTable)}>
                                <span> {showClassificationTable ? texts.hideTableLabel : texts.showTableLabel}</span>
                                <span> {showClassificationTable
                                    ? <ChevronUpIcon className="h-5 w-5 mt-0.5" aria-hidden="true"/>
                                    : <ChevronDownIcon className="h-5 w-5 mt-0.5" aria-hidden="true"/>}</span>
                            </div>
                            {showClassificationTable &&
                              <div className="grid grid-cols-1 border w-[600px]">
                                  {classification.map(item =>
                                      <div key={item.label} className="border-b last-of-type:border-b-0 grid grid-cols-2">
                                          <p className="border-r p-2">{item.label}</p>
                                          <p className="p-2">{item.value}</p>
                                      </div>
                                  )}
                              </div>
                            }
                        </div>

                        <Cells cells={bottomRow} className="mb-16"/>
                    </div>

                    <Link href={details.downloadLink}
                          className="bg-blue-800 hover:bg-blue-700 ml-auto mb-16 text-white font-bold py-2 px-4 rounded">
                        <span>{texts.download}</span>
                        <span className="sr-only">, {details.downloadLink}</span>
                    </Link>

                </div>

            </Container>
        </>
    )
}

export async function getServerSideProps(context): Promise<{ props: GenomeDetailsProps }> {
    const [projectName, sampleName, genomeName] = context.params.slug;

    const project = manifest.projects.find(x => x.name === projectName);
    const sample = project.samples.find(x => x.name === sampleName);
    //@ts-ignore
    const item = sample.items.find(x => x.filename === genomeName);

    return {props: {project: projectName, sample: sampleName, details: item}}
}

// export async function getStaticPaths(context) {
//     const paths = [];
//     manifest.projects.forEach(project => {
//         project.samples.forEach(sample => {
//             sample.items.forEach(genome => {
//                 paths.push(`/genome-details/${project.name}/${sample.name}/${genome.filename}`)
//             })
//         })
//     })
//     return {
//         paths: paths,
//         fallback: false
//     };
// }
