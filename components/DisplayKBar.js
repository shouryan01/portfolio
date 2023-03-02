import { KBarResults, useMatches, KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from 'kbar'
import Kbd from './Kbd'

export default function DisplayKBar() {
  const { results } = useMatches()

  return (
    <KBarPortal>
      <KBarPositioner className="z-[101] bg-white bg-opacity-0 backdrop-blur-md dark:bg-black dark:bg-opacity-50">
        <KBarAnimator className="mt-6 w-full max-w-[560px]">
          <div className="rounded-xl bg-white p-4 shadow-2xl shadow-gray-500 dark:bg-gray-800 dark:text-white">
            <div className="relative">
              <KBarSearch
                className="block w-full border-0 bg-transparent p-3 text-lg focus:outline-none"
                placeholder="Search for anything..."
              />
              <div className="mb-2 hidden border-0 border-t border-solid border-gray-200 px-4 py-2 dark:border-gray-800 md:flex">
                <div className="flex items-center space-x-1">
                  <span className="rounded bg-gray-100 py-0.5 px-1.5 text-xs text-gray-700">
                    <kbd className="font-medium">⌘ K</kbd>
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Toggle Menu, </span>
                </div>
                <div className="ml-2 flex items-center space-x-2">
                  <span className="rounded bg-gray-100 py-0.5 px-1.5 text-sm text-gray-700">
                    <kbd className="font-bold">&#8593; &#8595; </kbd>
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    Move Between Options
                  </span>
                </div>
                <div className="ml-2 flex items-center space-x-2">
                  <span className="rounded bg-gray-100 py-0.5 px-1.5 text-xs text-gray-700">
                    <kbd className="font-sans">&#9166;</kbd>
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Select Option</span>
                </div>
                <div className="ml-2 flex items-center space-x-2">
                  <span className="rounded bg-gray-100 py-0.5 px-1.5 text-xs text-gray-700">
                    <kbd className="font-sans">&#9003;</kbd>
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Back</span>
                </div>
              </div>
              <Kbd className="absolute right-3 top-2 -translate-y-0.5 transform p-1">ESC</Kbd>
            </div>

            <KBarResults
              items={results}
              onRender={({ item, active }) =>
                typeof item === 'string' ? (
                  <div>{item}</div>
                ) : (
                  <div
                    className={
                      'flex cursor-pointer items-center rounded-lg p-3 transition-all' +
                      (active
                        ? 'bg-gray-200 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                        : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300')
                    }
                  >
                    {item.name}
                    {active && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-auto opacity-30"
                      >
                        <polyline points="9 10 4 15 9 20" />
                        <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                      </svg>
                    )}
                  </div>
                )
              }
              className="scrollbar-hide mt-2 border-0 border-t border-solid border-gray-200 pt-4 dark:border-gray-800"
            />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}
