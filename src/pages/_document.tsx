import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&family=Karla:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&family=Karla:wght@700&family=Libre+Franklin&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="flex h-full flex-col bg-backgroundColor-greylight dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
