import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import fs from 'fs'
import matter from 'gray-matter'

import { AttributesProps } from '../utils/types'

import imageContact from '@/public/images/about_contact-min.png'
import Link from 'next/link'
import { detectContentType } from 'next/dist/server/image-optimizer'
import ReactMarkdown from 'react-markdown'

export const Thanks = ({ dataHero, content }) => {
  const { title, description, linkUrl, linkString } =
    dataHero as AttributesProps
  return (
    <>
      <Head>
        <title>Thanks</title>
        <meta name="description" content="Contact form" />
      </Head>

      <div className="relative flex h-full flex-1 pt-[160px] xl:pb-[427px] xl:pr-[646px]">
        <Image
          src={imageContact}
          alt="Image stem cells"
          fill
          className="bg-lightgray bg-opacity-50 object-cover object-center"
        />
        <div
          className="h-100% absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(91deg, #001135 0%, rgba(0, 17, 53, 0.00) 100%)',
          }}
        ></div>
        <div className="z-1 relative flex flex-col gap-6 px-4 pb-[120px] pt-[160px] md:px-[54px] 2xl:pl-[200px]">
          <div className="flex">
            <h1 className="font-inter text-4xl font-semibold capitalize text-white lg:text-[52px] lg:leading-[4rem] 2xl:text-7xl">
              {title} !
            </h1>
          </div>
          <div>
            <p className="font-inter gap-x-6 text-sm font-normal leading-6 text-white sm:text-[21px] md:leading-9 2xl:text-2xl">
              {description}
            </p>
            <div className="font-inter flex flex-row  gap-x-2 text-sm font-normal leading-6 text-white sm:text-[21px] md:leading-9 2xl:text-2xl">
              <ReactMarkdown>{content}</ReactMarkdown>
              <Link href={linkUrl} className="undeline-offset-1 underline">
                {linkString}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  try {
    const fileHero = fs.readFileSync(
      `${process.cwd()}/content/thankPage/hero.md`,
      'utf8'
    )
    const { data: dataHero, content } = matter(fileHero)
    return {
      props: {
        dataHero: JSON.parse(JSON.stringify(dataHero)),
        content,
      },
    }
  } catch (error) {
    alert(error.message)
  }
  return { notFound: true }
}

export default Thanks
