import { renderToString } from 'react-dom/server'
import { App } from './App'
import type { Idioma } from './conteudo/projetos'

/** Chamado por scripts/prerender.mjs, uma vez por idioma, no momento do build. */
export function renderizar(idioma: string): string {
  return renderToString(<App idioma={(idioma === 'en' ? 'en' : 'pt') satisfies Idioma} />)
}
