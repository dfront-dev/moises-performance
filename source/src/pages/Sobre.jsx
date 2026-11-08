import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Coach from '../components/Coach'
import ResultsBlock from '../components/ResultsBlock'
import Testimonials from '../components/Testimonials'
import { otherAreas } from '../data/services'

export default function Sobre() {
  return (
    <Layout page="sobre">
      <PageHeader
        label="Sobre"
        lines={['Da avaliação', 'à prática.']}
        classes={['', 'text-ink/50']}
        intro="Decisões construídas com base em dados e acompanhamento no terreno. Fisiologista do exercício, com mais de 15 anos em alta competição."
      />
      <Coach index="01 / Percurso" />
      <ResultsBlock data={otherAreas} tone="paper" />
      <Testimonials />
    </Layout>
  )
}
