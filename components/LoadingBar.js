import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  minimum: 0.1,
  easing: 'ease',
  speed: 250,
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function ProgressBar() {
  return null
}
