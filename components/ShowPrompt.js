import { parse } from 'next-useragent'
import useSound from 'use-sound'

export function getServerSideProps(context) {
  return {
    props: {
      uaString: context.req.headers['user-agent'],
    },
  }
}

export default function ShowPrompt(open, setOpen) {
  let ua = parse(ShowPrompt.uaString)
  const [ThemeSound] = useSound('/static/sounds/open_kbar.mp3')

  if (ua.isMobile) {
    return <button>Tap to start →</button>
  } else {
    return (
      <button className="duration-300 hover:scale-125" onClick={() => ThemeSound()}>
        <span className="text-lg">Press</span>{' '}
        {ua.isMac && <span className="rounded-md bg-gray-300 p-1 text-lg text-gray-900">⌘</span>}{' '}
        {ua.isWindows && (
          <span className="rounded-md bg-gray-300 p-1 text-lg text-gray-900">Ctrl</span>
        )}{' '}
        <span className="text-lg">+ </span>
        <span className="rounded-md bg-gray-300 p-1 text-lg text-gray-900">K</span>{' '}
        <span className="text-lg">to start →</span>
      </button>
    )
  }
}
