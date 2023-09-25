import React from 'react'
import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'

import Image from 'next/image'

import ContactForm from '@/components/ContactForm'

import { AttributesProps, ImageProps} from '@/utils/types'

import { handleSubmitForm } from '@/utils/form'

const Contact = ({ dataContact, dataThanks, contentThanks }) => {
  const {
    title: titleForm,
    description: descriptionForm,
    imageForm
  } = dataContact as AttributesProps
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
        <title>Contact</title>
        <meta name="description" content="Contact form" />
      </Head>
      <div className="relative h-full">
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
        <div className="mx-auto flex h-[100%] items-center justify-center">
          <div className="z-1 relative w-[100vw] px-4 pb-[120px] pt-[160px] md:px-[54px]">
            <ContactForm
              title={titleForm}
              description={descriptionForm}
              onSubmit={handleSubmitForm}
              notBackground
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

export default Contact

export async function getStaticProps() {
  try {
    const fileContact = fs.readFileSync(
        `${process.cwd()}/content/contactForm/datasContactForm.md`,
        'utf-8'
      ),
      { data: dataContact } = matter(fileContact)
    const filesThanks = fs.readFileSync(
      `${process.cwd()}/content/thanks/datas.md`
    )
    const { data: dataThanks, content: contentThanks } = matter(filesThanks)
    return {
      props: {
        dataContact: JSON.parse(JSON.stringify(dataContact)),
        dataThanks: JSON.parse(JSON.stringify(dataThanks)),
        contentThanks: contentThanks,
      },
    }
  } catch (error) {
    alert(error.message)
  }
  return {
    notFound: true,
  }
}
