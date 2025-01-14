import AnimatedText from 'react-animated-text-content'
import Link from '@/components/Link'
import { RoughNotation } from 'react-rough-notation'
import ShowPrompt from './ShowPrompt'
import TextLoop from 'react-text-loop'
// import { useEffect, useState } from 'react'
// import CmdPalette from '@/components/CmdPalette'
import { useKBar } from 'kbar'

function Banner() {
  // const [open, setOpen] = useState(false)

  // function toggle() {
  //   setOpen((currentValue) => {
  //     return !currentValue
  //   })
  // }
  const { query } = useKBar()

  return (
    <div className="fade-in banner my-40 flex flex-1 flex-col justify-center px-6 dark:text-white lg:px-10">
      <h1 className="text-3xl font-bold dark:text-white lg:text-5xl">
        <AnimatedText type="words" interval={0.8} duration={1} animationType={'throw'}>
          Shouryan Nikam
        </AnimatedText>
      </h1>
      <p className="my-2 text-lg lg:my-4 lg:text-2xl ">
        <TextLoop delay={1000} interval={2000}>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            Software Engineer @ Tektronix
          </RoughNotation>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            CS + DS from UMich
          </RoughNotation>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            ❤️ Python and JavaScript
          </RoughNotation>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            Learning Web3
          </RoughNotation>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            Graduated Spring 2023
          </RoughNotation>
        </TextLoop>{' '}
      </p>
      <p className="font-light lg:text-xl">
        Read more
        <Link className="ml-2 mr-2 font-normal" href="/about">
          <RoughNotation
            show
            type="box"
            animationDelay={2000}
            animationDuration={1000}
            color={'red'}
          >
            about me
          </RoughNotation>
        </Link>
        or
        <Link className="ml -2 font-normal" href="https://www.calendly.com/shouryannikam/meet">
          <RoughNotation
            show
            type="circle"
            animationDelay={2000}
            animationDuration={1200}
            color={'violet'}
          >
            talk to me.
          </RoughNotation>
        </Link>
        <br />
        <br />
        <br />
        <button onClick={query.toggle}>
          <ShowPrompt></ShowPrompt>
        </button>
      </p>
      {/* <CmdPalette open={open} setOpen={setOpen} /> */}
    </div>
  )
}

export default Banner
