import React from 'react'
import Head from 'next/head'

import Image from 'next/image'
import imageContact from '@/public/images/about_contact-min.png'

import ContactForm from '@/components/ContactForm'

import { attributes as formAttributes } from '@/content/homePage/contactForm.md'
import { AttributesProps } from '@/utils/types'

import { handleSubmitForm } from '../utils/form'

const { title: titleForm, description: descriptionForm } =
  formAttributes as AttributesProps

const Contact = () => {
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
