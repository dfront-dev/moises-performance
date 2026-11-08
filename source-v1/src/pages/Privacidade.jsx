import LegalPage from '../components/LegalPage'
import { privacy } from '../data/legal'

export default function Privacidade() {
  return <LegalPage page="privacidade" label="Política de privacidade" lines={['Política de', 'privacidade.']} data={privacy} />
}
