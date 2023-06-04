import { AiFillStar } from 'react-icons/ai'
import BookTag from '@/components/BookTag'
import { BsFillFunnelFill as FilterIcon } from 'react-icons/bs'
import Link from '@/components/Link'
import Pagination from '@/components/Pagination'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'

function DisplayStars(rating) {
  const stars = []
  for (let i = 0; i < rating; i++) {
    stars.push(<AiFillStar className="ml-1 -mt-0.5 inline-block h-4 w-4 text-yellow-500" />)
  }
  return stars
}

export default function BooksLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search Books"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Books"
              className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <Link
              href="/tags"
              className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300"
            >
              <FilterIcon
                className="duration-300 hover:scale-110 hover:text-teal-500 dark:hover:text-teal-500"
                size={24}
              />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, stars, book_author } = frontMatter
            return (
              <Link
                key={slug}
                href={`/books/${slug}`}
                className="bg-day·dark:bg-night·group group relative flex transform cursor-pointer flex-wrap rounded-2xl border border-gray-200 bg-opacity-50 p-px py-px transition duration-200 hover:scale-105 hover:bg-gray-100 dark:border-gray-700 dark:bg-opacity-50 dark:hover:bg-gray-800"
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-primary-500 duration-200 group-hover:scale-x-100" />
                <div className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 transform bg-primary-500 duration-200 group-hover:scale-y-100" />
                <div className="absolute top-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-primary-500 duration-200 group-hover:scale-x-100" />
                <div className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 transform bg-primary-500 duration-200 group-hover:scale-y-100" />
                <div className="bg-day dark:bg-night relative space-y-2 rounded-2xl p-4">
                  <article>
                    <div>
                      <h2 className="text-3xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/books/${slug}`}
                          className="text-gray-900 transition duration-300 hover:scale-105 hover:text-primary-500 dark:text-white dark:hover:text-primary-500 "
                        >
                          {title}
                        </Link>
                      </h2>
                      <div className="prose prose-base max-w-none text-gray-500 sm:prose-lg dark:text-gray-300">
                        {book_author}
                      </div>

                      {DisplayStars(stars)}

                      <div className="sm:prose-md prose prose-base max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>

                      <div className="flex flex-wrap pt-2">
                        {tags.map((tag) => (
                          <BookTag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
