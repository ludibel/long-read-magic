import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import matter from 'gray-matter'
import fs from 'fs'

import { AttributesProps, TermsOfUseProps } from '@/utils/types'

import imageHero from '@/public/images/about_hero-min.png'

const HeroComponent: React.FC<AttributesProps> = ({ title, description }) => {
  return (
    <div className="relative h-[350px] w-full sm:h-[450px] 2xl:h-[650px]">
      <Image
        src={imageHero}
        alt="Image building"
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
      <div className="absolute inset-0 flex">
        <div className="flex flex-auto flex-col items-center justify-center pb-4 pl-4 pr-4 pt-12 md:pl-[54px] md:pr-[54px] lg:pl-[108px]">
          <div>
            <h1 className="font-inter text-4xl font-semibold capitalize text-white lg:text-[52px] lg:leading-[4rem] 2xl:text-7xl">
              {title}
            </h1>
          </div>
          <div className="pb-6 pt-2 text-center sm:pb-10 sm:pt-6 md:pb-12">
            <p className="font-inter gap-x-6 text-sm font-normal leading-6 text-white sm:text-[21px] md:leading-9 2xl:text-2xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const termsOfService = ({ dataHero, dataTermsOfService }) => {
  const { title: titleHero, description: descriptionHero } =
    dataHero as AttributesProps
  const { content: contentTermsOfService } =
    dataTermsOfService as AttributesProps
  return (
    <>
      <Head>
        <title>Terms Of Service</title>
        <meta name="description" content="Terms of service" />
      </Head>
      <HeroComponent title={titleHero} description={descriptionHero} />
      <div className="mt-10 flex flex-col items-center justify-center pl-4 pr-4">
        {contentTermsOfService.map((content: TermsOfUseProps, index) => (
          <div
            key={content.title}
            className="mb-5  max-w-5xl rounded shadow-lg "
          >
            <div className="px-6 py-4">
              <h2 className="pb-5 font-karla text-4xl font-bold text-textColor-blue lg:text-[34px]">
                {index + 1}-{content.title}
              </h2>
              <div className="border-t border-textColor-grey"></div>
              <div className="pb-6 pt-6">
                <p className="'sm:text-lg  text-base font-medium text-textColor-greydark lg:text-[21px]">
                  {content.paragraph}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default termsOfService

export async function getStaticProps() {
  try {
    const filesHero = fs.readFileSync(
      `${process.cwd()}/content/termsOfService/hero.md`
    )
    const { data: dataHero } = matter(filesHero)

    const filesContent = fs.readFileSync(
      `${process.cwd()}/content/termsOfService/datasTermsOfService.md`
    )
    const { data: dataTermsOfService } = matter(filesContent)

    return {
      props: {
        dataHero: JSON.parse(JSON.stringify(dataHero)),
        dataTermsOfService: JSON.parse(JSON.stringify(dataTermsOfService)),
      },
    }
  } catch (err) {
    console.log(err.message)
  }
  return {
    notFound: true,
  }
}
