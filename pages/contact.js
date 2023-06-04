import ContactLink from '@/components/ContactLink'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const Contact = () => {
  return (
    <>
      <PageSEO title={`Contact - ${siteMetadata.author}`} description="All my contacts" />
      <div className="mx-auto max-w-5xl overflow-hidden">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Contact
        </h1>
        <div className="pt-10 pb-8">
          <ul className="font-semi-bold flex flex-col space-y-4">
            <ContactLink href="mailto:snnikam@umich.edu" title="email" icon="snnikam" />
            <ContactLink
              href="https://www.linkedin.com/in/shouryannikam/"
              title="linkedin"
              icon="shouryannikam"
            />
            <ContactLink href="https://github.com/shouryan01" title="github" icon="shouryan01" />
            <ContactLink
              href="https://twitter.com/shouryannikam"
              title="twitter"
              icon="shouryannikam"
            />
            <ContactLink
              href="https://www.youtube.com/c/ShouryanNikam"
              title="youtube"
              icon="shouryannikam"
            />
          </ul>
        </div>
      </div>
    </>
  )
}

export default Contact
