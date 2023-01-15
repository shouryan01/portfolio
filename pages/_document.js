import Document, { Html, Head, Main, NextScript } from 'next/document'
import ChatwootWidget from '@/components/ChatwootWidget'
import { WebChatContainer, setEnableDebug } from '@ibm-watson/assistant-web-chat-react'

const webChatOptions = {
  integrationID: '36111b20-9883-49c3-9e04-df0110afe0c3',
  region: 'us-east',
  serviceInstanceID: 'bf5215e7-2cf7-4fb7-8bda-09d547f261d0',
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js-na1.hs-scripts.com/22796123.js"
          ></script>
          <ChatwootWidget />
          <WebChatContainer config={webChatOptions} />;
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
