import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

export default function Nav({ page = 'home', tone = 'paper' }) {
  const paper = tone === 'paper'
  const home = page === 'home'
  const links = [
    { key: 'metodo', label: 'Método', href: home ? '#metodo' : 'index.html#metodo' },
    { key: 'servicos', label: 'Serviços', href: 'servicos.html' },
    { key: 'resultados', label: 'Resultados', href: 'resultados.html' },
    { key: 'sobre', label: 'Sobre', href: 'sobre.html' },
  ]
  const cta = home ? '#contacto' : 'contacto.html'

  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const ind = useRef(null)
  const light = (paper && !open) || (page === 'contacto' && !solid && !open)

  // a single underline glides between links and rests under the current page
  useEffect(() => {
    const nav = navRef.current
    const bar = ind.current
    if (!nav || !bar) return undefined
    const cur = () => nav.querySelector('[aria-current="page"]')
    const to = (el, instant) => {
      if (!el) { gsap.to(bar, { opacity: 0, duration: 0.3 }); return }
      gsap.to(bar, { x: el.offsetLeft, width: el.offsetWidth, opacity: 1, duration: instant ? 0 : 0.55, ease: 'power3.out' })
    }
    to(cur(), true)
    const over = (e) => { const a = e.target.closest('a'); if (a) to(a) }
    const out = () => to(cur())
    nav.addEventListener('pointerover', over)
    nav.addEventListener('pointerleave', out)
    window.addEventListener('resize', out)
    return () => { nav.removeEventListener('pointerover', over); nav.removeEventListener('pointerleave', out); window.removeEventListener('resize', out) }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.navHidden = hidden && !open ? '1' : '0'
  }, [hidden, open])

  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setSolid(y > 40)
        setHidden(y > 240 && y > last + 4)
        if (y < last - 4) setHidden(false)
        last = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'} ${open ? 'bg-ink/90 backdrop-blur-md' : solid ? (paper ? 'bg-paper/90 backdrop-blur-md' : 'bg-ink/90 backdrop-blur-md') : 'bg-transparent'}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-signal focus:px-4 focus:py-2 focus:text-ink">
        Saltar para o conteúdo
      </a>
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-5 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-10 md:py-5">
        <a href={home ? '#top' : 'index.html'} aria-label="JMP, João Moisés Performance. Início" className="block md:justify-self-start">
          <img src={light ? 'images/jmp-logo.svg' : 'images/jmp-logo-light.svg'} alt="JMP" width="72" height="29" className="h-6 w-auto md:h-7" />
        </a>

        <nav ref={navRef} aria-label="Principal" className="relative hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              aria-current={page === l.key ? 'page' : undefined}
              className={`micro py-2 transition-colors duration-300 ${page === l.key ? 'text-ink' : 'text-ink/70 hover:text-ink'}`}
            >
              <span className="roll"><span>{l.label}</span><span aria-hidden>{l.label}</span></span>
            </a>
          ))}
          <span ref={ind} aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-signal opacity-0" />
        </nav>

        <a href={cta} className={`micro hidden px-5 py-3 transition-colors md:inline-flex md:justify-self-end ${light ? 'bg-ink text-paper hover:bg-signal hover:text-ink' : 'bg-signal text-ink hover:bg-paper'}`}>
          Contactos
        </a>

        <button
          type="button"
          className={`micro md:hidden ${light ? 'text-ink' : 'text-paper'}`}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>
      </div>

    </header>
    <div
      id="menu-mobile"
      data-lenis-prevent
      className={`fixed inset-0 z-40 overflow-y-auto bg-paper px-5 pb-10 pt-[88px] text-ink transition-opacity duration-300 md:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      <ul className="flex flex-col">
        {links.map((l, i) => (
          <li key={l.key} className="overflow-hidden border-b border-ink/10">
            <a href={l.href} onClick={() => setOpen(false)} className={`display flex items-baseline justify-between py-4 text-[2.3rem] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${page === l.key ? 'text-ink' : 'text-ink/70'}`} style={{ transform: open ? 'translateY(0)' : 'translateY(110%)', transitionDelay: open ? `${150 + i * 70}ms` : '0ms' }}>
              {l.label}
              <span className="micro text-steel">0{i + 1}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href={cta} onClick={() => setOpen(false)} className="btn btn-solid micro mt-10 w-full justify-between">
        Contactos <span aria-hidden>→</span>
      </a>
    </div>
  </>
  )
}
