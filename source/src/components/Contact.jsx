import { useRef, useState } from 'react'
import { EMAIL } from '../data/content'
import { services } from '../data/services'
import { useGsap, gsap } from '../lib/useGsap'

const line = 'w-full border-0 border-b-2 border-white/40 bg-transparent px-1 py-5 text-[clamp(1.05rem,1.5vw,1.45rem)] font-medium text-white placeholder:text-white/45 transition-colors duration-300 focus:border-signal focus:outline-none focus:ring-0'

function Check({ name, value, children, required = false }) {
  return (
    <label className="group flex cursor-pointer items-center gap-4 text-[clamp(1rem,1.3vw,1.3rem)] font-medium text-white/70 transition-colors hover:text-white has-[:checked]:text-white">
      <input type="checkbox" name={name} value={value} required={required} className="peer sr-only" />
      <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center border-2 border-white/45 transition-colors group-hover:border-white peer-checked:border-signal peer-checked:bg-signal peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-white md:h-9 md:w-9">
        <svg viewBox="0 0 16 16" className="h-4 w-4 scale-0 text-ink transition-transform duration-300 group-has-[:checked]:scale-100" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
      </span>
      <span>{children}</span>
    </label>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const [status, setStatus] = useState('')

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), { yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' })
    gsap.from(q('[data-fade]'), { opacity: 0, y: 24, duration: 1, stagger: 0.08, delay: 0.25, ease: 'power3.out' })
  })

  const onSubmit = (e) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const topics = d.getAll('assunto').join(', ') || 'Por definir'
    const subject = 'Agendar conversa'
    const body = `Nome: ${d.get('nome')}\nEmail: ${d.get('email')}\nTelemóvel: ${d.get('telemovel') || '-'}\nO pedido diz respeito a: ${topics}\n\n${d.get('mensagem')}`
    setStatus('A abrir o teu cliente de email com a mensagem preparada.')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contacto" ref={ref} className="relative isolate bg-ink pb-28 pt-40 text-white md:pb-40 md:pt-56">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <h1 aria-label="Agendar conversa" className="display text-center text-[clamp(2.8rem,8.5vw,8.5rem)] leading-[1]">
          <span className="line"><span className="line-inner" data-line>Agendar conversa</span></span>
        </h1>

        <p data-fade className="mx-auto mt-8 max-w-2xl text-center text-[clamp(1.05rem,1.5vw,1.45rem)] font-medium leading-snug text-white/70 md:mt-10">
          Fala um pouco sobre os teus objetivos ou desafios, para identificarmos em conjunto a forma de intervenção mais adequada às tuas necessidades.
        </p>

        <form onSubmit={onSubmit} aria-label="Agendar conversa" className="mt-14 md:mt-20">
          <div className="grid gap-x-12 md:grid-cols-2" data-fade>
            <label className="block"><span className="sr-only">Nome</span><input required name="nome" autoComplete="name" className={line} placeholder="Nome *" /></label>
            <label className="block"><span className="sr-only">Email</span><input required type="email" name="email" autoComplete="email" className={line} placeholder="Email *" /></label>
          </div>
          <label className="mt-6 block md:mt-10" data-fade><span className="sr-only">Número de telemóvel</span><input type="tel" name="telemovel" autoComplete="tel" className={line} placeholder="Número de telemóvel" /></label>

          <fieldset className="mt-14 md:mt-20" data-fade>
            <legend className="text-[clamp(1.05rem,1.4vw,1.4rem)] font-semibold">O pedido diz respeito a:</legend>
            <div className="mt-8 flex flex-wrap gap-x-14 gap-y-6">
              {services.map((s) => <Check key={s.id} name="assunto" value={s.short}>{s.short}</Check>)}
              <Check name="assunto" value="Ainda não sei / Preciso de orientação">Ainda não sei / Preciso de orientação</Check>
            </div>
          </fieldset>

          <label className="mt-14 block md:mt-20" data-fade><span className="sr-only">Mensagem</span><textarea required name="mensagem" rows="5" className={`${line} resize-none`} placeholder="Mensagem *" /></label>

          <div className="mt-14 md:mt-16" data-fade>
            <Check name="privacidade" value="sim" required>
              <span>Li e aceito a <a href="privacidade.html" className="underline-link font-semibold text-white">política de privacidade</a> *</span>
            </Check>
          </div>

          <button type="submit" data-fade className="mt-14 flex w-full items-center justify-center rounded-full border-2 border-white py-5 text-[clamp(1.1rem,1.6vw,1.6rem)] font-semibold tracking-[-0.01em] text-white transition-colors duration-500 hover:bg-white hover:text-ink md:mt-16">
            Enviar
          </button>
          <p role="status" className="mt-5 min-h-6 text-center text-[15px] text-white/60">{status}</p>
        </form>
      </div>
    </section>
  )
}
