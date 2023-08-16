import React from 'react'
import Form from './Form'
import { AttributesProps } from '@/utils/types'

interface ContactFormProps extends AttributesProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  useBackgroundOpacity?: boolean
  notBackground?: boolean
}

const ContactForm = ({
  title,
  description,
  onSubmit,
  useBackgroundOpacity,
  notBackground,
}: ContactFormProps) => {
  const backgroundClass = useBackgroundOpacity
    ? 'bg-backgroundColor-greyop'
    : 'bg-backgroundColor-grey'

  const notBackgroundClass = notBackground ? 'bg-transparent' : ''
  const colorClass = notBackground ? 'text-white' : 'text-textColor-blue'
  const paddingClass = notBackground
    ? 'xl:px-4 xl:py-8'
    : 'xl:px-[78px] xl:py-[83px]'
  return (
    <div
      className={`mx-auto flex max-w-2xl flex-col gap-10 rounded md:flex-row ${backgroundClass} ${notBackgroundClass} px-4 py-8 md:max-w-4xl lg:px-8 lg:py-12 xl:max-w-6xl ${paddingClass} 2xl:max-w-full`}
      style={{
        boxShadow: '0px 8px 19px 0px rgba(32,34,80,0.1)',
        backgroundImage: notBackground
          ? 'none'
          : 'linear-gradient(128deg, #FFFFFF 0%, #FFFFFF00 100%)',
      }}
    >
      <div className="flex-auto md:w-32">
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
      <div className="flex-auto md:w-64">
        <Form handleSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default ContactForm
