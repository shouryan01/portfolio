import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { Sling as Hamburger } from 'hamburger-react'
import { useRouter } from 'next/router'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const router = useRouter()

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <Hamburger
          toggled={navShow}
          size={29}
          direction="left"
          distance="md"
          rounded
          label="Show menu"
        />
      </button>

      <div
        className={`fixed top-24 right-0 z-10 h-full w-full transform duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        } backdrop-blur-lg`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed h-full w-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map(({ title, href }) => {
            var underline = false

            if (href !== '/') {
              underline = router.pathname.includes(href)
            } else {
              underline = router.pathname === href
            }

            return (
              <div key={title} className="px-12 py-4">
                <Link
                  href={href === 'home' ? '/' : `${href}`}
                  onClick={() => setNavShow(!navShow)}
                  className={`text-2xl tracking-widest text-gray-900 hover:text-teal-500 dark:text-gray-100 
                  ${underline ? 'font-extrabold text-teal-500 dark:text-teal-500' : ''}
                  hover:font-extrabold
                  dark:hover:text-teal-500
                  `}
                  aria-label={title}
                >
                  {title}
                </Link>
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
