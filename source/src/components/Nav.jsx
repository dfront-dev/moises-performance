import { useEffect, useState } from 'react'

export default function Nav({ page = 'home' }) {
  const home = page === 'home'
  const links = [
    { key: 'metodo', label: 'Método', href: home ? '#metodo' : 'index.html#metodo' },
    { key: 'programas', label: 'Programas', href: 'programas.html' },
    { key: 'resultados', label: 'Resultados', href: 'resultados.html' },
    { key: 'sobre', label: 'Sobre', href: 'sobre.html' },
    { key: 'contacto', label: 'Contacto', href: home ? '#contacto' : 'contacto.html' },
  ]
  const cta = home ? '#contacto' : 'contacto.html'

  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const light = page === 'contacto' && !solid && !open

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'} ${solid || open ? 'bg-ink/90 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <span aria-hidden className={`absolute inset-x-0 top-0 h-[3px] bg-signal transition-opacity duration-500 ${solid ? 'opacity-100' : 'opacity-0'}`} />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-signal focus:px-4 focus:py-2 focus:text-ink">
        Saltar para o conteúdo
      </a>
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a href={home ? '#top' : 'index.html'} aria-label="JMP, João Moisés Performance. Início" className="block">
          <img src={light ? 'images/jmp-logo-black.png' : 'images/jmp-logo-white.png'} alt="JMP" width="177" height="59" className="h-6 w-auto md:h-7" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              aria-current={page === l.key ? 'page' : undefined}
              className={`micro border-b-2 pb-1 transition-colors ${light ? 'hover:text-[#007b6c]' : 'hover:text-signal'} ${page === l.key ? (light ? 'border-[#007b6c] text-[#007b6c]' : 'border-signal text-signal') : light ? 'border-transparent text-ink/75' : 'border-transparent text-paper/75'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href={cta} className={`micro hidden px-5 py-3 transition-colors md:inline-flex ${light ? 'bg-ink text-signal hover:bg-signal hover:text-ink' : 'bg-signal text-ink hover:bg-paper'}`}>
          Trabalhar com o João
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

      <div
        id="menu-mobile"
        className={`fixed inset-0 top-[56px] bg-ink px-5 pb-10 pt-10 transition-opacity duration-300 md:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <ul className="flex flex-col">
          {links.map((l, i) => (
            <li key={l.key} className="border-b border-paper/10">
              <a href={l.href} onClick={() => setOpen(false)} className={`display flex items-baseline justify-between py-4 text-[2.3rem] ${page === l.key ? 'text-signal' : ''}`}>
                {l.label}
                <span className="micro text-steel">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href={cta} onClick={() => setOpen(false)} className="btn btn-solid micro mt-10 w-full justify-between">
          Trabalhar com o João <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  )
}
