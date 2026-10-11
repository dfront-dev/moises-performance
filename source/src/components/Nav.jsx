import { useEffect, useState } from 'react'
import { nav } from '../data/content'

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'} ${solid || open ? 'bg-ink/85 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-signal focus:px-4 focus:py-2 focus:text-ink">
        Saltar para o conteúdo
      </a>
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a href="#top" aria-label="JMP, João Moisés Performance. Início" className="block">
          <img src="images/jmp-logo-white.png" alt="JMP" width="177" height="59" className="h-6 w-auto md:h-7" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-10 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="micro text-paper/70 transition-colors hover:text-signal">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contacto" className="micro hidden border border-paper/30 px-5 py-3 text-paper transition-colors hover:border-signal hover:bg-signal hover:text-ink md:inline-flex">
          Trabalhar com o João
        </a>

        <button
          type="button"
          className="micro text-paper md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>
      </div>

      <div
        id="menu-mobile"
        className={`fixed inset-0 top-[56px] bg-ink px-5 pb-10 pt-10 transition-opacity duration-300 md:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <ul className="flex flex-col">
          {nav.map((l, i) => (
            <li key={l.href} className="border-b border-paper/10">
              <a href={l.href} onClick={() => setOpen(false)} className="display flex items-baseline justify-between py-5 text-[2.6rem]">
                {l.label}
                <span className="micro text-steel">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-solid micro mt-10 w-full justify-between">
          Trabalhar com o João <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  )
}
