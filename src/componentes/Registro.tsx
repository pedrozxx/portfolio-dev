import type { ReactNode } from 'react'

/**
 * Uma afirmação com a sua procedência ao lado — a unidade da direção.
 *
 * A regra editorial que governa este componente está no DESIGN.md §1.1:
 * **se não existe o que escrever na margem, a afirmação não entra na página.**
 * Por isso `fonte` é obrigatório no tipo. Não há como renderizar um Registro sem
 * procedência, e essa é a intenção — a regra vira erro de compilação, não
 * lembrete num documento que ninguém relê.
 *
 * A ordem no DOM é afirmação → procedência, nas duas larguras: o leitor de tela
 * ouve o fato e depois a origem. A margem só parece vir antes porque
 * `grid-column` a coloca na coluna da esquerda — nada de `order`, que faria a
 * ordem visual divergir da ordem de leitura.
 */

interface Props {
  /** Máximo 20 caracteres por linha, no máximo 2 linhas (DESIGN.md §6.2). */
  readonly fonte: string
  /** `true` quando há arquivo, teste ou medição por trás — não só declaração. */
  readonly forte?: boolean
  readonly children: ReactNode
}

export function Registro({ fonte, forte = false, children }: Props) {
  return (
    <div className="registro">
      <div className="corpo">{children}</div>
      <p className={forte ? 'aparato aparato--forte' : 'aparato'}>{fonte}</p>
    </div>
  )
}
