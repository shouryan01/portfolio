'use client'

import AuthorLayout from '@/layouts/AuthorLayout'
import { allAuthors, Authors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'
import { useZenMode } from './zen-context'

// Custom hook to detect screen size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typical mobile breakpoint
    }

    // Check on mount
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

export default function Home() {
  const isMobile = useIsMobile()
  const { isZenMode, toggleZenMode, isPlaying } = useZenMode()
  const snowflakeCount = isMobile ? 25 : 200
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/static/images/fuji.png)',
          opacity: 0.5,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      />
      <Snowfall color="#fbcfe8" snowflakeCount={snowflakeCount} />

      {/* Zen Mode Button */}
      <button
        onClick={toggleZenMode}
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-slate-800 backdrop-blur-sm transition-all duration-200 hover:bg-white/30 dark:bg-gray-950/20 dark:text-gray-200 dark:hover:bg-gray-800/30"
      >
        <div className="flex items-center gap-2">
          {isZenMode ? (
            <>
              <span>Exit</span>
              {isPlaying && (
                <div className="flex items-center gap-1">
                  <div className="h-2 w-0.5 animate-pulse bg-current"></div>
                  <div
                    className="h-3 w-0.5 animate-pulse bg-current"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="h-2 w-0.5 animate-pulse bg-current"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              )}
            </>
          ) : (
            <span>Zen Mode</span>
          )}
        </div>
      </button>

      {/* Main Content - hidden when in zen mode */}
      {!isZenMode && (
        <AuthorLayout content={mainContent}>
          <MDXLayoutRenderer code={author.body.code} />
        </AuthorLayout>
      )}

      {/* <div className="ivide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
      </div> */}
    </>
  )
}
