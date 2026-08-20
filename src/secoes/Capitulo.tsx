import type { ReactNode } from 'react'
import { useRevelar } from '../hooks/useRevelar'

/**
 * Casca de capítulo: sobrancelha numerada, título e conteúdo.
 *
 * O `<h2>` é sempre a palavra comum — *Experiência*, *Projetos públicos* — e o
 * vocabulário do aparato fica na sobrancelha (DESIGN.md §10). Se o recrutador
 * não achar "Experiência" num Ctrl+F, ou o ATS não indexar, a direção falhou por
 * mais coerente que esteja.
 *
 * Não há numeral fantasma gigante ao fundo: os três juízes vetaram, e nomear um
 * ornamento não o autoriza. O número vive na sobrancelha, onde é lido.
 */

interface Props {
  readonly id: string
  readonly numero: string
  readonly sobrancelha: string
  readonly titulo: string
  readonly children: ReactNode
  /** Experiência não anima: é o texto que se lê devagar, copia e imprime. */
  readonly semMovimento?: boolean
}

export function Capitulo({ id, numero, sobrancelha, titulo, children, semMovimento = false }: Props) {
  const { alvo, revelado } = useRevelar<HTMLElement>()

  return (
    <section
      id={id}
      ref={semMovimento ? undefined : alvo}
      className={`capitulo entra${!semMovimento && revelado ? ' entra--pronto' : ''}`}
      aria-labelledby={`titulo-${id}`}
    >
      <div className="container">
        <p className="sobrancelha">
          <span className="capitulo__numero">{numero}</span>
          <span>{sobrancelha}</span>
        </p>
        <h2 id={`titulo-${id}`} className="capitulo__titulo">
          {titulo}
        </h2>
        {children}
      </div>
    </section>
  )
}
