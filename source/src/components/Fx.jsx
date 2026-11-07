import { useEffect, useState } from 'react'
import { initCurtain, initTransitions, initProgress } from '../lib/fx'
import { initCursor, initMagnetic } from '../lib/cursor'

// Left-hand ruler: one tick per section, the active one stretches. Hover reads the section name.
function Chapters() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const secs = [...document.querySelectorAll('main > section')].filter((s) => s.querySelector('h1, h2'))
    if (secs.length < 3) return undefined
    setItems(secs.map((el) => {
      const h = el.querySelector('h1, h2')
      return { el, label: (h.getAttribute('aria-label') || h.textContent || '').replace(/\.$/, '').trim() }
    }))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(secs.indexOf(e.target)) }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    secs.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  if (!items.length) return null
  const go = (el) => (window.__lenis ? window.__lenis.scrollTo(el, { duration: 1.6 }) : el.scrollIntoView({ behavior: 'smooth' }))
  return (
    <nav aria-label="Secções da página" className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-[14px] xl:flex">
      {items.map((it, i) => (
        <button key={i} type="button" onClick={() => go(it.el)} aria-label={it.label} aria-current={i === active ? 'true' : undefined} className="group flex items-center gap-3 py-1">
          <span aria-hidden className={`block h-px bg-ink transition-all duration-700 ${i === active ? 'w-5 opacity-100' : 'w-2 opacity-30 group-hover:w-4 group-hover:opacity-70'}`} />
          <span aria-hidden className="micro pointer-events-none whitespace-nowrap bg-paper/90 px-2 py-1 text-[9px] text-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">{it.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default function Fx() {
  useEffect(() => {
    const offs = [initCurtain(), initTransitions(), initProgress(), initCursor(), initMagnetic()]
    return () => offs.forEach((o) => o && o())
  }, [])
  return <Chapters />
}
