import LegalPage from '../components/LegalPage'
import { terms } from '../data/legal'

export default function Termos() {
  return <LegalPage page="termos" label="Termos e condições" lines={['Termos e', 'condições.']} data={terms} />
}
