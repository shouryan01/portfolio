import dynamic from 'next/dynamic'

const ProgressBarComponent = dynamic(
  () => {
    return import('./LoadingBar')
  },
  { ssr: false }
)

const LoadProgressBar = () => {
  return <ProgressBarComponent />
}

export default LoadProgressBar
