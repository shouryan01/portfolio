import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-transparent justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="hover:text-primary-600 dark:hover:text-primary-600 flex items-center justify-between duration-200 hover:scale-105">
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="block h-6 text-2xl font-semibold">{siteMetadata.headerTitle}</div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="mt-2 flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar max-w-40 items-center overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {/* hidden */}
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-600 rounded-xl p-3.5 font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                {link.title}
              </Link>
            ))}
        </div>
        {/* <SearchButton /> */}
        <ThemeSwitch />
        {/* <MobileNav /> */}
      </div>
    </header>
  )
}

export default Header
