import React from 'react'
import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'

import Image from 'next/image'
import imageContact from '@/public/images/about_contact-min.png'

import ContactForm from '@/components/ContactForm'

import { AttributesProps } from '@/utils/types'

import { handleSubmitForm } from '../utils/form'

const Contact = ({ dataContact }) => {
  const { title: titleForm, description: descriptionForm } =
    dataContact as AttributesProps
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact form" />
      </Head>
      <div className="relative h-full">
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
        <div className="mx-auto flex h-[100%] items-center justify-center">
          <div className="z-1 relative w-[100vw] px-4 pb-[120px] pt-[160px] md:px-[54px]">
            <ContactForm
              title={titleForm}
              description={descriptionForm}
              onSubmit={handleSubmitForm}
              notBackground
              buttondark
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact

export async function getStaticProps() {
  try {
    const fileContact = fs.readFileSync(
        `${process.cwd()}/content/homePage/contactForm.md`,
        'utf-8'
      ),
      { data: dataContact } = matter(fileContact)
    return {
      props: {
        dataContact: JSON.parse(JSON.stringify(dataContact)),
      },
    }
  } catch (error) {
    alert(error.message)
  }
  return {
    notFound: true,
  }
}
