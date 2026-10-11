import { useRef, useState } from 'react'
import { contact as c, EMAIL, PHONE, PHONE_HREF } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function Contact({ standalone = false }) {
  const ref = useRef(null)
  const [status, setStatus] = useState('')

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 118, duration: 1.3, stagger: 0.12, ease: 'power4.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const subject = 'Percurso de performance'
    const body = `Nome: ${d.get('nome')}\nModalidade ou objetivo: ${d.get('objetivo')}\n\n${d.get('mensagem')}`
    setStatus('A abrir o teu cliente de email com a mensagem preparada.')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const field = 'w-full border-0 border-b border-ink/30 bg-transparent py-3 text-lg text-ink placeholder:text-ink/35 focus:border-[#007b6c] focus:outline-none focus:ring-0'

  return (
    <section id="contacto" ref={ref} className={`relative isolate overflow-hidden bg-paper text-ink ${standalone ? 'pb-28 pt-40 md:pb-44 md:pt-56' : 'py-28 md:py-44'}`}>
      <div aria-hidden className="absolute right-[5%] top-0 -z-0 hidden h-[30%] w-[7vw] -skew-x-[16deg] bg-signal md:block" />
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />

        <h2 aria-label={c.lines.join(' ')} className="display mt-14 text-[clamp(2.6rem,8vw,9.5rem)] md:mt-20">
          <Lines lines={c.lines} />
        </h2>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-5">
            <p data-fade className="max-w-sm text-xl leading-snug">{c.support}</p>
            <div data-fade className="mt-12 space-y-6">
              <div>
                <p className="micro text-[10px] text-ink/50">Email</p>
                <a href={`mailto:${EMAIL}`} className="underline-link break-all text-[clamp(1.3rem,2.2vw,2.1rem)] font-bold tracking-tight">{EMAIL}</a>
              </div>
              <div>
                <p className="micro text-[10px] text-ink/50">Telemóvel</p>
                <a href={PHONE_HREF} className="underline-link text-[clamp(1.3rem,2.2vw,2.1rem)] font-bold tracking-tight">{PHONE}</a>
              </div>
              <a href="CV-Joao-Moises.pdf" download className="micro underline-link inline-block pb-1">Descarregar curriculum ↓</a>
            </div>
          </div>

          <form data-fade onSubmit={onSubmit} className="md:col-span-6 md:col-start-7" aria-label="Contacto">
            <div className="space-y-8">
              <label className="block">
                <span className="micro text-[10px] text-ink/60">Nome</span>
                <input required name="nome" autoComplete="name" className={field} placeholder="O teu nome" />
              </label>
              <label className="block">
                <span className="micro text-[10px] text-ink/60">Modalidade ou objetivo</span>
                <input required name="objetivo" className={field} placeholder="Ex.: preparação de época em Vela" />
              </label>
              <label className="block">
                <span className="micro text-[10px] text-ink/60">Mensagem</span>
                <textarea name="mensagem" rows="4" className={`${field} resize-none`} placeholder="Conta-me o essencial" />
              </label>
            </div>
            <button type="submit" className="btn btn-solid micro mt-12 w-full justify-between md:w-auto">
              {c.cta} <span aria-hidden>→</span>
            </button>
            <p role="status" className="micro mt-4 min-h-4 text-[10px] text-ink/60">{status}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
