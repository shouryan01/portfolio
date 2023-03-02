import Link from '@/components/Link'
import React, { Fragment } from 'react'

export default function FourZeroFour() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-text text-text glitch text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <Link href="/">
          <button className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors hover:scale-105 hover:bg-blue-500 focus:outline-none dark:hover:bg-blue-500">
            Back to homepage.
          </button>
        </Link>
      </div>
    </div>
  )
}
