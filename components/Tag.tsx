import { slug } from 'github-slugger'
import Link from 'next/link'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-primary-600 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase hover:underline hover:underline-offset-2"
    >
      #{text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
