import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Genomes', href: '/genomes' },
  { name: 'Tree', href: '/taxonomyTree' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
]

const terms = [
  { name: 'Terms of Use', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/termsService' },
]

export function Footer() {
  return (
    <footer
      className=" bg-backgroundColor-blue"
      aria-labelledby="footer-heading"
    >
      <nav
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between p-6 sm:flex-wrap lg:px-8"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5">
          <Image
            width={512}
            height={499}
            className="h-10 w-auto"
            src="/images/logo_header.png"
            alt="Project logo"
          />
        </Link>
        <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-semibold capitalize leading-6 text-white hover:text-textColor-yellow"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-t border-strokeColor-bluelight">
        <div className="mx-auto flex items-center justify-between  p-6 lg:max-w-7xl lg:px-8">
          <p className="text-sm text-white">@2023</p>
          <div className="flex items-center divide-x">
            {terms.map((item, index) => (
              <div
                key={item.name}
                className={`${index !== 2 ? 'px-4' : 'pl-4'}`}
              >
                <Link
                  href={item.href}
                  className="hover:text-yellowlight text-sm capitalize leading-6 text-white hover:text-textColor-yellow"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
