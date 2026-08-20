import { useRef, type CSSProperties } from 'react'
import type { Idioma } from '../conteudo/projetos'
import { PROJETOS } from '../conteudo/projetos'
import { PROJETOS_MENORES } from '../conteudo/projetos-menores'
import { textos } from '../i18n'
import { Imagem } from '../componentes/Imagem'
import { Marcadores } from '../componentes/Marcadores'
import { LinkExterno } from '../componentes/LinkExterno'
import { useTrilhoHorizontal } from '../hooks/useTrilhoHorizontal'

/**
 * O trilho horizontal fixado: a seção prende na tela, o bloco de texto fica
 * parado à esquerda e os cartões deslizam na horizontal conforme a rolagem
 * vertical, sangrando pela borda direita.
 *
 * É o efeito mais marcante da direção e o que mais gente quebra. As quatro
 * garantias estão no hook (`useTrilhoHorizontal`); aqui ficam as de marcação:
 *
 * - A lista é uma `<ul>` de verdade, rolável, com os cartões na ordem do DOM. O
 *   leitor de tela lê "lista de 7 itens" e navega normalmente.
 * - O contador `03 / 07`, a barra e o nome corrente são `aria-hidden`: quem não
 *   vê o deslocamento não ganha nada com a posição dele, e a lista já anuncia o
 *   total.
 */

const SEM_CAPTURA = 'flappy-bird-pi'

const ARQUIVO_DA_CAPTURA: Record<string, string> = {
  'radar-licitacoes-pa': 'radar-licitacoes-pa',
  'conversor-de-valor': 'conversor-de-valor',
  'mundo-pet': 'mundo-pet',
  'portal-de-noticias': 'portal-noticias',
  sorteador: 'sorteador',
  'clube-de-assinatura': 'clube-assinatura',
}

/** Quantas telas de rolagem o trilho consome. Mais que isto vira pedágio. */
const TELAS_DE_PERCURSO = 4

interface Cartao {
  readonly id: string
  readonly nome: Bilingue
  readonly resumo: Bilingue
  readonly stack: readonly string[]
  readonly repo: string
  readonly demo: string | null
  readonly selo: Bilingue
  readonly alt: Bilingue | null
}

type Bilingue = Readonly<Record<Idioma, string>>

/**
 * O carro-chefe entra como cartão 01, não como capítulo próprio.
 *
 * As quatro decisões de engenharia dele (o rate limit que responde 200 com HTML,
 * o orçamento de tempo, "ausência não é zero") não cabem num cartão e por isso
 * saíram da página — continuam inteiras no README, a um clique do cartão. É a
 * troca que esta direção cobra: o formato é o do trilho, e o trilho não comporta
 * quatro parágrafos por item.
 */
function montarCartoes(idioma: Idioma): readonly Cartao[] {
  const radar = PROJETOS.find((p) => p.destaque)
  const lista: Cartao[] = []

  if (radar) {
    lista.push({
      id: radar.id,
      nome: { pt: radar.nome, en: radar.nome },
      resumo: radar.resumo,
      stack: radar.stack,
      repo: radar.repo,
      demo: radar.demo,
      selo: { pt: 'dados abertos', en: 'open data' },
      alt: radar.alt,
    })
  }

  for (const p of PROJETOS_MENORES) {
    lista.push({
      id: p.id,
      nome: p.nome,
      resumo: p.resumo,
      stack: p.stack,
      repo: p.repo,
      demo: p.demo,
      selo: p.demo
        ? { pt: 'no ar', en: 'live' }
        : { pt: 'sem demo pública', en: 'no public demo' },
      alt: null,
    })
  }

  void idioma
  return lista
}

export function Trilho({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  const cartoes = montarCartoes(idioma)
  const total = cartoes.length
  const { secao, indice, ativo, desliza, aoFocar } = useTrilhoHorizontal(total)
  const lista = useRef<HTMLUListElement | null>(null)

  const atual = cartoes[indice]

  // `--trilho` e `--trilho-avanco` são escritos pelo hook, direto no elemento.
  // Aqui só fica a altura, que muda uma vez e não a cada quadro.
  const estilo: CSSProperties = ativo
    ? ({ blockSize: `${TELAS_DE_PERCURSO * 100}svh` } as CSSProperties)
    : {}

  return (
    <section
      id="projetos"
      ref={secao}
      className="trilho capitulo"
      style={estilo}
      aria-labelledby="titulo-projetos"
    >
      <span className="capitulo__fantasma" aria-hidden="true">
        04
      </span>

      <div className="trilho__palco">
        <div className="trilho__texto">
          <p className="sobrancelha">
            <span className="capitulo__numero">04</span>
            <span>{idioma === 'pt' ? 'PROJETOS PUBLICADOS' : 'PUBLISHED PROJECTS'}</span>
          </p>

          <h2 id="titulo-projetos" className="trilho__titulo">
            {idioma === 'pt' ? (
              <>
                Feito.
                <br />
                Publicado.
                <br />
                No ar.
              </>
            ) : (
              <>
                Built.
                <br />
                Shipped.
                <br />
                Live.
              </>
            )}
          </h2>

          <p className="trilho__resumo">
            {idioma === 'pt'
              ? `${total} projetos no repositório. Todos com link verificado em 20/08/2026 — e um deles serve dados públicos do Pará todo dia.`
              : `${total} projects in the repository. Every link checked on 2026-08-20 — and one of them serves public data from Pará every day.`}
          </p>

          <p className="trilho__dica mono" aria-hidden="true">
            {idioma === 'pt'
              ? 'CONTINUE ROLANDO — OS PROJETOS PASSAM'
              : 'KEEP SCROLLING — THE PROJECTS SLIDE PAST'}{' '}
            <span className="trilho__seta">↓</span>
          </p>

          <p className="trilho__todos">
            <LinkExterno href="https://github.com/pedrozxx?tab=repositories" descreve="GitHub">
              {idioma === 'pt' ? 'Todos no GitHub' : 'All on GitHub'}
            </LinkExterno>
          </p>
        </div>

        <div className="trilho__pista">
          <ul
            className="trilho__lista"
            ref={lista}
            data-desliza={desliza ? 'sim' : 'nao'}
            onFocusCapture={aoFocar}
          >
            {cartoes.map((p, i) => (
              <li className="cartao" key={p.id}>
                <div className="cartao__captura">
                  {p.id === SEM_CAPTURA ? (
                    <div className="cartao__placa" aria-hidden="true">
                      <span className="cartao__placa-indice">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{p.stack.join(' · ')}</span>
                    </div>
                  ) : (
                    <Imagem
                      nome={ARQUIVO_DA_CAPTURA[p.id] ?? p.id}
                      alt={
                        p.alt
                          ? p.alt[idioma]
                          : idioma === 'pt'
                            ? `Tela do projeto ${p.nome.pt}.`
                            : `Screenshot of the ${p.nome.en} project.`
                      }
                      width={1483}
                      height={812}
                    />
                  )}
                </div>

                <div className="cartao__corpo">
                  <div className="cartao__cabeca">
                    <span className="cartao__indice" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="cartao__selo">{p.selo[idioma]}</span>
                  </div>

                  <h3 className="cartao__nome">{p.nome[idioma]}</h3>
                  <p className="cartao__resumo">{p.resumo[idioma]}</p>
                  <Marcadores itens={p.stack} />

                  <p className="cartao__destinos">
                    {p.demo && (
                      <LinkExterno href={p.demo} descreve={p.nome[idioma]}>
                        {t.abrirDemo}
                      </LinkExterno>
                    )}
                    <LinkExterno href={p.repo} descreve={p.nome[idioma]}>
                      {t.verCodigo}
                    </LinkExterno>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="trilho__rodape" aria-hidden="true">
            <span>
              {String(indice + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className="trilho__barra" />
            <span className="trilho__atual">{atual ? atual.nome[idioma] : ''}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
