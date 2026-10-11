import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ResultsBlock from '../components/ResultsBlock'
import CtaBand from '../components/CtaBand'
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
      <div className="bg-ink px-5 py-10 md:px-10">
        <p className="micro mx-auto max-w-[1680px] text-[10px] leading-relaxed text-steel">{resultsFootnote}</p>
      </div>
      <CtaBand
        lines={['Resultados assim', 'na tua equipa?']}
        text="Vamos falar sobre os objetivos da próxima época."
        primary={{ label: 'Ver programas', href: 'programas.html' }}
        secondary={{ label: 'Contactar', href: 'contacto.html' }}
      />
    </Layout>
  )
}
