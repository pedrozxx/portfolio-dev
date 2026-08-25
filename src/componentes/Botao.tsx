import type { AnchorHTMLAttributes, ReactNode } from 'react'

/**
 * Dois tipos e só dois (DESIGN.md §5). O primário existe em exatamente dois
 * lugares da página: cabeçalho e contato.
 *
 * Não há estado desabilitado neste site: se a ação não pode acontecer, o botão
 * não nasce. Um botão primário morto num site de contratação prova, no primeiro
 * clique, que ele publica coisa que não funciona.
 */

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly tipo?: 'primario' | 'secundario'
  readonly children: ReactNode
}

export function BotaoLink({ tipo = 'secundario', children, className, ...resto }: Props) {
  return (
    <a className={`botao botao--${tipo}${className ? ` ${className}` : ''}`} {...resto}>
      {children}
    </a>
  )
}
