import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Idioma } from '../conteudo/projetos'
import { PROJETOS_MENORES } from '../conteudo/projetos-menores'
import { textos } from '../i18n'
import { Imagem } from '../componentes/Imagem'
import { Marcadores } from '../componentes/Marcadores'
import { LinkExterno } from '../componentes/LinkExterno'
import { useTrilhoHorizontal } from '../hooks/useTrilhoHorizontal'

/**
 * O trilho horizontal fixado: a seção prende na tela e os cartões deslizam na
 * horizontal conforme a rolagem vertical.
 *
 * É o efeito mais marcante da direção e o que mais gente quebra. As quatro
 * garantias estão no hook (`useTrilhoHorizontal`); aqui ficam as duas que são de
 * marcação:
 *
 * - A lista é uma `<ul>` de verdade, rolável, com os cartões na ordem do DOM. O
 *   leitor de tela lê "lista de 6 itens" e navega normalmente; o Tab leva ao
 *   próximo cartão e o navegador rola até ele sozinho.
 * - O contador "03 / 06" e a barra são `aria-hidden`: quem não vê o
 *   deslocamento não ganha nada com a posição dele, e a lista já anuncia o total.
 *
 * O carro-chefe NÃO está aqui de propósito. Enterrar num trilho a única prova
 * que o recrutador pode abrir seria trocar a peça mais forte da página por um
 * efeito.
 */

const SEM_CAPTURA = 'flappy-bird-pi'

const ARQUIVO_DA_CAPTURA: Record<string, string> = {
  'conversor-de-valor': 'conversor-de-valor',
  'mundo-pet': 'mundo-pet',
  'portal-de-noticias': 'portal-noticias',
  sorteador: 'sorteador',
  'clube-de-assinatura': 'clube-assinatura',
}

/** Quantas telas de rolagem o trilho consome. Mais que isto vira pedágio. */
const TELAS_DE_PERCURSO = 3

export function Trilho({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  const total = PROJETOS_MENORES.length
  const { secao, avanco, indice, ativo, desliza, aoFocar } = useTrilhoHorizontal(total)
  const lista = useRef<HTMLUListElement | null>(null)
  const [percurso, setPercurso] = useState(0)

  // Quanto a lista precisa andar na horizontal: a largura real dela menos a
  // parte já visível. Medido do DOM, não estimado — o tamanho do cartão é um
  // clamp() que depende da largura da tela.
  useEffect(() => {
    if (!desliza) {
      setPercurso(0)
      return
    }
    const medir = () => {
      const el = lista.current
      if (el) setPercurso(Math.max(0, el.scrollWidth - el.clientWidth))
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [desliza])

  const atual = PROJETOS_MENORES[indice]

  const estilo: CSSProperties = {
    '--trilho': String(avanco * percurso),
    '--trilho-avanco': String(avanco),
    // A altura acompanha `ativo`, nao `desliza`: quando o foco desliga o
    // deslizamento, o palco continua preso e a pagina nao salta.
    ...(ativo ? { blockSize: `${TELAS_DE_PERCURSO * 100}svh` } : {}),
  } as CSSProperties

  return (
    <section
      id="projetos"
      ref={secao}
      className="trilho capitulo"
      style={estilo}
      aria-labelledby="titulo-projetos"
    >
      <span className="capitulo__fantasma" aria-hidden="true">
        02
      </span>

      <div className="trilho__palco container">
        <div className="trilho__cabeca">
          <div>
            <p className="sobrancelha">
              <span className="capitulo__numero">02</span>
              <span>
                {idioma === 'pt'
                  ? 'PUBLICADOS · LINK VERIFICADO 20/08/2026'
                  : 'PUBLISHED · LINKS CHECKED 2026-08-20'}
              </span>
            </p>
            <h2 id="titulo-projetos" className="capitulo__titulo">
              {t.secaoProjetos}
            </h2>
          </div>
          <p className="trilho__atual mono">
            <LinkExterno href="https://github.com/pedrozxx?tab=repositories" descreve="GitHub">
              {idioma === 'pt' ? 'Todos no GitHub' : 'All on GitHub'}
            </LinkExterno>
          </p>
        </div>

        <ul
          className="trilho__lista"
          ref={lista}
          data-desliza={desliza ? 'sim' : 'nao'}
          onFocusCapture={aoFocar}
        >
          {PROJETOS_MENORES.map((p, i) => (
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
                      idioma === 'pt'
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
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  {p.demo ? (
                    <span className="cartao__selo">{idioma === 'pt' ? 'no ar' : 'live'}</span>
                  ) : (
                    /* Nunca um botão morto: a ausência é declarada em texto. */
                    <span className="cartao__selo">
                      {idioma === 'pt' ? 'sem demo pública' : 'no public demo'}
                    </span>
                  )}
                </div>

                <h3 className="cartao__nome">{p.nome[idioma]}</h3>
                <p className="cartao__resumo">{p.resumo[idioma]}</p>
                <Marcadores itens={p.stack} />

                <p className="radar__destinos">
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
    </section>
  )
}
