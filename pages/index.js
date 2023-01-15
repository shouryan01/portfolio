import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Banner from '@/components/Banner'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { renderCanvas } from '@/components/renderCanvas'
import { useEffect } from 'react'
import Snowfall from 'react-snowfall'
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
      <Snowfall color="#c4c3be" />
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
      <Banner />
    </div>
  )
}
