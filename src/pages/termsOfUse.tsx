import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import matter from 'gray-matter'
import fs from 'fs'

import { AttributesProps, ImageProps, TermsOfUseProps } from '@/utils/types'
import Hero from '@/components/Hero'

const termsOfUse = ({ dataHero, dataTermsOfUse }) => {
  const {
    title: titleHero,
    description: descriptionHero,
    imageHero,
  } = dataHero as AttributesProps
  const { url: urlHero, alt: altHero } = imageHero[0] as ImageProps
  const { content: contentTermsOfUse } = dataTermsOfUse as AttributesProps
  return (
    <>
      <Head>
        <title>Terms Of Use</title>
        <meta name="description" content="Terms of use" />
      </Head>
      <Hero
        title={titleHero}
        description={descriptionHero}
        imageUrl={urlHero}
        imageAlt={altHero}
      />
      <div className="mt-10 flex flex-col items-center justify-center pl-4 pr-4">
        {contentTermsOfUse.map((content: TermsOfUseProps, index) => (
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

export default termsOfUse

export async function getStaticProps() {
  try {
    const filesHero = fs.readFileSync(
      `${process.cwd()}/content/termsOfUse/hero.md`
    )
    const { data: dataHero } = matter(filesHero)

    const filesContent = fs.readFileSync(
      `${process.cwd()}/content/termsOfUse/datasTermsOfUse.md`
    )
    const { data: dataTermsOfUse } = matter(filesContent)

    return {
      props: {
        dataHero: JSON.parse(JSON.stringify(dataHero)),
        dataTermsOfUse: JSON.parse(JSON.stringify(dataTermsOfUse)),
      },
    }
  } catch (err) {
    alert(err.message)
  }
  return {
    notFound: true,
  }
}
