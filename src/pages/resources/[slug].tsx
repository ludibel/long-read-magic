import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import matter from 'gray-matter'
import fs from 'fs'

import {
  AttributesProps,
  ImageProps,
  ResourceProps,
  ToolProps,
} from '@/utils/types'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

const titleHeadTable = [
  'tool',
  'input file',
  'output file',
  'information obtained',
  'utility',
  'peeks',
  'drawbacks',
]

const HeroComponent: React.FC<AttributesProps> = ({
  title,
  subTitle,
  imageUrl,
  imageAlt,
}) => {
  return (
    <div className="relative h-[350px] w-full sm:h-[450px] 2xl:h-[550px]">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="bg-lightgray bg-opacity-50 object-cover object-center"
      />
      <div
        className="h-100% absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, #061027 0%, rgba(6, 16, 39, 0.40) 100%)',
        }}
      ></div>
      <div className="absolute inset-0 flex">
        <div className="flex flex-auto flex-col items-center justify-center pb-4 pl-4 pr-4 pt-12 md:pl-[54px] md:pr-[54px]">
          <div className="2xl:pb-18 self-start pb-16 text-white">
            <Link className="group" href="/resources">
              <div className="flex flex-row gap-1">
                <ChevronLeftIcon className="mr-2 mt-[2px] h-5 w-5 text-buttonColor-type3 group-hover:text-textColor-yellow" />
                <span className=" text-base text-buttonColor-type3 group-hover:text-textColor-yellow ">
                  Back
                </span>
              </div>
            </Link>
          </div>
          <div>
            <h1 className="font-inter text-4xl font-semibold capitalize text-white lg:text-[52px] lg:leading-[4rem] 2xl:text-7xl">
              {title}
            </h1>
          </div>
          <div className="pb-6 pt-2 text-center sm:pb-10 sm:pt-6 md:pb-12">
            <p className="font-inter gap-x-6 text-sm font-normal leading-6 text-white sm:text-[21px] md:leading-9 2xl:text-2xl">
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
const ToolTableComponent: React.FC<AttributesProps> = ({ tools }) => {
  return (
    <table className="min-w-full table-auto rounded-[4px] px-6 text-left text-sm font-light">
      <thead className="border-b py-4 text-sm font-semibold text-textColor-blue  dark:border-strokeColor-greydark md:text-base">
        <tr>
          {titleHeadTable.map((title) => (
            <th
              scope="col"
              className="px-3 py-2 uppercase lg:px-6 lg:py-4"
              key={title}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm text-textColor-blue md:text-base">
        {tools.map((tool: ToolProps) => (
          <tr
            className="border-b dark:border-strokeColor-greydark"
            key={`tool-${tool.name}`}
          >
            <td className="px-3 py-2 lg:px-6 lg:py-4">{tool.name}</td>
            <td className="px-3 py-2 lg:px-6 lg:py-4">{tool.inputFiles}</td>
            <td className="px-3 py-2 lg:px-6 lg:py-4">{tool.outputFiles}</td>
            <td className="px-3 py-2 lg:px-6 lg:py-4">
              {tool.informationObtained}
            </td>
            <td className="px-3 py-2 lg:px-6 lg:py-4">{tool.utility}</td>
            <td className="px-3 py-2 lg:px-6 lg:py-4">{tool.peeks}</td>
            <td className="px-3 py-2 lg:px-6 lg:py-4">{tool.drawbacks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Resource = ({ data }: ResourceProps) => {
  const {
    title,
    subTitle,
    imageHero,
    tools,
    contentResources,
    imageResources,
  } = data

  const { url: urlHero, alt: altHero } = imageHero[0] as ImageProps

  return (
    <>
      <Head>
        <title>{`Resources ${title}`}</title>
        <meta
          name="description"
          content="Information about the scientists and researchers who created the tool. Brief background on their expertise in genomics and long read sequencing techniques. Presentation of the Big Data Biology Lab and link to their website."
        />
      </Head>
      <HeroComponent
        title={title}
        subTitle={subTitle}
        imageUrl={urlHero}
        imageAlt={altHero}
      />
      <div className=" flex flex-1 justify-center bg-backgroundColor-greylight px-2 lg:px-16 lg:pt-16">
        <div
          className="max-w-sx flex -translate-y-16 flex-col items-start justify-center gap-14 overflow-hidden overflow-x-auto bg-buttonColor-type3 px-4 py-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl lg:-translate-y-44 lg:items-center lg:px-16 lg:py-16 xl:max-w-[1224px] 2xl:top-[500px]"
          style={{
            boxShadow: '0px 8px 19px 0px rgba(32,34,80,0.1)',
            backgroundImage:
              'linear-gradient(131deg, #F2F3F7 0%, rgba(254, 254, 254, 0.00) 100%)',
          }}
        >
          {title === 'tools' && <ToolTableComponent tools={tools} />}
          {title !== 'tools' && (
            <>
              <div className="w-full">
                <Image
                  src={imageResources[0].url}
                  alt={imageResources[0].alt}
                  width={1000}
                  height={2000}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  className="bg-lightgray bg-opacity-50"
                />
              </div>
              <div className="flex self-stretch">
                <div className=" text-base leading-9 text-black lg:text-[21px]">
                  {contentResources}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Resource

type StaticProps = {
  props: {
    content: string
    data: {
      [key: string]: unknown
    }
  }
}

type StaticPropsParams = {
  params: {
    slug: string
  }
}

export async function getStaticProps({
  params,
}: StaticPropsParams): Promise<StaticProps> {
  const post = fs.readFileSync(
    `${process.cwd()}/content/resources/${params.slug}.md`,
    'utf-8'
  )
  const { content, data } = matter(post)

  return {
    props: {
      content,
      data,
    },
  }
}

type StaticPaths = {
  paths: Path[]
  fallback: boolean
}

type Path = {
  params: {
    slug: string
  }
}

export function getStaticPaths(): StaticPaths {
  const files = fs.readdirSync(`${process.cwd()}/content/resources/`, 'utf-8')

  const paths = files.map((file) => {
    const slug = file.split('.')[0]
    return { params: { slug: slug } }
  })

  return {
    paths,
    fallback: false,
  }
}
