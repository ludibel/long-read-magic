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
  { name: 'Terms of Use', href: '/termsOfUse' },
  { name: 'Privacy Policy', href: '/privacyPolicy' },
  { name: 'Terms of Service', href: '/termsOfService' },
]

export function Footer() {
  return (
    <footer
      className="mt-auto bg-backgroundColor-blue"
      aria-labelledby="footer-heading"
    >
      <nav
        className="mx-auto flex max-w-7xl flex-col items-center justify-center p-6 sm:flex-row  sm:flex-wrap sm:justify-between lg:px-8"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5" arial-label="link home">
          <Image
            width={512}
            height={499}
            className="h-10 w-auto"
            src="/images/logo_header.png"
            alt="Project logo"
          />
        </Link>
        <div className="mt-4 flex gap-x-2 sm:mt-0 md:gap-x-4 lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              arial-label={`link ${item.name} `}
              key={item.name}
              href={item.href}
              className="text-md font-semibold capitalize leading-6 text-white hover:text-textColor-yellow"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-t border-strokeColor-bluelight">
        <div className="mx-auto flex items-center justify-between  p-6 lg:max-w-7xl lg:px-8">
          <p className="text-xs text-white sm:text-sm">@2023</p>
          <div className="flex items-center divide-x">
            {terms.map((item, index) => (
              <div
                key={item.name}
                className={`${index !== 2 ? 'px-4' : 'pl-4'}`}
              >
                <Link
                  arial-label={`link ${item.name} `}
                  href={item.href}
                  className="hover:text-yellowlight text-xs capitalize leading-6 text-white hover:text-textColor-yellow sm:text-sm"
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
