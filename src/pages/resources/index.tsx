import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import matter from 'gray-matter'
import fs from 'fs'
import Link from 'next/link'
import arrowImage from '@/public/images/vector_arrow_min.png'
import arrowImageMax from '@/public/images/vector_arrow_max.png'
import { AttributesProps, ImageProps } from '@/utils/types'

export const Resources = ({ resources, datahero }) => {
  const { title, description, imageHero } = datahero as AttributesProps
  const { url: urlIamge, alt: altImage } = imageHero[0] as ImageProps
  const sortedResources = [...resources].sort((a, b) => {
    if (a.slug === 'tools') {
      return -1
    }
    if (b.slug === 'tools') {
      return 1
    }
    return 0
  })

  return (
    <>
      <Head>
        <title>Resources</title>
        <meta name="resources" content="resources project" />
      </Head>
      <div className="relative h-full flex-1">
        <Image
          src={urlIamge}
          alt={altImage}
          fill
          className="bg-lightgray bg-opacity-50 object-cover object-center"
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(91deg, #001135 0%, rgba(0, 17, 53, 0.00) 100%)',
          }}
        ></div>
        <div className=" relative flex max-w-[1920px] flex-col items-center justify-center gap-6 pb-8 pt-16 lg:pt-44 2xl:mx-auto">
          <div className="flex">
            <h1 className="font-inter text-4xl font-semibold capitalize text-white lg:text-[52px] lg:leading-[4rem] 2xl:text-7xl ">
              {title}
            </h1>
          </div>
          <div className="flex px-4">
            <p className="font-inter gap-x-6 text-sm font-normal leading-6 text-white sm:text-[21px] md:leading-9 2xl:text-2xl">
              {description}
            </p>
          </div>
          <div className="mt-16 grid w-full flex-1 grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:px-[108px] ">
            {sortedResources.map((resource) => (
              <div
                key={resource.data.title}
                className="flex h-[291px] flex-[1_0_0] flex-col items-start justify-center rounded-lg bg-[#f7f7f780] px-[30px] py-[40px]"
                style={{
                  boxShadow: '0px 8px 18px 0px rgba(32,34,80,0.1)',
                  backgroundImage:
                    'linear-gradient(135deg, #FFF 0%, rgba(246, 247, 249, 0.66) 77.67%, rgba(254, 254, 254, 0.00) 100%)',
                }}
              >
                <div className="flex flex-1">
                  <h2 className="font-karla text-[30px] font-bold capitalize text-textColor-blue lg:text-[34px]">
                    {resource.data.title}
                  </h2>
                </div>
                <div className="flex flex-1">
                  <p className="font-libre_franklin text-[19px] text-textColor-blue">
                    {resource.data.description}
                  </p>
                </div>
                <div className="flex-0 flex w-[100%]">
                  <Link
                    key={resource.file}
                    href={`/resources/${resource.slug}`}
                    className="group"
                    aria-label="button to go to the resource page"
                  >
                    <div className="flex items-center">
                      <Image
                        src={arrowImage}
                        alt="logo arrow"
                        width={64}
                        aria-label={`button to go to the ${resource.data.title} page`}
                        className="transition-opacity duration-100 group-hover:opacity-0"
                      />
                      <Image
                        src={arrowImageMax}
                        alt="logo arrow dark"
                        width={78}
                        aria-label={`button to go to the ${resource.data.title} page`}
                        className="absolute opacity-0 transition-opacity duration-100 group-hover:opacity-100"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Resources

export function getStaticProps() {
  try {
    const filehero = fs.readFileSync(
      `${process.cwd()}/content/resourcesHero/hero.md`
    )
    const { data: datahero } = matter(filehero)

    const files = fs.readdirSync(`${process.cwd()}/content/resources`)
    const resources = files
      .filter((fn) => fn.endsWith('.md') && fn !== 'hero.md')
      .map((file) => {
        const slug = file.split('.')[0]
        const path = `${process.cwd()}/content/resources/${file}`
        const rawContent = fs.readFileSync(path, {
          encoding: 'utf-8',
        })
        const { data } = matter(rawContent)

        return {
          data,
          file,
          slug,
        }
      })
    return {
      props: {
        resources,
        datahero: JSON.parse(JSON.stringify(datahero)),
      },
    }
  } catch (error) {
    alert(error.message)
  }
  return {
    notFound: true,
  }
}
