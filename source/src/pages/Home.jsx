import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Philosophy from '../components/Philosophy'
import Expertise from '../components/Expertise'
import Audiences from '../components/Audiences'
import Endurance from '../components/Endurance'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <Layout page="home">
      <Hero />
      <Philosophy />
      <Expertise />
      <Audiences />
      <Endurance />
      <Testimonials cta={false} />
    </Layout>
  )
}
