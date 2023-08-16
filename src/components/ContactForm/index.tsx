import React from 'react'
import Form from './Form'
import { AttributesProps } from '@/utils/types'

interface ContactFormProps extends AttributesProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  useBackgroundOpacity?: boolean
}

const ContactForm = ({
  title,
  description,
  onSubmit,
  useBackgroundOpacity,
}: ContactFormProps) => {
  const backgroundClass = useBackgroundOpacity
    ? 'bg-backgroundColor-greyop'
    : 'bg-backgroundColor-grey'
  return (
    <div
      className={`mx-auto grid max-w-2xl gap-10 rounded ${backgroundClass} px-4 py-8 md:max-w-4xl lg:grid-cols-2 lg:px-8 lg:py-12 xl:max-w-6xl xl:px-[78px] xl:py-[83px] 2xl:max-w-full`}
      style={{
        boxShadow: '0px 8px 19px 0px rgba(32,34,80,0.1)',
        backgroundImage: 'linear-gradient(128deg, #FFFFFF 0%, #FFFFFF00 100%)',
      }}
    >
      <div>
        <h2 className="mb-6 text-4xl font-medium text-textColor-blue lg:text-[52px] ">
          {title}
        </h2>
        <p className="mb-6 text-base leading-9 text-textColor-blue sm:text-lg lg:text-[21px]">
          {description}
        </p>
      </div>
      <Form handleSubmit={onSubmit} />
    </div>
  )
}

export default ContactForm
