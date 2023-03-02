import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@fontsource/inter/variable-full.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import LoadProgressBar from '@/components/LoadingBarIndex'
import ProgressBar from 'react-scroll-progress-bar'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET
import { useTheme } from 'next-themes'

export default function App({ Component, pageProps }) {
  const { theme, setTheme } = useTheme()

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <ProgressBar height="5px" bgcolor="#29beae" />
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LoadProgressBar />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
