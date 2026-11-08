// Thick diagonal arrow (north-east), used on every call to action.
export default function Arrow({ className = '' }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="square" strokeLinejoin="miter" className={`inline-block h-[0.92em] w-[0.92em] shrink-0 ${className}`}>
      <path d="M3 13L13 3M5 3h8v8" />
    </svg>
  )
}
