import type { Idioma } from '../conteudo/projetos'
import { textos } from '../i18n'
import { home } from '../caminhos'

/**
 * Colofão (DESIGN.md §10, item 07).
 *
 * Colofão de livro impresso: a página declara as próprias medidas. Nenhum
 * template faz isso, porque nenhum template as escolheu — e é auditável com o
 * inspetor aberto em trinta segundos, que é justamente o ponto.
 *
 * Os números vêm de scripts/contraste.mjs, que recalcula cada par no CI. Se
 * alguém mexer num token e derrubar um par, o build para antes de esta linha
 * virar mentira.
 */

const MEDIDAS_CLARO = 'texto 17,03:1 · acento 5,87:1 · fio estrutural 3,99:1'
const MEDIDAS_ESCURO = 'texto 15,93:1 · acento 8,13:1 · fio estrutural 5,25:1'

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
          <dd>Sora 600/400 · JetBrains Mono 500/400 · corpo 17/1,62 · medida 62ch</dd>
          <dd>
            {idioma === 'pt' ? 'Contraste medido, tema claro' : 'Measured contrast, light theme'}:{' '}
            {MEDIDAS_CLARO}
          </dd>
          <dd>
            {idioma === 'pt' ? 'Tema escuro' : 'Dark theme'}: {MEDIDAS_ESCURO}
          </dd>
        </dl>

        <p className="colofao__legenda mono">
          {idioma === 'pt'
            ? 'Na margem, a procedência de cada afirmação. Em peso 500 quando há arquivo, teste ou medição por trás; em peso 400 quando é prova declarada.'
            : 'In the margin, the source of every claim. Weight 500 when a file, test or measurement backs it; weight 400 when the proof is declared.'}
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
