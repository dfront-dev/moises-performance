import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ServiceTable from '../components/ServiceTable'
import ServiceDetail from '../components/ServiceDetail'
import { services, details, intro } from '../data/services'

export default function Servicos() {
  return (
    <Layout page="servicos">
      <PageHeader
        label="Serviços"
        lines={['Consultoria de', 'fisiologia']}
        classes={['', 'text-ink/50']}
        intro={intro}
      />
      <ServiceTable />
      {services.map((s, i) => (
        <ServiceDetail key={s.id} s={s} d={details[s.id]} tone={i % 2 === 0 ? 'paper' : 'ink'} />
      ))}
    </Layout>
  )
}
