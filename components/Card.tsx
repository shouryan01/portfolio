import Image from './Image'
import Link from './Link'
import SocialIcon from './social-icons'
import Tag from './Tag'

const Card = ({ title, description, imgSrc, href, github, tech1, tech2, tech3, tech4 }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } border-opacity-60 overflow-hidden rounded-md border-2 border-gray-200 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <div className="flex flex-row justify-between">
          <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <SocialIcon kind="github" href={github} size={6} />
        </div>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        <div className="flex flex-row justify-between">
          <div className="text-sm">
            {tech1 && <Tag key={tech1} text={tech1} />}
            {tech2 && <Tag key={tech2} text={tech2} />}
            {tech3 && <Tag key={tech3} text={tech3} />}
            {tech4 && <Tag key={tech4} text={tech4} />}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Card
