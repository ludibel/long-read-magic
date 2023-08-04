import React from 'react'
import Head from 'next/head'
import { Container } from '@/components/Container'
import {
  ChevronRightIcon,
  EyeDropperIcon,
  LightBulbIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import fm, {
  attributes as heroAttributes,
} from '../../content/homePage/hero.md'

import backgroundImage from '../../public/images/homepage_hero.png'

const descriptions = [
  {
    title: 'What is The Tool?',
    text: 'Our MAG tool is a computational genomics tool that uses long read sequencing technologies like PacBio to generate metagenome-assembled genomes (MAGs) from gene samples. This tool allows you to unlock the potential of your gene samples, providing detailed information about the biological functions of your gene samples.',
  },
  {
    title: 'How Does it Work?',
    text: 'The MAG tool works by sequencing long reads of your gene samples, allowing for the assembly of large and complex genomes. Once the gene samples have been sequenced, our tool uses a machine learning algorithm to generate high-quality MAGs. This yields a detailed analysis of the gene samples, providing information about the biological functions of the genes.',
  },
  {
    title: 'Benefits of The Tool',
    text: 'Our MAG tool allows you to unlock the full potential of your gene samples, providing detailed information about the biological functions of the genes. This detailed analysis can be used to inform research projects, allowing for better decision-making and more efficient results. Additionally, our tool is easy to use and highly efficient, making it a great choice for any scientific project.',
  },
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
interface HeroAttributesProps {
  title?: string
  description?: string
  buttonName?: string
}

const HeroComponent: React.FC<HeroAttributesProps> = ({
  title,
  description,
  buttonName,
}) => {
  return (
    <div className="relative h-96 w-full sm:h-screen">
      <Image
        src={backgroundImage}
        alt="Background Image Hero"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className="bg-lightgray cover no-repeat absolute inset-0 z-10 bg-opacity-50"></div>
      <div
        className="bg-lightgray absolute inset-0 z-0 bg-opacity-50"
        style={{
          height: '100%',
          background:
            'linear-gradient(91deg, #001135 0%, rgba(0, 17, 53, 0.00) 100%)',
          backdropFilter: 'blur(2px)',
        }}
      ></div>
      <div className="absolute inset-0 flex">
        <div
          className="flex flex-auto flex-col items-start justify-center pl-2 pr-2 md:w-2/3 md:pl-[108px] md:pr-[108px]"
          style={{
            backdropFilter: 'blur(2px)',
          }}
        >
          <div>
            <h1 className="font-inter text-md font-semibold capitalize text-white sm:text-3xl md:text-5xl">
              {title}
            </h1>
          </div>
          <div className="pb-6 pt-2 sm:pb-10 sm:pt-6 md:pb-12">
            <p className="font-inter leading-140 gap-x-6 text-[10px] font-normal leading-8 text-white sm:text-base md:text-lg">
              {description}
            </p>
          </div>
          <div>
            <a
              aria-label='Button "explore"'
              href="#"
              className="mt-4 rounded-sm border border-white bg-transparent px-6 py-2.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              {buttonName}
            </a>
          </div>
        </div>

        <div className="w-10 flex-auto md:w-1/3"></div>
      </div>
    </div>
  )
}
export default function Home() {
  const { title, description, buttonName } = heroAttributes
  return (
    <>
      <Head>
        <title>HomePage</title>
        <meta name="description" content="HomePage" />
      </Head>
      <HeroComponent
        title={title}
        description={description}
        buttonName={buttonName}
      />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to assemble entire genomes from scratch
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit
              at. In mi viverra elit nunc.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
          <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
            <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
              <img
                className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
                src="/images/researcher_illustration.png"
                alt=""
              />
            </div>
          </div>
          <div className="px-6 lg:contents">
            <div className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                Generating MAGs from long reads
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                A better workflow
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh
                sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque
                id at vitae feugiat egestas ac.
              </p>
              {descriptions.map((item) => (
                <div key={item.title}>
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h2>
                  <p className="mt-6">{item.text}</p>
                </div>
              ))}
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
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// export async function getServerSideProps(context) {
//     return {
//         redirect: {
//             destination: "/genomes",
//             permanent: false,
//         },
//     }
// }
