import { useEffect, useState } from 'react'

export default function Nav({ page = 'home', tone = 'paper' }) {
  const paper = tone === 'paper'
  const home = page === 'home'
  const links = [
    { key: 'metodo', label: 'Método', href: 'sobre.html#metodo' },
    { key: 'servicos', label: 'Serviços', href: 'servicos.html' },
    { key: 'resultados', label: 'Resultados', href: 'resultados.html' },
    { key: 'sobre', label: 'Sobre', href: 'sobre.html' },
  ]
  const cta = 'contacto.html'

  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const light = paper && !open

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${open ? 'bg-ink/90 backdrop-blur-md' : solid ? (paper ? 'bg-paper/90 backdrop-blur-md' : 'bg-ink/90 backdrop-blur-md') : 'bg-transparent'}`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-signal focus:px-4 focus:py-2 focus:text-ink">
        Saltar para o conteúdo
      </a>
      <div className={`mx-auto flex max-w-[1680px] items-center justify-between px-5 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-10 ${solid ? "md:py-3" : "md:py-5"} transition-[padding] duration-500`}>
        <a href={home ? '#top' : 'index.html'} aria-label="JMP, João Moisés Performance. Início" className="block md:justify-self-start">
          <img src={light ? 'images/jmp-logo.svg' : 'images/jmp-logo-light.svg'} alt="JMP" width="72" height="29" className="h-[52px] w-auto md:h-[60px]" />
        </a>

        <div className={`hidden flex-col items-center text-center md:flex ${light ? 'text-ink' : 'text-paper'}`}>
          <div className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${solid ? 'mb-0 grid-rows-[0fr] opacity-0' : 'mb-[2px] grid-rows-[1fr] opacity-100'}`} aria-hidden={solid}>
            <p className="overflow-hidden text-[clamp(15px,1.45vw,21px)] font-semibold leading-tight tracking-[-0.01em]">
              João Moisés <span aria-hidden className="mx-[0.55em] opacity-60">•</span> Sport Physiologist
            </p>
          </div>
          <nav aria-label="Principal" className="flex items-center text-[clamp(15px,1.45vw,21px)] font-semibold leading-tight tracking-[-0.01em]">
            {links.map((l, i) => (
              <span key={l.key} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-[0.55em] opacity-35">•</span>}
                <a
                  href={l.href}
                  aria-current={page === l.key ? 'page' : undefined}
                  className={`transition-opacity duration-300 ${page === l.key ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                >
                  {l.label}
                </a>
              </span>
            ))}
          </nav>
        </div>

        <a href={cta} className={`micro hidden px-5 py-3 transition-colors md:inline-flex md:justify-self-end ${light ? 'bg-ink text-paper hover:bg-signal hover:text-ink' : 'bg-signal text-ink hover:bg-paper'}`}>
          Agendar consulta
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
            <a href={l.href} onClick={() => setOpen(false)} className={`display flex items-baseline justify-between py-4 text-[2.3rem] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${page === l.key ? 'text-ink' : 'text-ink/60'}`} style={{ transform: open ? 'translateY(0)' : 'translateY(110%)', transitionDelay: open ? `${150 + i * 70}ms` : '0ms' }}>
              {l.label}
              <span className="micro text-steel">0{i + 1}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href={cta} onClick={() => setOpen(false)} className="btn btn-solid micro mt-10 w-full justify-between">
        Agendar consulta <span aria-hidden>→</span>
      </a>
    </div>
  </>
  )
}
