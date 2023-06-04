import BookListLayout from '@/layouts/BooksListLayout'
import Link from '@/components/Link'
import { TagSEO } from '@/components/SEO'
import fs from 'fs'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import path from 'path'
import siteMetadata from '@/data/siteMetadata'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('books')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('books')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'tags', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = `#${tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)}`
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <Link href="/book-tags">
        <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-red-700 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-red-700 focus:outline-none dark:hover:bg-red-500">
          Clear Filters
        </button>
      </Link>

      <BookListLayout posts={posts} title={title} />
    </>
  )
}
