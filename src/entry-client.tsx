import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import type { Idioma } from './conteudo/projetos'
import './estilos.css'

// O idioma vem do <html lang> da página servida, não de estado no cliente: cada
// idioma é um arquivo HTML próprio, então não há como divergir do que o
// pré-render escreveu — e não há piscada de conteúdo trocando na hidratação.
const idioma: Idioma = document.documentElement.lang.startsWith('en') ? 'en' : 'pt'

const raiz = document.getElementById('root')

if (raiz) {
  // No build de produção o #root já vem preenchido por scripts/prerender.mjs, e
  // o certo é hidratar. Em `npm run dev` não há pré-render: o #root está vazio,
  // e chamar hydrateRoot ali dispara "Hydration failed because the server
  // rendered HTML didn't match the client" a cada carregamento. Não é um erro
  // inofensivo de desenvolvimento — é ruído que esconde os erros de verdade, e
  // console sujo é o que um revisor técnico abre primeiro.
  if (raiz.firstChild) hydrateRoot(raiz, <App idioma={idioma} />)
  else createRoot(raiz).render(<App idioma={idioma} />)
}
