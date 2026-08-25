import type { Capacidade as Dados } from '../conteudo/capacidades'
import type { Idioma } from '../conteudo/projetos'
import { Marcadores } from '../componentes/Marcadores'
import { Figura } from '../componentes/Figura'
import { FiguraAlcada, FiguraCamadas, FiguraCaptacao } from '../componentes/figuras'
import { useRevelar } from '../hooks/useRevelar'
import { useParalaxe } from '../hooks/useParalaxe'

/**
 * Um dos três capítulos numerados que abrem a página — o equivalente às três
 * seções de serviço do site de referência.
 *
 * Duas colunas acima de 1024px: a figura de um lado, o texto do outro, e o lado
 * alterna por capítulo (DESIGN.md §6.2). **A alternância está na ordem do DOM**,
 * não em `order` nem em áreas nomeadas de grid: a figura é decorativa
 * (`aria-hidden`, nada focável), então onde ela cai no DOM não muda a ordem de
 * leitura — e §9.7 continua valendo.
 *
 * Numeral fantasma contornado ao fundo, sobrancelha com fio, título em display e
 * um parágrafo. O numeral é `aria-hidden` e redundante por construção: o mesmo
 * número aparece em texto na sobrancelha.
 */

const FIGURAS = {
  camadas: FiguraCamadas,
  alcada: FiguraAlcada,
  captacao: FiguraCaptacao,
} as const

export function Capacidade({ dados, idioma }: { readonly dados: Dados; readonly idioma: Idioma }) {
  const { alvo, revelado } = useRevelar<HTMLElement>()
  const palco = useParalaxe(alvo)
  const Desenho = FIGURAS[dados.figura]

  const figura = (
    <Figura palco={palco}>
      <Desenho />
    </Figura>
  )

  return (
    <section
      id={dados.id}
      ref={alvo}
      className={`capitulo capacidade entra${revelado ? ' entra--pronto' : ''}`}
      aria-labelledby={`titulo-${dados.id}`}
    >
      <span className="capitulo__fantasma" aria-hidden="true">
        {dados.numero}
      </span>

      <div className="container capacidade__interno">
        {dados.lado === 'esquerda' ? figura : null}

        <div className="capacidade__bloco">
          <p className="sobrancelha">
            <span className="capitulo__numero">{dados.numero}</span>
            <span>{dados.sobrancelha[idioma]}</span>
          </p>

          <h2 id={`titulo-${dados.id}`} className="capitulo__titulo capacidade__titulo">
            {dados.titulo[idioma]}
          </h2>

          <p className="capitulo__texto capacidade__texto">{dados.texto[idioma]}</p>

          <Marcadores itens={dados.stack} className="capacidade__stack" />
        </div>

        {dados.lado === 'direita' ? figura : null}
      </div>
    </section>
  )
}
