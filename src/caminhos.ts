/**
 * URLs do site.
 *
 * Caminho relativo aqui é armadilha: a página em português mora em
 * `/portfolio-dev/` e a em inglês em `/portfolio-dev/en/`. Um href de
 * `Pedro_Augusto_Resume.pdf` escrito à mão resolveria para
 * `/portfolio-dev/en/Pedro_Augusto_Resume.pdf` — 404 — e o CTA primário do site
 * de contratação morreria só na versão em inglês, que é onde ninguém testa.
 *
 * `import.meta.env.BASE_URL` é `/` no `npm run dev` e `/portfolio-dev/` no
 * build publicado, então as duas situações saem certas do mesmo código.
 */

import type { Idioma } from './conteudo/projetos'

const BASE = import.meta.env.BASE_URL

/** Arquivo servido de `public/`, sempre a partir da raiz do site. */
export function publico(arquivo: string): string {
  return `${BASE}${arquivo}`
}

/** A home de um idioma. */
export function home(idioma: Idioma): string {
  return idioma === 'pt' ? BASE : `${BASE}en/`
}

/** Âncora dentro da página do idioma corrente. */
export function ancora(idioma: Idioma, id: string): string {
  return `${home(idioma)}#${id}`
}
