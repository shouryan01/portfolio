import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import Emoji from '../lib/utils/emoji'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 mb-16 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="8" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="8" />
          <SocialIcon kind="github" href={siteMetadata.github} size="8" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="8" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="8" />
        </div>
      </div>
    </footer>
  )
}
