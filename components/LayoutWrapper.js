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
  // // const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   function handleKeyDown(e) {
  //     if (e.metaKey && e.key === 'k') {
  //       e.preventDefault()
  //       e.stopPropagation()

  //       setOpen((currentValue) => {
  //         return !currentValue
  //       })
  //     }
  //   }
  // useEffect(() => {
  //   function handleKeyDown(e) {
  //     if (e.metaKey && e.key === 'k') {
  //       e.preventDefault()
  //       e.stopPropagation()

  //       setOpen((currentValue) => {
  //         return !currentValue
  //       })
  //     }
  //   }
  //   document.addEventListener('keydown', handleKeyDown)
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [])
  // const actions = [
  //   {
  //     id: "blog",
  //     name: "Blog",
  //     shortcut: ["b"],
  //     keywords: "writing words",
  //     perform: () => (window.location.pathname = "blog"),
  //   },
  //   {
  //     id: "contact",
  //     name: "Contact",
  //     shortcut: ["c"],
  //     keywords: "email",
  //     perform: () => (window.location.pathname = "contact"),
  //   },
  // ]

  // const [stuck, setStuck] = useState(false)
  // const ref = useRef()
  // const stuckClasses =
  //   'py-2 sticky top-n-1 z-50 transition-all backdrop isSticky mx-auto border-b border-slate-900/10 dark:border-slate-300/10 mb-16 w-full'
  // const unstuckClasses =
  //   'py-2 md:py-8 sticky top-n-1 z-50 transition-all backdrop mx-auto border-b border-b-0 border-slate-900/10 dark:border-slate-300/10 mb-16 w-full'

  // const classes = stuck ? stuckClasses : unstuckClasses

  //   document.addEventListener('keydown', handleKeyDown)
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [])
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
      perform: () => navigator.clipboard.writeText('https://www.shouryannikam.me'),
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
      <div className="flex h-screen flex-col justify-between">
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
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
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
          {/* <CmdPalette open={open} setOpen={setOpen} /> */}
        </main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
