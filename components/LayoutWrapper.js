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
import DropMenu from './DropMenu'
// #29beae

const LayoutWrapper = ({ children }) => {
  const { theme, setTheme } = useTheme()
  const actions = [
    {
      id: 'navigation',
      section: 'Navigation',
      name: '🧭 Navigation',
    },
    {
      id: 'home',
      name: '🏠 Home',
      section: 'Navigation',
      parent: 'navigation',
      perform: () => Router.push('/'),
    },
    {
      id: 'Blog',
      name: '✍️ Blog',
      section: 'Navigation',
      parent: 'navigation',
      perform: () => Router.push('/blog'),
    },
    {
      id: 'Projects',
      name: '💡 Projects',
      section: 'Navigation',
      parent: 'navigation',
      perform: () => Router.push('/projects'),
    },
    {
      id: 'About',
      name: '👤 About',
      section: 'Navigation',
      parent: 'navigation',
      perform: () => Router.push('/about'),
    },

    {
      id: 'general',
      name: '🛠 Tools',
      section: 'General',
    },
    {
      id: 'email',
      name: '✉️ Email Shouryan',
      section: 'Tools',
      parent: 'general',
      perform: () => Router.push('mailto:snnikam@umich.edu'),
    },
    {
      id: 'copy_url',
      name: '📋 Copy Website URL',
      section: 'Tools',
      parent: 'general',
      perform: () => {
        navigator.clipboard.writeText('https://www.shouryannikam.com')
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
      id: 'links',
      name: '🔗 Social Media Links',
      section: 'Social Media Links',
    },
    {
      id: 'linkedin',
      name: '💼 LinkedIn',
      section: 'Social Media Links',
      parent: 'links',
      perform: () => window.open('https://www.linkedin.com/in/shouryannikam', '_blank'),
    },
    {
      id: 'github',
      name: '💻 GitHub',
      section: 'Social Media Links',
      parent: 'links',
      perform: () => window.open('https://www.github.com/shouryan01', '_blank'),
    },
    {
      id: 'twitter',
      name: '🐦 Twitter',
      section: 'Social Media Links',
      parent: 'links',
      perform: () => window.open('https://www.twitter.com/shouryannikam', '_blank'),
    },
    {
      id: 'youtube',
      name: '📹 YouTube',
      section: 'Social Media Links',
      parent: 'links',
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
                <div className="h-6 text-3xl font-semibold decoration-4 duration-300 hover:scale-125 hover:text-teal-500 sm:block">
                  {siteMetadata.headerTitle}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map(
                (link) =>
                  link.title !== 'Home' &&
                  link.title !== 'Books' &&
                  link.title !== 'Quotes' && (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="rounded-xl p-1 font-medium text-gray-900 duration-300 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:p-4"
                    >
                      {link.title}
                    </Link>
                  )
              )}
            </div>
            <ThemeSwitch />
            <DropMenu />
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
