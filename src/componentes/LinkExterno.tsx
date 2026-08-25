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

  /*
   * `.link-externo` é o padrão, não um extra que cada chamada precisa lembrar.
   *
   * Antes o componente repassava só o `className` recebido — e nenhuma das três
   * chamadas passava um. Resultado medido no HTML publicado: os quinze links de
   * destino dos cartões saíam sem atributo `class` nenhum, herdando apenas
   * `a { color: var(--acento) }`. Perdiam a fonte mono, o caixa-alta, o alvo de
   * 48px que a WCAG 2.2 §2.5.8 pede — e, ironicamente, o `flex-wrap: nowrap`
   * que o próprio CSS ganhou para impedir a seta de cair sozinha numa segunda
   * linha. O conserto estava escrito e desligado.
   */
  const classe = className ? `link-externo ${className}` : 'link-externo'

  return (
    <a
      href={href}
      className={classe}
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
