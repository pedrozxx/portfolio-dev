import type { ReactNode } from 'react'
import { useRevelar } from '../hooks/useRevelar'

/**
 * Casca de capítulo: numeral fantasma ao fundo, sobrancelha numerada, título e
 * conteúdo.
 *
 * O `<h2>` é sempre a palavra comum — *Experiência*, *Projetos*, *Sobre*. O
 * vocabulário de efeito fica na sobrancelha. Se o recrutador não achar
 * "Experiência" num Ctrl+F, ou o ATS não indexar, a direção falhou por mais
 * bonita que esteja.
 *
 * O numeral gigante ao fundo é `aria-hidden` e redundante por construção: o
 * mesmo número aparece em texto na sobrancelha, então escondê-lo do leitor de
 * tela não perde informação nenhuma.
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

export function Capitulo({
  id,
  numero,
  sobrancelha,
  titulo,
  children,
  semMovimento = false,
}: Props) {
  const { alvo, revelado } = useRevelar<HTMLElement>()

  return (
    <section
      id={id}
      ref={semMovimento ? undefined : alvo}
      className={`capitulo entra${!semMovimento && revelado ? ' entra--pronto' : ''}`}
      aria-labelledby={`titulo-${id}`}
    >
      <span className="capitulo__fantasma" aria-hidden="true">
        {numero}
      </span>

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
