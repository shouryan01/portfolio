import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="sm:mt-16">
      <div className="flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={8} />
          <SocialIcon kind="github" href={siteMetadata.github} size={8} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={8} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={8} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={8} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={8} />
          <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={8} />
          <SocialIcon kind="x" href={siteMetadata.x} size={8} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={8} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={8} />
          <SocialIcon kind="medium" href={siteMetadata.medium} size={8} />
        </div>
      </div>
    </footer>
  )
}
