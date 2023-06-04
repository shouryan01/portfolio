import { AiFillGithub, AiFillYoutube } from 'react-icons/ai'

import Image from './Image'
import Link from './Link'
import Tag from '@/components/Tag'

const Card = ({ title, description, imgSrc, href, github, tech1, tech2, tech3, tech4, tech5 }) => (
  <div className="md p-4 duration-300 hover:scale-105 md:w-1/2" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-xl border-2 border-gray-200 border-opacity-60 hover:cursor-pointer hover:border-4 hover:border-teal-500 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-teal-500 dark:hover:bg-gray-800`}
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
          <Link href={href}>
            <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight duration-200 hover:scale-105 hover:cursor-pointer hover:text-teal-500">
              {title}
            </h2>
          </Link>

          <div className="flex justify-end text-3xl duration-300 hover:scale-110 hover:text-teal-500">
            <Link href={github}>
              <AiFillGithub />
            </Link>
          </div>
        </div>
        <Link href={href}>
          <p className="prose max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        </Link>
        <div className="flex flex-row justify-between">
          <div className="mt-4 text-sm text-gray-400">
            <Tag key={tech1} text={tech1} />
            <Tag key={tech2} text={tech2} />
            <Tag key={tech3} text={tech3} />
            <Tag key={tech4} text={tech4} />
            {/* {tech1} &#8226; {tech2} &#8226; {tech3} &#8226; {tech4} */}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Card
