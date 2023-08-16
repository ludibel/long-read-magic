import React from 'react'
import Head from 'next/head'

import Image from 'next/image'
import imageHero from '@/public/images/about_hero-min.png'
import imageContact from '@/public/images/about_contact-min.png'

import { attributes as heroAttributes } from '@/content/aboutPage/hero.md'
import { attributes as researcheAttributes } from '@/content/aboutPage/researches.md'
import { attributes as formAttributes } from '@/content/homePage/contactForm.md'
import { AttributesProps, ResearcherProps } from '@/utils/types'

import logoLab from '@/public/images/logo_lab.png'
import logoReseauLab from '@/public/images/icon_reseauLab.png'
import LogoBdb from '@/public/images/logo_about.png'

import ContactForm from '@/components/ContactForm'

import { handleSubmitForm } from '../utils/form'

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
            <h1 className="font-inter text-4xl font-semibold capitalize text-white lg:text-[52px] lg:leading-[4rem] 2xl:text-7xl ">
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

export default function About() {
  const { title: titleHero, description: descriptionHero } =
    heroAttributes as AttributesProps
  const {
    title: titleResearches,
    description: descriptionResearches,
    researcher,
    nameLab,
  } = researcheAttributes as AttributesProps
  const { title: titleForm, description: descriptionForm } =
    formAttributes as AttributesProps

  return (
    <>
      <Head>
        <title>About - Project name</title>
        <meta
          name="description"
          content="Information about the scientists and researchers who created the tool. Brief background on their expertise in genomics and long read sequencing techniques. Presentation of the Big Data Biology Lab and link to their website."
        />
      </Head>
      <HeroComponent title={titleHero} description={descriptionHero} />
      <div className="bg-backgroundColor-grey py-8 md:px-[54px] md:py-16 xl:px-[108px]">
        <div className="pb-4 text-left md:pb-16">
          <h2 className="text-bold font-karla text-4xl text-textColor-blue lg:text-[34px]">
            {titleResearches}
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
                    alt="photo of the researcher"
                  />
                </div>
                <div className="text-center">
                  <p className="'sm:text-lg text-base font-medium text-textColor-blue lg:text-[21px]">
                    {person.job}
                  </p>
                  <div className="mt-6 flex justify-center gap-x-4">
                    <a href={person.linkReseau}>
                      <Image src={logoReseauLab} alt="logo BigDataBiologyLab" />
                    </a>

                    <a href={person.linkLab}>
                      <Image src={logoLab} alt="logo BigDataBiologyLab" />
                    </a>
                  </div>
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
              <div className="flex justify-center gap-x-4">
                <a href="#">
                  <Image src={logoReseauLab} alt="logo BigDataBiologyLab" />
                </a>
                <a href="#">
                  <Image src={logoLab} alt="logo BigDataBiologyLab" />
                </a>
              </div>
              <div className="px-3">
                <p className="text-base leading-9 text-textColor-blue sm:text-lg lg:text-[21px]">
                  {descriptionResearches}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative border-b py-24 sm:py-32">
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
        <div className="z-1 relative px-4 py-[90px] md:px-[54px] xl:px-[108px]">
          <ContactForm
            title={titleForm}
            description={descriptionForm}
            onSubmit={handleSubmitForm}
            useBackgroundOpacity
          />
        </div>
      </div>
    </>
  )
}
