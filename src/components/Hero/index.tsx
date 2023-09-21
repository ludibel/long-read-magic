import React from 'react'
import Image from 'next/image'

import { AttributesProps } from '@/utils/types'

const Hero: React.FC<AttributesProps> = ({
  title,
  description,
  imageUrl,
  imageAlt,
}) => {
  return (
    <div className="relative h-[350px] w-full sm:h-[450px] 2xl:h-[650px]">
      <Image
        src={imageUrl}
        alt={imageAlt}
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
        <div className="flex flex-auto flex-col items-center justify-center pb-4 pl-4 pr-4 pt-12 md:pl-[54px] md:pr-[54px]">
          <div>
            <h1 className="font-inter text-4xl font-semibold capitalize text-white lg:text-[52px] lg:leading-[4rem] 2xl:text-7xl">
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

export default Hero
