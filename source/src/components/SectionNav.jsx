import { useEffect, useRef, useState } from 'react'

// Sticky bar with anchor links to the sections of a page.
// Sits below the fixed site header while it is visible and slides up to the top when the header hides.
export default function SectionNav({ items, tone = 'ink', label = 'Secções da página' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(items[0].id)
  const paper = tone === 'paper'

  // follow the site header (it hides when scrolling down, returns when scrolling up)
  useEffect(() => {
    const el = ref.current
    const html = document.documentElement
    const place = () => {
      const header = document.querySelector('header')
      const hidden = html.dataset.navHidden === '1'
      el.style.top = hidden ? '0px' : `${header ? header.offsetHeight : 0}px`
    }
    place()
    const mo = new MutationObserver(place)
    mo.observe(html, { attributes: true, attributeFilter: ['data-nav-hidden'] })
    window.addEventListener('resize', place)
    return () => { mo.disconnect(); window.removeEventListener('resize', place) }
  }, [])

  // highlight the section currently in view
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-35% 0px -60% 0px' }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [items])

  const go = (e, id) => {
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    e.stopPropagation() // keep Lenis' own anchor handler from overriding the offset
    // going up the site header comes back, so leave room for it too
    const goingUp = target.getBoundingClientRect().top < 0
    const header = document.querySelector('header')
    const offset = -((ref.current?.offsetHeight || 0) + (goingUp && header ? header.offsetHeight : 0))
    if (window.__lenis) window.__lenis.scrollTo(target, { offset, duration: 1.6 })
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
    setActive(id)
  }

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-40 border-y backdrop-blur-md transition-[top] duration-500 ${paper ? 'border-ink/10 bg-paper/95 text-ink' : 'border-paper/10 bg-ink/95 text-paper'}`}
    >
      <nav aria-label={label} className="mx-auto flex max-w-[1680px] gap-8 overflow-x-auto px-5 md:px-10">
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            onClick={(e) => go(e, i.id)}
            aria-current={active === i.id ? 'true' : undefined}
            className={`micro relative shrink-0 border-b-2 py-4 transition-colors ${
              active === i.id
                ? 'border-signal ' + (paper ? 'text-ink' : 'text-signal')
                : 'border-transparent ' + (paper ? 'text-ink/50 hover:text-ink' : 'text-paper/55 hover:text-paper')
            }`}
          >
            {i.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
