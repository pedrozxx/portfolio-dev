import type { Capacidade as Dados } from '../conteudo/capacidades'
import type { Idioma } from '../conteudo/projetos'
import { Marcadores } from '../componentes/Marcadores'
import { useRevelar } from '../hooks/useRevelar'

/**
 * Um dos três capítulos numerados que abrem a página — o equivalente às três
 * seções de serviço do site de referência.
 *
 * Numeral fantasma contornado ao fundo, sobrancelha com fio, título em display e
 * um parágrafo. O numeral é `aria-hidden` e redundante por construção: o mesmo
 * número aparece em texto na sobrancelha.
 */
export function Capacidade({ dados, idioma }: { readonly dados: Dados; readonly idioma: Idioma }) {
  const { alvo, revelado } = useRevelar<HTMLElement>()

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
    </section>
  )
}
