import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const pages = {
  home: lazy(() => import('./pages/Home')),
  programas: lazy(() => import('./pages/Programas')),
  resultados: lazy(() => import('./pages/Resultados')),
  sobre: lazy(() => import('./pages/Sobre')),
  contacto: lazy(() => import('./pages/Contacto')),
  testemunhos: lazy(() => import('./pages/Testemunhos')),
}

const root = document.getElementById('root')
const Page = pages[root.dataset.page] || pages.home

createRoot(root).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  </StrictMode>
)
