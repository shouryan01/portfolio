import { genPageMetadata } from 'app/seo'
import { Authors, allAuthors } from 'contentlayer/generated'
import Link from 'next/link'
import { coreContent } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  const mediaLinks = [
    {
      title: 'Books',
      url: 'https://app.thestorygraph.com/profile/shouryannikam',
      icon: '📚',
    },
    {
      title: 'Movies',
      url: 'https://letterboxd.com/snnikam01/films/',
      icon: '🎬',
    },

    {
      title: 'TV Shows',
      url: 'https://www.serializd.com/user/snnikam01/shows',
      icon: '📺',
    },
    {
      title: 'Video Games',
      url: 'https://backloggd.com/u/snnikam01/games/',
      icon: '🎮',
    },
  ]

  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex flex-row gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-28">
        {mediaLinks.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label={link.title}
          >
            <span
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ lineHeight: 1 }}
            >
              {link.icon}
            </span>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-200 dark:text-gray-800">
              {link.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
