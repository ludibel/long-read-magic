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
import fm, { attributes as heroAttributes } from '@/content/homePage/hero.md'
import { attributes as aboutAttributes } from '@/content/homePage/section1.md'
import { attributes as section3Attributes } from '@/content/homePage/section3.md'
import { attributes as section2Attributes } from '@/content/homePage/section2.md'

import imageHero from '@/public/images/genome_image.png'
import imageAbout from '@/public/images/homepage_image_part2.png'
import imageSection3 from '@/public/images/homepage_image_part3.png'

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
    <div className="relative h-[400px] w-full sm:h-[900px]">
      <Image
        src={imageHero}
        alt="Background Image Hero"
        fill
        className="object-cente bg-lightgray bg-opacity-50 object-cover blur-[2px]"
      />
      <div
        className="h-100% absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(91deg, #001135 0%, rgba(0, 17, 53, 0.00) 100%)',
          backdropFilter: 'blur(2px)',
        }}
      ></div>
      <div className="absolute inset-0 flex">
        <div
          className="flex flex-auto flex-col items-start justify-center pl-4 pr-4 md:pl-[108px] md:pr-[108px] lg:w-2/3 2xl:pl-[200px]"
          style={{
            backdropFilter: 'blur(2px)',
          }}
        >
          <div>
            <h1 className="font-inter text-xl font-semibold capitalize text-white sm:text-4xl md:text-5xl 2xl:text-7xl">
              {title}
            </h1>
          </div>
          <div className="pb-6 pt-2 sm:pb-10 sm:pt-6 md:pb-12">
            <p className="font-inter gap-x-6 text-sm font-normal leading-6 text-white sm:text-xl md:text-lg md:leading-9 2xl:text-2xl ">
              {description}
            </p>
          </div>
          <div className="text-base 2xl:text-2xl">
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
  const { title: titleAbout, content: descriptionAbout } = aboutAttributes
  const { title: titleSection3, content: descriptionSection3 } =
    section3Attributes
  const { title: titleSection2, content: descriptionSection2 } =
    section2Attributes
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
      <div className="relative grid justify-center bg-backgroundColor-grey pb-10 pt-14 md:grid-cols-2 md:pb-[112px] md:pr-[108px] md:pt-[120px] xl:pr-[242px] 2xl:px-96">
        <Image
          src={imageAbout}
          alt="Background Image Section"
          className="blur-2 left-0 top-0 opacity-60 md:absolute md:opacity-100 2xl:left-96"
        />
        <div className="absolute top-6 mx-4 sm:top-8 md:relative md:top-0 md:top-0 md:ml-[108px] ">
          <h2 className="text-4xl font-medium lg:text-[52px] ">{titleAbout}</h2>
        </div>
        <div className="absolute top-28 mx-4 flex flex-col items-center items-stretch gap-6 sm:top-48 md:relative md:top-0 md:top-0 md:gap-10 xl:gap-[120px] 2xl:gap-16">
          {descriptionAbout.map((content) => (
            <div key={content.title}>
              <p className=" text-base leading-6 sm:text-xl md:leading-9 lg:text-[21px]">
                {content.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex h-[400px] min-h-max w-full items-center justify-center bg-backgroundColor-blue sm:h-full">
        <div className="relative flex items-center justify-center md:px-10 2xl:px-0">
          <Image
            src={imageSection3}
            alt="Background Image Section3"
            sizes="100vw"
            className="backdrop-blur-[2px] backdrop-filter"
          />
          <div className="absolute mx-auto flex max-w-[80%] items-center justify-center sm:max-w-[70%]">
            <div className="rounded bg-backgroundColor-greylight p-2 text-center opacity-80 sm:px-6 sm:py-10">
              <h2 className="pb-2 text-xl font-medium sm:pb-7 md:text-3xl lg:text-[52px]">
                {titleSection2}
              </h2>
              <p className="leading-1 text-sm md:text-base md:leading-9 lg:text-[21px]">
                {descriptionSection2}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid bg-backgroundColor-grey pb-[93px] pt-14 md:grid-cols-2 md:pr-[108px] md:pt-[120px] xl:pr-[242px] 2xl:px-96">
        <div className="pb-8 md:pl-[108px] md:pr-28 lg:text-[52px] xl:pr-[312px] 2xl:pr-10">
          <h2 className="text-4xl font-medium lg:text-[52px]">
            {titleSection3}
          </h2>
        </div>
        <div className="flex flex-col items-center items-stretch md:gap-10 xl:gap-36 2xl:gap-16">
          {descriptionSection3.map((content) => (
            <div key={content.title}>
              <p className="text-base leading-9 lg:text-[21px] ">
                {content.description}
              </p>
            </div>
          ))}
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
