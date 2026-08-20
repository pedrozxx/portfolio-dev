import type { CSSProperties } from 'react'
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

const RETRATO = import.meta.glob<string>('../assets/pedro*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function Abertura({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  const avanco = useSequenciaDoHero()

  // O hero apaga na primeira meia tela; a passagem entra na segunda metade.
  const saida = Math.min(1, avanco / 0.7)
  const estiloHero: CSSProperties = {
    '--hero-opacidade': String(1 - saida),
    '--hero-escala': String(1 - saida * 0.06),
    '--hero-y': `${saida * -40}px`,
  } as CSSProperties

  const entrada = Math.min(1, Math.max(0, (avanco - 0.55) / 0.5))
  const estiloPassagem: CSSProperties = {
    '--passagem-opacidade': String(entrada),
    '--passagem-y': `${(1 - entrada) * 32}px`,
  } as CSSProperties

  return (
    <>
      <section className="abertura" id="topo" aria-labelledby="titulo-principal">
        <div className="container abertura__conteudo" style={estiloHero}>
          <p className="sobrancelha">
            {idioma === 'pt'
              ? 'ESTÁGIO OU JÚNIOR · CASTANHAL · BELÉM · REMOTO (UTC−3)'
              : 'INTERN OR JUNIOR · CASTANHAL · BELÉM · REMOTE (UTC−3)'}
          </p>

          <h1 id="titulo-principal" className="abertura__titulo">
            {idioma === 'pt' ? 'Meu código roda em produção.' : 'My code runs in production.'}
          </h1>

          <div className="abertura__apresentacao">
            <picture>
              <source
                type="image/avif"
                srcSet={`${RETRATO['../assets/pedro.avif']}, ${RETRATO['../assets/pedro@2x.avif']} 2x`}
              />
              <img
                src={RETRATO['../assets/pedro.webp']}
                srcSet={`${RETRATO['../assets/pedro.webp']}, ${RETRATO['../assets/pedro@2x.webp']} 2x`}
                alt={
                  idioma === 'pt'
                    ? 'Pedro Augusto Darolt, de camisa clara, ao ar livre.'
                    : 'Pedro Augusto Darolt, wearing a light shirt, outdoors.'
                }
                width={88}
                height={88}
                className="abertura__retrato"
                loading="eager"
                decoding="sync"
              />
            </picture>

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

        <p className="abertura__dica" style={estiloHero} aria-hidden="true">
          <span>{idioma === 'pt' ? 'role para entrar' : 'scroll to enter'}</span>
          <span>↓</span>
        </p>
      </section>

      <section className="passagem" aria-hidden="true">
        <p className="passagem__texto display" style={estiloPassagem}>
          {idioma === 'pt'
            ? 'Em produção: BI, ferramentas internas, dados abertos.'
            : 'In production: BI, internal tools, open data.'}
        </p>
      </section>
    </>
  )
}
