import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Philosophy from '../components/Philosophy'
import Expertise from '../components/Expertise'
import System from '../components/System'
import Audiences from '../components/Audiences'
import Endurance from '../components/Endurance'
import Coach from '../components/Coach'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <Layout page="home">
      <Hero />
      <Philosophy />
      <Expertise />
      <System />
      <Audiences />
      <Endurance />
      <Coach lean />
      <Testimonials />
      <Contact />
    </Layout>
  )
}
