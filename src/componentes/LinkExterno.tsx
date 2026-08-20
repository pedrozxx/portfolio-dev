import type { ReactNode } from 'react'
import { ArrowUpRight } from './icones'

/**
 * Link que sai do site.
 *
 * Três coisas que ele garante e que se perdem quando cada link é escrito à mão:
 *
 * 1. `rel="noopener noreferrer"` sempre que abre em outra aba.
 * 2. O nome acessível diz PARA ONDE vai, não "abrir". Um leitor de tela que lista
 *    os links da página mostra só o nome deles: quatro links chamados "abrir" são
 *    quatro links indistinguíveis.
 * 3. A seta é decorativa e fica fora do nome acessível — ela repete visualmente o
 *    que o texto já diz, e anunciá-la seria ruído.
 */

interface Props {
  readonly href: string
  readonly children: ReactNode
  /** Completa o nome acessível: "Abrir o site" + " — Radar de Licitações do Pará". */
  readonly descreve?: string
  readonly className?: string
  readonly novaAba?: boolean
}

export function LinkExterno({ href, children, descreve, className, novaAba = true }: Props) {
  const alvo = novaAba ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a
      href={href}
      className={className}
      {...alvo}
      {...(descreve ? { 'aria-label': `${textoDe(children)} — ${descreve}` } : {})}
    >
      {children}
      <ArrowUpRight />
    </a>
  )
}

/** Extrai o texto de um filho simples, para compor o aria-label sem duplicar string. */
function textoDe(filho: ReactNode): string {
  return typeof filho === 'string' ? filho : String(filho ?? '')
}
