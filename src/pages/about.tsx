import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import matter from 'gray-matter'
import fs from 'fs'

import {
  AttributesProps,
  ResearcherProps,
  LinkAboutProps,
  ImageProps,
} from '@/utils/types'

import logoOrcid from '@/public/images/logo_orcid.png'
import logoGoogleScholar from '@/public/images/logo_googleScholar.png'
import logoGoogleScholarDark from '@/public/images/logo_googleScholar_dark.png'
import LogoBdb from '@/public/images/logo_about.png'
import logoOrcidDark from '@/public/images/logo_orcid_dark.png'

import ContactForm from '@/components/ContactForm'
import ButtonLink from '@/components/Button'
import Hero from '@/components/Hero'

import { handleSubmitForm } from '@/utils/form'


const LinkComponent: React.FC<LinkAboutProps> = ({
  urlGoogleScholar,
  urlOrcid,
}) => {
  return (
    <div className="relative mt-6 flex justify-center gap-x-4">
      <div className="group">
        <Link
          href={urlGoogleScholar}
          aria-label="link googleShcolar"
          target="_blank"
        >
          <div className="relative">
            <Image
              src={logoGoogleScholar}
              alt="logo Google Scholar"
              width={32}
              height={32}
              className="transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={logoGoogleScholarDark}
              alt="logo Google Scholar"
              width={32}
              height={32}
              className="absolute top-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </Link>
      </div>
      <div className="group">
        <Link href={urlOrcid} aria-label="link orcid" target="_blank">
          <div className="relative">
            <Image
              src={logoOrcid}
              alt="logo Orcid"
              width={32}
              height={32}
              className="transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={logoOrcidDark}
              alt="logo Orcid"
              width={32}
              height={32}
              className="absolute top-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export const About = ({
  dataHero,
  dataForm,
  dataResearches,
  dataThanks,
  contentThanks,
}) => {
  const {
    title: titleHero,
    description: descriptionHero,
    imageHero,
  } = dataHero as AttributesProps
  const { url: urlHero, alt: altHero } = imageHero[0] as ImageProps
  const {
    title: titleResearchers,
    description: descriptionResearchers,
    researcher,
    nameLab,
    linkLab,
  } = dataResearches as AttributesProps
  const {
    title: titleForm,
    description: descriptionForm,
    imageForm,
  } = dataForm as AttributesProps
  const { url: urlImageForm, alt: altImageForm } = imageForm[0] as ImageProps
  const {
    title: titleThanks,
    description: descriptionThanks,
    linkUrl: linkUrlThanks,
    linkString: linkStringThanks,
  } = dataThanks as AttributesProps


  return (
    <>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="Information about the scientists and researchers who created the tool. Brief background on their expertise in genomics and long read sequencing techniques. Presentation of the Big Data Biology Lab and link to their website."
        />
      </Head>
      <Hero
        title={titleHero}
        description={descriptionHero}
        imageUrl={urlHero}
        imageAlt={altHero}
      />
      <div className="bg-backgroundColor-grey">
        <div
          className="
          max-w-[1920px] 
          bg-backgroundColor-grey
          py-8 
          md:px-[54px] 
          md:py-16 
          xl:px-[108px] 
          2xl:mx-auto"
        >
          <div className="pb-4 text-left md:pb-16">
            <h2 className="text-bold font-karla text-4xl text-textColor-blue lg:text-[34px]">
              {titleResearchers}
            </h2>
          </div>
          <div className="-mt-12 space-y-12 divide-y divide-strokeColor-greylight xl:col-span-3">
            {researcher.map((person: ResearcherProps) => (
              <div
                key={person.name}
                className="flex flex-col gap-10 px-4 pt-12 md:flex-row md:gap-[30px] md:px-0 xl:gap-[108px] 2xl:justify-center 2xl:gap-[200px]"
              >
                <div className=" flex flex-col items-center justify-center rounded rounded-r-md bg-backgroundColor-greylight px-8 py-8 md:w-[256px]">
                  <div className="align pb-6">
                    <Image
                      className="mx-auto flex-none rounded-full object-cover"
                      width={140}
                      height={189}
                      src={person.imageUrl}
                      alt={`${person.name} photo `}
                    />
                  </div>
                  <div className="text-center">
                    <p className="'sm:text-lg text-base font-medium text-textColor-blue lg:text-[21px]">
                      {person.job}
                    </p>
                    <LinkComponent
                      urlGoogleScholar={person.linkGoogleScholar}
                      urlOrcid={person.linkOrcid}
                    />
                  </div>
                </div>
                <div className="flex-auto md:max-w-sm lg:max-w-2xl">
                  <div className="pb-6">
                    <h3 className="text-2xl font-semibold text-textColor-blue">
                      {person.name}
                    </h3>
                  </div>
                  <div>
                    <p className="text-base leading-9 text-textColor-blue sm:text-lg lg:text-[21px]">
                      {person.profile}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-6">
              <div className="mt-6 flex flex-col gap-6 rounded bg-backgroundColor-greylightop pb-8 pt-6 text-center sm:px-8 lg:px-16">
                <div className="align">
                  <Image
                    className="mx-auto flex-none rounded-full object-cover"
                    width={140}
                    height={140}
                    src={LogoBdb}
                    alt="logo BigDataBiologyLab"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-textColor-blue sm:text-lg lg:text-2xl">
                    {nameLab}
                  </h3>
                </div>
                <div>
                  <ButtonLink
                    url={linkLab}
                    text="Visit the website"
                    useJustifyCenter
                  />
                </div>
                <div className="px-3">
                  <p className="text-base leading-9 text-textColor-blue sm:text-lg lg:text-[21px]">
                    {descriptionResearchers}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative py-24 sm:py-32 2xl:mx-auto">
          <Image
            src={urlImageForm}
            alt={altImageForm}
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
          <div className="z-1 relative px-4 py-[90px] md:px-[54px] xl:px-[108px]">
            <ContactForm
              title={titleForm}
              description={descriptionForm}
              onSubmit={handleSubmitForm}
              useBackgroundOpacity
              buttondark
              titleThanks={titleThanks}
              descriptionThanks={descriptionThanks}
              contentThanks={contentThanks}
              linkUrlThanks={linkUrlThanks}
              linkStringThanks={linkStringThanks}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default About

export async function getStaticProps() {
  try {
    const filesHero = fs.readFileSync(
      `${process.cwd()}/content/aboutPage/hero.md`
    )
    const { data: dataHero } = matter(filesHero)

    const filesResearches = fs.readFileSync(
      `${process.cwd()}/content/aboutPage/researchers.md`
    )
    const { data: dataResearches } = matter(filesResearches)

    const filesForm = fs.readFileSync(
      `${process.cwd()}/content/contactForm/datasContactForm.md`
    )
    const { data: dataForm } = matter(filesForm)

    const filesThanks = fs.readFileSync(
      `${process.cwd()}/content/thanks/datas.md`
    )
    const { data: dataThanks, content: contentThanks } = matter(filesThanks)

    return {
      props: {
        dataHero: JSON.parse(JSON.stringify(dataHero)),
        dataResearches: JSON.parse(JSON.stringify(dataResearches)),
        dataForm: JSON.parse(JSON.stringify(dataForm)),
        dataThanks: JSON.parse(JSON.stringify(dataThanks)),
        contentThanks,
      },
    }
  } catch (err) {
   alert(err.message)

  }
  return {
    notFound: true,
  }
}
