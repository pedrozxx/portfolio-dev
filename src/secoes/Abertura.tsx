import type { Idioma } from '../conteudo/projetos'
import { textos } from '../i18n'
import { publico } from '../caminhos'
import { BotaoLink } from '../componentes/Botao'
import { Marcadores } from '../componentes/Marcadores'

/**
 * Abertura (DESIGN.md §10, item 01). Zero movimento aqui.
 *
 * A ordem vertical é fixa e existe para resolver a triagem de quinze segundos:
 * nível pretendido e lugar antes de tudo, porque triagem é eliminatória por
 * logística antes de ser por talento; depois a tese; depois as três leituras com
 * a origem de cada número.
 */

const RETRATO = import.meta.glob<string>('../assets/pedro*.{avif,webp}', {
  eager: true, query: '?url', import: 'default',
})

/** Cada leitura traz a fonte junto. Número sem procedência não é sóbrio: é inventado. */
const LEITURAS = [
  {
    valor: '1.563 → 93',
    rotulo: { pt: 'LINHAS, COMPONENTE PRINCIPAL', en: 'LINES, MAIN COMPONENT' },
    fonte: {
      pt: 'refatoração da landing de captação, Norte Geradores',
      en: 'lead-capture landing refactor, Norte Geradores',
    },
  },
  {
    valor: '39 + 39',
    rotulo: { pt: 'TESTES VITEST + PYTEST', en: 'VITEST + PYTEST TESTS' },
    fonte: {
      pt: 'radar-licitacoes-pa, CI no GitHub Actions',
      en: 'radar-licitacoes-pa, CI on GitHub Actions',
    },
  },
  {
    valor: 'JUN/2026 →',
    rotulo: { pt: 'ESTAGIÁRIO DE DEV, BENEVIDES (PA)', en: 'DEV INTERN, BENEVIDES (PA)' },
    fonte: { pt: 'currículo', en: 'résumé' },
  },
] as const

export function Abertura({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)

  return (
    <section className="abertura" id="topo" aria-labelledby="titulo-principal">
      <div className="container">
        <p className="sobrancelha">
          {idioma === 'pt'
            ? 'ESTÁGIO OU JÚNIOR · CASTANHAL · BELÉM · REMOTO (UTC−3)'
            : 'INTERN OR JUNIOR · CASTANHAL · BELÉM · REMOTE (UTC−3)'}
        </p>

        <h1 id="titulo-principal" className="abertura__titulo">
          {idioma === 'pt'
            ? 'Meu código roda em produção — e dá para conferir.'
            : 'My code runs in production — and you can check it.'}
        </h1>

        <div className="abertura__apresentacao">
          <picture>
            <source type="image/avif" srcSet={`${RETRATO['../assets/pedro.avif']}, ${RETRATO['../assets/pedro@2x.avif']} 2x`} />
            <img
              src={RETRATO['../assets/pedro.webp']}
              srcSet={`${RETRATO['../assets/pedro.webp']}, ${RETRATO['../assets/pedro@2x.webp']} 2x`}
              alt={
                idioma === 'pt'
                  ? 'Pedro Augusto Darolt, de camisa clara, ao ar livre.'
                  : 'Pedro Augusto Darolt, wearing a light shirt, outdoors.'
              }
              width={96}
              height={96}
              className="abertura__retrato"
              /* Está na primeira tela: carrega cedo, mas é pequena o bastante
                 para não disputar banda com o LCP. */
              loading="eager"
              decoding="sync"
            />
          </picture>

          <p className="abertura__apoio">
            {idioma === 'pt' ? (
              <>
                Sou <strong>Pedro Augusto Darolt</strong>, {t.cargo.toLowerCase()} e estagiário de
                desenvolvimento na Norte Geradores desde junho de 2026, em Benevides, Pará. Construo
                aplicações web de ponta a ponta: interface, API, banco e deploy. O que é público está
                aqui com link para abrir e ler; o que é interno está aqui com empresa, período e número.
              </>
            ) : (
              <>
                I am <strong>Pedro Augusto Darolt</strong>, a {t.cargo.toLowerCase()} and development
                intern at Norte Geradores since June 2026, in Benevides, Pará, Brazil. I build web
                applications end to end: interface, API, database and deployment. What is public is here
                with a link to open and read; what is internal is here with employer, period and number.
              </>
            )}
          </p>
        </div>

        <Marcadores
          className="abertura__stack"
          itens={['React', 'TypeScript', 'Node.js', 'Python/FastAPI', 'Linux']}
        />

        {/* A régua de leituras. É este bloco que faz a assinatura sobreviver ao
            celular: no colapso da margem, a procedência continua na tela. */}
        <dl className="regua">
          {LEITURAS.map((l) => (
            <div className="regua__item" key={l.valor}>
              <dt className="regua__rotulo mono">{l.rotulo[idioma]}</dt>
              <dd className="regua__valor mono">{l.valor}</dd>
              <dd className="regua__fonte mono">
                {t.fonteDoDado}: {l.fonte[idioma]}
              </dd>
            </div>
          ))}
        </dl>

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
            {idioma === 'pt' ? 'Ver o Radar de Licitações ↗' : 'See the Radar de Licitações ↗'}
          </BotaoLink>
        </div>
      </div>
    </section>
  )
}
