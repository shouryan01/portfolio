export default function Kbd({ className, children }) {
  return (
    <kbd
      className={
        className +
        'inline-flex select-none items-center justify-center rounded bg-gray-200 px-1 py-1 text-sm font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400'
      }
    >
      {children}
    </kbd>
  )
}
