import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import BooksLayout from '@/layouts/BooksLayout'
import { PageSEO } from '@/components/SEO'

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

// import siteMetadata from '@/data/siteMetadata'
// import RecommendCard from '@/components/RecommendCard'
// import BookRecommendCard from '@/components/BookRecommendCard'
// import { PageSEO } from '@/components/SEO'
// import NowReading from '@/components/NowReading'

// export default function Recommends(reviews) {

//   return (
//     <>
//       <PageSEO
//         title={`Recommendations - ${siteMetadata.author}`}
//         description="Recommended movies, books and more"
//       />
//       <div className="mx-auto max-w-3xl">
//         <div className="space-y-2 pt-6 pb-8 md:space-y-5">
//           <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
//             Books 📚
//           </h1>
//           <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
//             A list of recommended books that I have read and enjoyed.
//           </p>
//         </div>
//         <div className="-m-4 flex flex-wrap max-w-[30]">
//             <BookRecommendCard
//                 key={"asdf"}
//                 title={"asdf"}
//                 description={"asdksajdfnadskf a"}
//                 href={"https://www.google.com"}
//                 rating={2}
//             >
//             </BookRecommendCard>
//             <BookRecommendCard
//                 key={"asdfs"}
//                 title={"asdasdff"}
//                 description={"asdsdfasd"}
//                 href={"https://www.google.com"}
//                 rating={5}
//             >
//             </BookRecommendCard>
//             <BookRecommendCard
//                 key={"asdfss"}
//                 title={"asdasdff"}
//                 description={"asdsdfasd"}
//                 href={"https://www.google.com"}
//                 rating={5}
//             >
//             </BookRecommendCard>
//         </div>
//       </div>
//     </>
//   )
// }
