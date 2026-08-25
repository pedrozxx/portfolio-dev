import type { Idioma } from '../conteudo/projetos'
import { textos } from '../i18n'
import { home } from '../caminhos'

/**
 * Colofão (DESIGN.md §6, última linha).
 *
 * Colofão de livro impresso: a página declara as próprias medidas. Nenhum
 * template faz isso, porque nenhum template as escolheu — e é auditável com o
 * inspetor aberto em trinta segundos, que é justamente o ponto.
 *
 * Os números vêm de scripts/contraste.mjs, que recalcula cada par no CI. Se
 * alguém mexer num token e derrubar um par, o build para antes de esta linha
 * virar mentira.
 */

const MEDIDAS_CLARO = 'texto 16,02:1 · acento 6,03:1 · fio estrutural 3,81:1'
const MEDIDAS_ESCURO = 'texto 13,05:1 · acento 7,14:1 · fio estrutural 3,72:1'

export function Colofao({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)

  return (
    <footer className="colofao">
      <div className="container">
        <p className="colofao__nome">
          Pedro Augusto Darolt — Castanhal, PA, Brasil (UTC−3)
        </p>

        <dl className="colofao__medidas mono">
          <dt>{t.rodapeColofao}</dt>
          <dd>Sora 400/600/700 · JetBrains Mono 400/500 · corpo 17/1,65 · medida 58ch</dd>
          <dd>
            {idioma === 'pt' ? 'Contraste medido, tema claro' : 'Measured contrast, light theme'}:{' '}
            {MEDIDAS_CLARO}
          </dd>
          <dd>
            {idioma === 'pt' ? 'Tema escuro' : 'Dark theme'}: {MEDIDAS_ESCURO}
          </dd>
        </dl>

        <p className="colofao__creditos">
          {idioma === 'pt'
            ? 'A direção visual — paleta, tipografia e a gramática de movimento — foi construída a partir de matteodante.it, medida no navegador e adaptada. O conteúdo, a estrutura e o código são meus.'
            : 'The visual direction — palette, typography and motion grammar — was built from matteodante.it, measured in the browser and adapted. The content, structure and code are mine.'}
        </p>

        <p className="colofao__creditos mono">
          {idioma === 'pt' ? 'Feito em' : 'Built with'} React + Vite + TypeScript + Tailwind —{' '}
          <a href="https://github.com/pedrozxx/portfolio-dev" target="_blank" rel="noopener noreferrer">
            {idioma === 'pt' ? 'ver o código' : 'view the code'} ↗
          </a>
          {'. '}
          {idioma === 'pt' ? 'Este site segue o' : 'This site follows the'}{' '}
          <a
            href="https://github.com/pedrozxx/portfolio-dev/blob/main/DESIGN.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            DESIGN.md {idioma === 'pt' ? 'deste repositório' : 'in this repository'} ↗
          </a>
          .
        </p>

        <nav className="colofao__idioma mono" aria-label={idioma === 'pt' ? 'Idioma' : 'Language'}>
          {idioma === 'pt' ? (
            <span aria-current="true" className="alternador__ativo">PT</span>
          ) : (
            <a href={home('pt')}>PT</a>
          )}
          <span aria-hidden="true"> · </span>
          {idioma === 'en' ? (
            <span aria-current="true" className="alternador__ativo">EN</span>
          ) : (
            <a href={home('en')}>EN</a>
          )}
        </nav>
      </div>
    </footer>
  )
}
