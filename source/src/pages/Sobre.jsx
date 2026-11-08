import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Coach from '../components/Coach'
import SportsSpiral from '../components/SportsSpiral'
import Testimonials from '../components/Testimonials'

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
      <SportsSpiral />
      <Testimonials />
    </Layout>
  )
}
