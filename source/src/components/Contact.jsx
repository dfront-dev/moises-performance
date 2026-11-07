import { useRef, useState } from 'react'
import { contact as c, EMAIL, PHONE, PHONE_HREF } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'
import DotField from './DotField'

export default function Contact({ standalone = false }) {
  const ref = useRef(null)
  const [status, setStatus] = useState('')

  useGsap(ref, ({ q }) => {
    if (q('[data-line]').length) {
      gsap.from(q('[data-line]'), {
        yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
      })
    }
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

  const field = 'w-full border-0 border-b-2 border-ink bg-transparent py-3 text-lg text-ink placeholder:text-ink/35 focus:border-ink focus:shadow-[0_2px_0_0_var(--color-signal)] focus:outline-none focus:ring-0'

  return (
    <section id="contacto" ref={ref} className={`relative isolate overflow-hidden bg-paper text-ink ${standalone ? 'pb-28 pt-40 md:pb-44 md:pt-56' : 'py-28 md:py-44'}`}>
      <DotField />
      <div className="relative mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />

        {standalone ? (
          <h2 className="sr-only">Contacto</h2>
        ) : (
          <h2 aria-label={c.lines.join(' ')} className="display mt-14 text-[clamp(2.03rem,4.8vw,5.7rem)] md:mt-20">
            <Lines lines={c.lines} />
          </h2>
        )}

        <div className={`grid gap-16 md:grid-cols-12 ${standalone ? 'mt-14 md:mt-20' : 'mt-16 md:mt-24'}`}>
          <div className="md:col-span-5">
            {!standalone && <p data-fade className="max-w-sm text-xl leading-snug">{c.support}</p>}
            <div data-fade className={`space-y-6 ${standalone ? '' : 'mt-12'}`}>
              <div>
                <p className="micro text-ink/50">Email</p>
                <a href={`mailto:${EMAIL}`} data-magnetic className="underline-link inline-block break-all text-[clamp(1.3rem,2.2vw,2.1rem)] font-bold tracking-tight">{EMAIL}</a>
              </div>
              <div>
                <p className="micro text-ink/50">Telemóvel</p>
                <a href={PHONE_HREF} data-magnetic className="underline-link inline-block text-[clamp(1.3rem,2.2vw,2.1rem)] font-bold tracking-tight">{PHONE}</a>
              </div>
              <div>
                <p className="micro text-ink/50">Curriculum</p>
                <a href="CV-Joao-Moises.pdf" download className="underline-link text-[clamp(1.3rem,2.2vw,2.1rem)] font-bold tracking-tight">Descarregar ↓</a>
              </div>
            </div>
          </div>

          <form data-fade onSubmit={onSubmit} className="md:col-span-6 md:col-start-7" aria-label="Contacto">
            <div className="space-y-8">
              <label className="block">
                <span className="micro text-ink/60">Nome</span>
                <input required name="nome" autoComplete="name" className={field} placeholder="O teu nome" />
              </label>
              <label className="block">
                <span className="micro text-ink/60">Modalidade ou objetivo</span>
                <input required name="objetivo" className={field} placeholder="Ex.: preparação de época em Vela" />
              </label>
              <label className="block">
                <span className="micro text-ink/60">Mensagem</span>
                <textarea name="mensagem" rows="4" className={`${field} resize-none`} placeholder="Conta-me o essencial" />
              </label>
            </div>
            <button type="submit" className="btn btn-solid micro mt-12 w-full justify-between md:w-auto">
              {c.cta} <span aria-hidden>→</span>
            </button>
            <p role="status" className="micro mt-4 min-h-4 text-ink/60">{status}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
