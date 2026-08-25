import type { Idioma } from '../conteudo/projetos'
import { textos } from '../i18n'
import { publico } from '../caminhos'
import { BotaoLink } from '../componentes/Botao'
import { Marcadores } from '../componentes/Marcadores'
import { useSequenciaDoHero } from '../hooks/useSequenciaDoHero'

/**
 * Abertura (a tela cheia) + a linha de passagem que entra por cima enquanto ela
 * sai. É a sequência que define a direção: o site não começa numa página,
 * começa numa passagem.
 *
 * O movimento é escrito em custom properties e aplicado por `opacity` e
 * `transform` — nunca `top`, `height` ou `width`. Com `prefers-reduced-motion` o
 * hook devolve 0 e nada se move; o estado parado é o estado legível.
 */

export function Abertura({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  // O hook escreve as variáveis em CADA elemento, nunca na raiz: escrita no
  // :root invalida o estilo da árvore inteira a cada quadro.
  const { hero, passagem, dica } = useSequenciaDoHero()

  return (
    <>
      <section className="abertura" id="topo" aria-labelledby="titulo-principal">
        <div className="container abertura__conteudo" ref={hero}>
          <p className="sobrancelha">
            {idioma === 'pt'
              ? 'ESTÁGIO OU JÚNIOR · CASTANHAL · BELÉM · REMOTO (UTC−3)'
              : 'INTERN OR JUNIOR · CASTANHAL · BELÉM · REMOTE (UTC−3)'}
          </p>

          <h1 id="titulo-principal" className="abertura__titulo">
            {idioma === 'pt' ? 'Meu código roda em produção.' : 'My code runs in production.'}
          </h1>

          <div className="abertura__apresentacao">
            <p className="abertura__apoio">
              {idioma === 'pt' ? (
                <>
                  Painéis de BI que a diretoria consulta, uma landing page que capta leads e
                  automações que coletam dados públicos todo dia. Sou{' '}
                  <strong>Pedro Augusto Darolt</strong>, estagiário de desenvolvimento na Norte
                  Geradores desde junho de 2026, em Benevides, Pará.
                </>
              ) : (
                <>
                  BI dashboards leadership checks, a landing page that captures leads, and
                  automations that pull public data every day. I am{' '}
                  <strong>Pedro Augusto Darolt</strong>, a development intern at Norte Geradores
                  since June 2026, in Benevides, Pará, Brazil.
                </>
              )}
            </p>
          </div>

          <Marcadores
            className="abertura__stack"
            itens={['React', 'TypeScript', 'Node.js', 'Python/FastAPI', 'Linux']}
          />

          <div className="abertura__acoes">
            <BotaoLink tipo="primario" href={publico(t.arquivoCurriculo)} download>
              {t.ctaCurriculo}
            </BotaoLink>
            <BotaoLink
              tipo="secundario"
              href="https://pedrozxx.github.io/radar-licitacoes-pa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {idioma === 'pt' ? 'Ver o Radar ↗' : 'See the Radar ↗'}
            </BotaoLink>
          </div>
        </div>

        <p className="abertura__dica" ref={dica} aria-hidden="true">
          <span>{idioma === 'pt' ? 'role para entrar' : 'scroll to enter'}</span>
          <span>↓</span>
        </p>
      </section>

      <section className="passagem" aria-hidden="true">
        <p className="passagem__texto display" ref={passagem}>
          {idioma === 'pt'
            ? 'Em produção: BI, ferramentas internas, dados abertos.'
            : 'In production: BI, internal tools, open data.'}
        </p>
      </section>
    </>
  )
}
