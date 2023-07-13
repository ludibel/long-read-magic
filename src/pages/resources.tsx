import React from 'react'
import Head from 'next/head'
import Image from "next/image"

import {Container} from "@/components/Container";

const people = [
    {
        name: 'Dr. Jane Doe',
        role: 'Lead researcher',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        bio: 'Dr. Jane Doe is a senior scientist with over 15 years of experience in genomics and bioinformatics. She received her Ph.D. in Biology from the University of California, Berkeley and completed her postdoctoral fellowship at the Broad Institute of MIT and Harvard. Dr. Doe\'s expertise lies in the development of long-read sequencing technologies and their application in microbial genomics. Her research has been published in several prestigious journals including Nature and Science.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        "name": "Dr. John Smith",
        "role": "Computational biologist",
        "imageUrl": 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        "bio": "Dr. John Smith is a computational biologist with a strong background in genomics and big data analytics. He obtained his Ph.D. in Computational Biology from Stanford University and completed his postdoctoral fellowship at the University of Washington. Dr. Smith's expertise lies in the development of bioinformatics tools and pipelines for the analysis of long-read sequencing data. His research has been published in several peer-reviewed journals and he has been invited to speak at several international conferences.",
        "twitterUrl": '#',
        "linkedinUrl": '#'
    },
    {
        "name": "Dr. Maria Garcia",
        "role": "Research scientist",
        "imageUrl": 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        "bio": "Dr. Maria Garcia is a research scientist with expertise in microbial ecology and metagenomics. She obtained her Ph.D. in Microbiology from the University of California, Los Angeles and completed her postdoctoral fellowship at the Max Planck Institute for Marine Microbiology. Dr. Garcia's research focuses on understanding the microbial diversity and function in complex environments using metagenomic approaches. Her research has been published in several high-impact journals, and she has been recognized with several prestigious awards.",
        "twitterUrl": '#',
        "linkedinUrl": '#'
    }
]

const resources = [
    {
        id: 1,
        title: 'Github',
        href: '#',
        description:
            'Our tool is available on Github, where you can access the source code, documentation, and instructions on how to run the tool.'
    },
    {
        id: 2,
        title: 'Documentation',
        href: '#',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.'
    },
    {
        id: 3,
        title: 'Changelog',
        href: '#',
        description:
            'Check out the most recent changes and subscribe to our newsletter to never miss an update.'
    },
]

export default function About() {
  return (
    <>
      <Head>
        <title>About - Project name</title>
        <meta
          name="description"
          content="Information about the scientists and researchers who created the tool. Brief background on their expertise in genomics and long read sequencing techniques. Presentation of the Big Data Biology Lab and link to their website."
        />
      </Head>
        <Container className="bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About the project</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                    Our team of three scientists and researchers worked tirelessly to create our powerful tool for assembling entire genomes from individual samples using long-read sequencing techniques. Here’s a brief background on each of them:
                </p>
            </div>
        </Container>
        <Container className="bg-white py-24 md:py-32">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-5">
                <div className="max-w-2xl xl:col-span-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The research team</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We’re a dynamic group of individuals who are passionate about what we do and dedicated to creating the genomics tools of tomorrow.
                    </p>
                </div>
                <ul role="list" className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3">
                    {people.map((person) => (
                        <li key={person.name} className="flex flex-col gap-10 pt-12 sm:flex-row">
                            <Image className="aspect-[3/5] w-52 flex-none rounded-2xl object-cover" width={1024} height={1024} src={person.imageUrl} alt="" />
                            <div className="max-w-xl flex-auto">
                                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                                <p className="text-base leading-7 text-gray-600">{person.role}</p>
                                <p className="mt-6 text-base leading-7 text-gray-600">{person.bio}</p>
                                <ul role="list" className="mt-6 flex gap-x-6">
                                    <li>
                                        <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Twitter</span>
                                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">LinkedIn</span>
                                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
        <div className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                    <div className="mx-auto w-full max-w-xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Big Data Biology Lab</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            The hosting laboratory of the project is run by Luis Pedro Coelho at Fudan University in Shanghai located at the Institute of Science and Technology for Brain-Inspired Intelligence.

                            We are interested both in developing novel computational methods and in applying them to large scale problems. Our focus is on the global microbiome and in exploiting publicly available data to gain understanding into microbial ecosystems. Our major projects are the Global Microbial Gene Catalog (GMGC), small proteins, and antimicrobial resistance.
                        </p>
                        <div className="mt-8 flex items-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Visit the lab website
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            className="ml-auto p-8 w-[15rem] rounded-md bg-white ring-1 ring-white/10"
                            src="/images/logo_bdb.png"
                            alt="Big data biology lab logo"
                            width={1824}
                            height={1080}
                        />
                    </div>
                </div>
            </div>
        </div>
        <Container className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Learn more about the tool</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Check out these useful resources to try out the tool by yourself.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {resources.map((post) => (
                        <div key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <a href={post.href}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    </>
  )
}
