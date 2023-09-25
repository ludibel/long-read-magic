import React, { useState } from 'react'
import Form from './Form'
import { AttributesProps } from '@/utils/types'
import Thanks from '@/components/Thanks'

interface ContactFormProps extends AttributesProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  useBackgroundOpacity?: boolean
  notBackground?: boolean
  buttonlight?: boolean
  buttondark?: boolean
  titleThanks: string
  descriptionThanks: string
  contentThanks: string
  linkUrlThanks?: string
  linkStringThanks?: string
  showBackgroundImage?: boolean
  textBlueColor?: boolean

}

const ContactForm = ({
  title,
  description,
  onSubmit,
  useBackgroundOpacity,
  notBackground,
  buttonlight,
  buttondark,
  titleThanks,
  descriptionThanks,
  contentThanks,
  linkUrlThanks,
  linkStringThanks,
  textBlueColor,
}: ContactFormProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const backgroundClass = useBackgroundOpacity
    ? 'bg-backgroundColor-greyop'
    : 'bg-backgroundColor-grey'

  const notBackgroundClass = notBackground ? 'bg-transparent' : ''
  const colorClass = notBackground ? 'text-white' : 'text-textColor-blue'
  const paddingClass = notBackground
    ? 'xl:px-4 xl:py-8'
    : 'xl:px-[78px] xl:py-[83px]'

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e)
    setFormSubmitted(true)
  }
  return (
    <>
      {formSubmitted ? (
        <Thanks
          title={titleThanks}
          description={descriptionThanks}
          contentThanks={contentThanks}
          linkUrl={linkUrlThanks}
          linkString={linkStringThanks}
          blueTextColor={textBlueColor}
        />
      ) : (
        <div
          className={`z-1 mx-auto flex max-w-2xl flex-col gap-10 rounded lg:flex-row ${backgroundClass} ${notBackgroundClass} px-4 py-8 lg:max-w-4xl lg:px-8 lg:py-12 xl:max-w-7xl ${paddingClass} 2xl:max-w-full 3xl:max-w-7xl 3xl:flex-col`}
          style={{
            boxShadow: '0px 8px 19px 0px rgba(32,34,80,0.1)',
            backgroundImage: notBackground
              ? 'none'
              : 'linear-gradient(128deg, #FFFFFF 0%, #FFFFFF00 100%)',
          }}
        >
          <div className="flex-auto lg:w-32 3xl:w-[100%]">
            <h2
              className={`mb-6 text-4xl font-medium ${colorClass} lg:text-[52px]`}
            >
              {title}
            </h2>
            <p
              className={`mb-6 text-base leading-9 ${colorClass} sm:text-lg lg:text-[21px]`}
            >
              {description}
            </p>
          </div>

          <div className="flex-auto lg:w-64 3xl:w-[100%]">
            <Form
              handleSubmit={handleFormSubmit}
              buttonlight={buttonlight}
              buttondark={buttondark}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ContactForm
