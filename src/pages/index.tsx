import React from 'react'
import Head from 'next/head'
import {Container} from '@/components/Container'
import {
    ChevronRightIcon,
    EyeDropperIcon,
    LightBulbIcon,
    SparklesIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/20/solid'

const descriptions = [
    {
        title: "What is The Tool?",
        text: "Our MAG tool is a computational genomics tool that uses long read sequencing technologies like PacBio to generate metagenome-assembled genomes (MAGs) from gene samples. This tool allows you to unlock the potential of your gene samples, providing detailed information about the biological functions of your gene samples."
    },
    {
        title: "How Does it Work?",
        text: "The MAG tool works by sequencing long reads of your gene samples, allowing for the assembly of large and complex genomes. Once the gene samples have been sequenced, our tool uses a machine learning algorithm to generate high-quality MAGs. This yields a detailed analysis of the gene samples, providing information about the biological functions of the genes."
    },
    {
        title: "Benefits of The Tool",
        text: "Our MAG tool allows you to unlock the full potential of your gene samples, providing detailed information about the biological functions of the genes. This detailed analysis can be used to inform research projects, allowing for better decision-making and more efficient results. Additionally, our tool is easy to use and highly efficient, making it a great choice for any scientific project."
    }
    ]

const features = [
    {
        name: 'Cutting edge technology',
        description:
            'Empowered by cutting-edge long-read sequencing technologies, our tool generates metagenome-assembled genomes (MAGs) for a deeper understanding of genetic diversity and complexity',
        href: '#',
        icon: SparklesIcon,
    },
    {
        name: 'Highly accurate',
        description:
            'Our tool generates metagenome-assembled genomes (MAGs) using long-read sequencing technologies (PacBio) with high accuracy, resulting in highly contiguous and complete genome assemblies for diverse microbial communities.',
        href: '#',
        icon: EyeDropperIcon,
    },
    {
        name: 'Customizable',
        description:
            'Our tool is flexible and can be customized to suit specific project requirements, allowing researchers to tailor the tool to their specific needs.',
        href: '#',
        icon: WrenchScrewdriverIcon,
    },
    {
        name: 'Easy-to-use',
        description:
            'Our tool is user-friendly, with clear documentation and instructions available on Github, making it easy for researchers and scientists to generate MAGs from existing genetic samples.',
        href: '#',
        icon: LightBulbIcon,
    },
]

export default function Home({}) {

    return (
        <>
            <Head>
                <title>
                    Sample title
                </title>
                <meta
                    name="description"
                    content="Sample description"
                />
            </Head>
            <Container className="relative isolate overflow-hidden bg-gray-900">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none"/>
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                        <path
                            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"/>
                </svg>
                <div
                    className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                        <div className="mt-24 sm:mt-32 lg:mt-16">
                            <a href="#" className="inline-flex space-x-6">
              <span
                  className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                What’s new
              </span>
                                <span
                                    className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>Just shipped v1.0</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
              </span>
                            </a>
                        </div>
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Unlock the potential of your gene samples
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            Elit
                            sunt amet
                            fugiat veniam occaecat fugiat aliqua.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                            >
                                Explore
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-white">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <div
                        className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <img
                                src="/images/hero_illustration.png"
                                alt="bacteria genome illustration"
                                width={2432}
                                height={1442}
                                className="w-[40rem]"
                            />
                        </div>
                    </div>
                </div>
            </Container>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Features</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to assemble entire genomes from scratch
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a
                            elementum
                            pulvinar et feugiat blandit at. In mi viverra elit nunc.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div
                                            className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <div className="relative bg-white">
                <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
                    <div
                        className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
                        <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
                            <img
                                className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
                                src="/images/researcher_illustration.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="px-6 lg:contents">
                        <div
                            className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
                            <p className="text-base font-semibold leading-7 text-indigo-600">Generating MAGs from long
                                reads</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better
                                workflow</h1>
                            <p className="mt-6 text-xl leading-8 text-gray-700">
                                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi,
                                nibh
                                dui, diam eget
                                aliquam. Quisque id at vitae feugiat egestas ac.
                            </p>
                            {
                                descriptions.map((item) => (
                                    <div key={item.title}>
                                        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">{item.title}</h2>
                                        <p className="mt-6">
                                            {item.text}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-indigo-100">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Are you a researcher?
                        </h2>
                        <p className="mt-6 text-lg">
                            Explore our assembled genomes or try out the tool yourself!
                        </p>
                    </div>
                    <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                        <a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Explore
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
