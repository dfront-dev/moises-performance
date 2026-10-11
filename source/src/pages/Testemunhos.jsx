import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import CtaBand from '../components/CtaBand'
import { placeholders, EMAIL } from '../data/content'

export default function Testemunhos() {
  return (
    <Layout page="testemunhos">
      <PageHeader
        label="Testemunhos"
        lines={['Testemunhos.']}
        classes={['text-signal']}
        intro="Esta página vai reunir testemunhos reais e autorizados de atletas, treinadores e federações. Os espaços abaixo são exemplos de estrutura."
      />
      <section className="bg-paper py-24 text-ink md:py-36">
        <div className="mx-auto max-w-[1680px] px-5 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {placeholders.map(([name, role], i) => (
              <figure key={i} className="relative border border-ink/15 border-t-[4px] border-t-signal bg-white p-8">
                <span className="micro absolute -top-3 right-5 bg-steel px-3 py-1 text-[10px] text-ink">Exemplo</span>
                <span aria-hidden className="display block text-6xl leading-none text-[#007b6c]">"</span>
                <blockquote className="mt-4 min-h-24 text-[15px] italic leading-relaxed text-ink/70">
                  Espaço reservado para testemunho real, a substituir por citação autorizada do atleta ou federação.
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span aria-hidden className="grid h-11 w-11 place-items-center border border-dashed border-ink/30 text-[11px] text-ink/50">JM</span>
                  <span>
                    <span className="block text-sm font-bold">{name}</span>
                    <span className="micro text-[10px] text-ink/60">{role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        lines={['Trabalhaste', 'com o João?']}
        text="Se queres deixar o teu testemunho nesta página, envia-o por email."
        primary={{ label: 'Enviar testemunho', href: `mailto:${EMAIL}?subject=${encodeURIComponent('Testemunho para o site')}` }}
        secondary={{ label: 'Ver resultados', href: 'resultados.html' }}
      />
    </Layout>
  )
}
