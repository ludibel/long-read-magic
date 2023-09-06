import React from 'react'
import Image from 'next/image'
import arrowImage from '@/public/images/arrow.png'

interface ButtonProps {
  text: string
  logo: React.ComponentProps<typeof Image>['src']
  url: string
}

const Button = ({ text, logo, url }: ButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center  gap-2 px-4 py-2"
    >
      <div className="h-6 w-6">
        <Image src={logo} alt="GitHub" width={24} height={24} />
      </div>
      <span className="text-base font-medium capitalize text-darkBlue">
        {text}
      </span>
      <div className="h-7 w-7 pt-2">
        <Image src={arrowImage} alt="arrow" width={24} height={24} />
      </div>
    </a>
  )
}

export default Button
