import React from 'react'
import Image from 'next/image'
import arrowImage from '@/public/images/arrow.png'
import arrowImageHover from '@/public/images/arrow_image_hover.png'
import Link from 'next/link'


interface ButtonProps {
  text: string
  logo?: React.ComponentProps<typeof Image>['src']
  logoHover?: React.ComponentProps<typeof Image>['src']
  url: string
  useJustifyCenter?: boolean
}

const Button = ({
  text,
  logo,
  url,
  logoHover,
  useJustifyCenter,
}: ButtonProps) => {
  const justifyClass = useJustifyCenter ? 'justify-center' : 'justify-start'
  return (
    <Link
      className={`group flex items-center gap-4 px-0 py-[10px] focus:outline-none ${justifyClass}`}
      href={url}
      aria-label={`link ${text} `}
      target="_blank"
    >
      {logo && logoHover && (
        <div className="relative h-6 w-6 transition-colors duration-100">
          <Image
            src={logo}
            alt={text}
            width={24}
            height={24}
            className="transition-opacity duration-100 group-hover:opacity-0"
          />
          <Image
            src={logoHover}
            alt={text}
            width={24}
            height={24}
            className="absolute left-0 top-0 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
          />
        </div>
      )}
      <span className="text-base font-medium capitalize text-darkBlue transition-colors duration-100 group-hover:text-textColor-bluelight">
        {text}
      </span>
      <div className="flex h-6 w-6 items-center transition-colors duration-100">
        <Image
          src={arrowImage}
          alt="logo arrow"
          width={24}
          className="transition-opacity duration-100 group-hover:opacity-0"
        />
        <Image
          src={arrowImageHover}
          alt="logo arrow dark"
          width={48}
          className="absolute opacity-0 transition-opacity duration-100 group-hover:opacity-100"
        />
      </div>
    </Link>

  )
}

export default Button
