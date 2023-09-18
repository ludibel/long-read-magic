import React from 'react'
import matter from 'gray-matter'

import { AttributesProps } from '@/utils/types'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface ThanksProps extends AttributesProps {
  contentThanks: string
  blueTextColor?: boolean
}

export const Thanks = ({
  title,
  description,
  contentThanks,
  linkUrl,
  linkString,
  blueTextColor,
}: ThanksProps) => {
  const textColorClass = blueTextColor ? 'text-textColor-blue' : 'text-white'
  return (
    <>
      <div className="z-1 relative flex flex-col gap-6 px-4 pb-[120px] pt-[160px] md:px-[54px] 2xl:pl-[200px]">
        <div className="flex">
          <h1
            className={`font-inter text-4xl font-semibold capitalize ${textColorClass} lg:text-[52px] lg:leading-[4rem] 2xl:text-7xl`}
          >
            {title} !
          </h1>
        </div>
        <div>
          <p
            className={`font-inter gap-x-6 text-sm font-normal leading-6 ${textColorClass} sm:text-[21px] md:leading-9 2xl:text-2xl`}
          >
            {description}
          </p>
          <div
            className={`font-inter flex flex-row  gap-x-2 text-sm font-normal leading-6 ${textColorClass} sm:text-[21px] md:leading-9 2xl:text-2xl`}
          >
            <ReactMarkdown>{contentThanks}</ReactMarkdown>
            <Link href={linkUrl} className="undeline-offset-1 underline">
              {linkString}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Thanks
