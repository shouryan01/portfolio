import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { KBarProvider } from 'kbar'
import DisplayKBar from './DisplayKBar'
import { useTheme } from 'next-themes'
import Router from 'next/router'
import { useKBar, VisualState } from 'kbar'

// import { KBarProvider, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, useMatches } from "kbar";

const LayoutWrapper = ({ children }) => {
  const { theme, setTheme } = useTheme()

  const actions = [
    {
      id: 'email',
      name: '✉️ Email Shouryan',
      section: 'General',
      perform: () => Router.push('mailto:snnikam@umich.edu'),
    },
    {
      id: 'copy_url',
      name: '📋 Copy Website URL',
      section: 'General',
      perform: () => {
        navigator.clipboard.writeText('https://www.shouryannikam.me')
        alert('Copied to clipboard!')
      },
    },
    {
      id: 'theme',
      name: '🌗 Change Theme',
      section: 'General',
    },
    {
      id: 'theme_light',
      name: '☀️ Light Theme',
      parent: 'theme',
      perform: () => {
        setTheme('light')
      },
    },
    {
      id: 'theme_dark',
      name: '🌙 Dark Theme',
      parent: 'theme',
      perform: () => {
        setTheme('dark')
      },
    },
    {
      id: 'home',
      name: '🏠 Home',
      section: 'Navigation',
      perform: () => Router.push('/'),
    },
    {
      id: 'Blog',
      name: '✍️ Blog',
      section: 'Navigation',
      perform: () => Router.push('/blog'),
    },
    {
      id: 'Projects',
      name: '💡 Projects',
      section: 'Navigation',
      perform: () => Router.push('/projects'),
    },
    {
      id: 'About',
      name: '👤 About',
      section: 'Navigation',
      perform: () => Router.push('/about'),
    },

    {
      id: 'linkedin',
      name: '💼 LinkedIn',
      section: 'Social Media Links',
      perform: () => window.open('https://www.linkedin.com/in/shouryannikam', '_blank'),
    },
    {
      id: 'github',
      name: '💻 GitHub',
      section: 'Social Media Links',
      perform: () => window.open('https://www.github.com/shouryan01', '_blank'),
    },
    {
      id: 'twitter',
      name: '🐦 Twitter',
      section: 'Social Media Links',
      perform: () => window.open('https://www.twitter.com/shouryannikam', '_blank'),
    },
    {
      id: 'youtube',
      name: '📹 YouTube',
      section: 'Social Media Links',
      perform: () => window.open('https://www.youtube.com/c/ShouryanNikam', '_blank'),
    },
  ]

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between dark:text-white">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="h-6 text-3xl font-semibold decoration-4 hover:underline sm:block">
                  {siteMetadata.headerTitle}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded-xl p-1 font-medium text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">
          <KBarProvider actions={actions} options={{ enableHistory: true }}>
            <DisplayKBar />
            {children}
          </KBarProvider>
        </main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
