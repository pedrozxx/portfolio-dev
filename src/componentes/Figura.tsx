import type { CSSProperties, ReactNode, RefObject } from 'react'

/**
 * A moldura das figuras dos capítulos (DESIGN.md §6.2) e a camada que elas
 * empilham.
 *
 * A figura inteira é decorativa: `aria-hidden` no embrulho esconde a subárvore
 * do leitor de tela, e não há nada focável dentro — o que é o que permite que a
 * ordem dela no DOM alterne de lado sem mexer na ordem de leitura.
 *
 * Dois elementos e não um, de propósito. `.figura` é quem tem o `perspective`,
 * e ela NÃO se move; `.figura__palco` é quem inclina com o ponteiro (escrita de
 * `--px`/`--py` pelo `useParalaxe`). Se o mesmo elemento tivesse os dois, a
 * perspectiva giraria junto com o palco e a inclinação não teria contra o que
 * ser medida.
 */
export function Figura({
  palco,
  children,
}: {
  readonly palco: RefObject<HTMLDivElement | null>
  readonly children: ReactNode
}) {
  return (
    <div className="figura" aria-hidden="true">
      <div className="figura__palco" ref={palco}>
        {children}
      </div>
    </div>
  )
}

interface CamadaProps {
  /** Deslocamento máximo, em px, quando o ponteiro está na borda da tela. */
  readonly profundidade: number
  /**
   * Duração do laço de flutuação, em segundos, com a unidade no tipo: `"6.6"`
   * sem o `s` compilaria, e o shorthand `animation` inteiro ficaria inválido em
   * silêncio — a camada simplesmente não flutuaria, sem erro em lugar nenhum.
   */
  readonly duracao: `${number}s`
  /** Negativo entra no meio do laço: as camadas não nascem todas no mesmo ponto. */
  readonly atraso?: `${number}s`
  readonly children: ReactNode
}

/**
 * Dois `<g>` aninhados, e a razão é que os dois animam `transform`.
 *
 * O de fora recebe o deslocamento do ponteiro (`--dx`/`--dy`, escritos por
 * `useParalaxe`); o de dentro recebe a flutuação por `@keyframes`. Num único
 * elemento a animação venceria a propriedade base e o paralaxe morreria — não
 * "somaria": a regra de cascata das animações é substituir, não compor.
 */
export function Camada({ profundidade, duracao, atraso = '0s', children }: CamadaProps) {
  const estilo = { '--flutua': duracao, '--flutua-atraso': atraso } as CSSProperties
  return (
    <g className="fig__camada" data-profundidade={profundidade}>
      <g className="fig__flutua" style={estilo}>
        {children}
      </g>
    </g>
  )
}
