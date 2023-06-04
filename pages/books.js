import BooksLayout from '@/layouts/BooksLayout'
import { PageSEO } from '@/components/SEO'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('books')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Snippets({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO
        title={`Snippets - ${siteMetadata.author}`}
        description="Reuseable code snippets collected by Parth"
      />
      <BooksLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Books 📚"
      />
    </>
  )
}
