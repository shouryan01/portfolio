import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Banner from '@/components/Banner'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { renderCanvas } from '@/components/renderCanvas'
import { useEffect } from 'react'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  useEffect(() => {
    renderCanvas()
  }, [])
  return (
    <div>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
      <Banner />
      {/* <div className="mt-8 text-slate-600 dark:text-slate-400">
            <span className="text-sm">Press</span>{' '}
            <span className="rounded-md bg-gray-300 p-1 text-sm text-gray-900 dark:bg-gray-400">
                ⌘
            </span>{' '}
            <span className="text-sm">+ </span>
            <span className="rounded-md bg-gray-300 p-1 text-sm text-gray-900 dark:bg-gray-400">
                E
            </span>{' '}
        <span className="text-sm">to start</span>
        </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul> */}
    </div>
  )
}
