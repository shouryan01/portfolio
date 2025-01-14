import React from 'react'

const useScrollSpy = (elements, options) => {
  const [currentActiveSectionIndex, setCurrentActiveSectionIndex] = React.useState(-1)

  const rootMargin = `-${(options && options.offset) || 0}px 0px 0px 0px`

  // this is just a shortcut for some other usecase I may have
  const scrolledSections =
    currentActiveSectionIndex >= 0 ? elements.slice(0, currentActiveSectionIndex + 1) : []

  const observer = React.useRef()

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        // find the index of the section that is currently intersecting
        const indexOfSectionToHighlight = entries.findIndex((entry) => {
          return entry.intersectionRatio > 0
        })

        setCurrentActiveSectionIndex(indexOfSectionToHighlight)
      },
      {
        root: (options && options.root) || null,
        // use this option to handle custom offset
        rootMargin,
      }
    )

    const { current: currentObserver } = observer

    // observe all the elements passed as argument of the hook
    for (var i = 0; i < elements.length; i++) {
      if (elements[i]) {
        currentObserver.observe(elements[i])
      }
    }
    // elements.forEach((element) => (element ? currentObserver.observe(element) : null))

    return () => currentObserver.disconnect()
  }, [elements, options, rootMargin])

  return [currentActiveSectionIndex, scrolledSections]
}

export default useScrollSpy
