import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ResultsBlock from '../components/ResultsBlock'
import CtaBand from '../components/CtaBand'
import Quote from '../components/Quote'
import { results, resultsFootnote } from '../data/results'

export default function Resultados() {
  return (
    <Layout page="resultados">
      <PageHeader
        label="Resultados"
        lines={['Resultados', 'desportivos.']}
        classes={['', 'text-signal']}
        intro="Três ciclos Olímpicos na Vela e um percurso de referência no Surf nacional e internacional, Padel e outras modalidades."
      />
      <ResultsBlock data={results[0]} tone="ink" />
      <ResultsBlock data={results[1]} tone="paper" />
      <section className="bg-paper px-5 py-24 text-ink md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1680px] gap-10 md:grid-cols-12">
          <h2 className="display text-[clamp(2.4rem,5vw,5.6rem)] leading-[0.95] md:col-span-5">O impacto <span className="text-[#007b6c]">no atleta.</span></h2>
          <div className="md:col-span-7"><Quote tone="paper" /></div>
        </div>
      </section>
      <div className="bg-ink px-5 py-10 md:px-10">
        <p className="micro mx-auto max-w-[1680px] text-[10px] leading-relaxed text-steel">{resultsFootnote}</p>
      </div>
      <CtaBand
        lines={['Resultados assim', 'na tua equipa?']}
        text="Vamos falar sobre os objetivos da próxima época."
        primary={{ label: 'Ver serviços', href: 'servicos.html' }}
        secondary={{ label: 'Contactar', href: 'contacto.html' }}
      />
    </Layout>
  )
}
