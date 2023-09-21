import React from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from 'next/image'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Genomes', href: '/genomes' },
  { name: 'Taxonomy Tree', href: '/taxonomyTree' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const currenPath = router.pathname
  const shouldMakeHeaderTransparent =
    currenPath === '/' ||
    currenPath === '/genomes' ||
    currenPath === '/about' ||
    currenPath === '/resources' ||
    currenPath === '/contact'

  useScrollPosition(
    ({ currPos }) => {
      currPos.y >= 0 ? setScrolled(false) : setScrolled(true)
    },
    [scrolled]
  )

  return (
    <header
      className={clsx(
        'fixed top-0 z-[1] w-full',
        !scrolled && shouldMakeHeaderTransparent
          ? 'drop-shadow-3xl bg-transparent fill-current text-white'
          : 'text-darkblue drop-shadow-3xl bg-white shadow-md'
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5" aria-label="link home">
          <span className="sr-only">Project name</span>
          <Image
            width={512}
            height={499}
            className="h-10 w-auto"
            src="/images/logo_header.png"
            alt="Project logo"
          />
        </Link>
        <div className="flex lg:hidden">
          <button
            aria-label="button menu"
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              aria-label={`link ${item.name} `}
              key={item.name}
              href={item.href}
              className={clsx(
                'text-lg font-semibold capitalize leading-6',
                currenPath === item.href.toLowerCase() &&
                  scrolled &&
                  'border-b-2 border-textColor-bluelight text-darkBlue ',
                // if is scolle and should make header transparent
                currenPath === item.href &&
                  !scrolled &&
                  shouldMakeHeaderTransparent &&
                  'border-b-2 border-textColor-yellow text-textColor-yellow',
                currenPath === item.href &&
                  !scrolled &&
                  !shouldMakeHeaderTransparent &&
                  'border-b-2 border-textColor-bluelight text-darkBlue',
                !scrolled && shouldMakeHeaderTransparent
                  ? 'rounded-[1px] hover:border-b-2 hover:border-textColor-yellow hover:text-textColor-yellow'
                  : 'rounded-[1px] hover:border-b-2 hover:border-textColor-bluelight hover:text-darkBlue'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              aria-label="link to home"
              onClick={() => setMobileMenuOpen(false)}
            >

              <span className="sr-only">Project name</span>
              <Image
                width={512}
                height={499}
                className="h-8 w-auto"
                src="/images/logo_header.png"
                alt="Project logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    aria-label={`link ${item.name} `}
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-textColor-blue hover:bg-gray-50 hover:text-textColor-bluelight"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
