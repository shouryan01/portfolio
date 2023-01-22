import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@fontsource/inter/variable-full.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET
import Router from 'next/router'
import { useTheme } from 'next-themes'

export default function App({ Component, pageProps }) {
  const { theme, setTheme } = useTheme()

  const actions = [
    {
      id: 'email',
      name: 'Email Shouryan',
      section: 'General',
      perform: () => Router.push('mailto:snnikam@umich.edu'),
    },
    {
      id: 'copy_url',
      name: 'Copy Website URL',
      section: 'General',
      perform: () => navigator.clipboard.writeText('https://www.shouryannikam.me'),
    },
    {
      id: 'theme_light',
      name: 'Light Theme',
      perform: () => {
        alert(theme)
        setTheme('light')
      },
    },
    {
      id: 'theme_dark',
      name: 'Dark Theme',
      perform: () => {
        setTheme('dark')
      },
    },

    {
      id: 'home',
      name: 'Home',
      section: 'Navigation',
      perform: () => Router.push('/'),
    },
    {
      id: 'Blog',
      name: 'Blog',
      section: 'Navigation',
      perform: () => Router.push('/blog'),
    },
    {
      id: 'Projects',
      name: 'Projects',
      section: 'Navigation',
      perform: () => Router.push('/projects'),
    },
    {
      id: 'About',
      name: 'About',
      section: 'Navigation',
      perform: () => Router.push('/about'),
    },

    {
      id: 'linkedin',
      name: 'LinkedIn',
      section: 'Social Media Links',
      perform: () => window.open('https://www.linkedin.com/in/shouryannikam', '_blank'),
    },
    {
      id: 'github',
      name: 'GitHub',
      section: 'Social Media Links',
      perform: () => window.open('https://www.github.com', '_blank'),
    },
    {
      id: 'twitter',
      name: 'Twitter',
      section: 'Social Media Links',
      perform: () => window.open('https://www.twitter.com/shouryannikam', '_blank'),
    },
    {
      id: 'youtube',
      name: 'YouTube',
      section: 'Social Media Links',
      perform: () => window.open('https://www.youtube.com/c/ShouryanNikam', '_blank'),
    },
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
