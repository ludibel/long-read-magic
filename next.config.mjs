import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx', 'md'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
    }
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/genomes',
  //       permanent: false,
  //     }
  //   ]
  // },
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] }
    })
    return cfg
  }
}

export default nextConfig
// const withMDX = nextMDX({
//   extension: /\.(md|mdx)$/,
//   options: {
//     remarkPlugins: [remarkGfm],
//     rehypePlugins: [rehypePrism],
//   },
//   })

// export default withMDX(nextConfig)


