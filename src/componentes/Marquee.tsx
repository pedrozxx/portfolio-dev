/**
 * Faixa de palavras-chave correndo na horizontal, duas fitas em sentidos opostos.
 *
 * Duas decisões que a versão ingênua erra:
 *
 * 1. **O grupo é duplicado no DOM.** A animação vai de 0 a -50% e reinicia; sem
 *    a segunda cópia idêntica, o laço teria uma emenda visível a cada volta.
 * 2. **A segunda cópia é `aria-hidden`.** Ela existe só para o laço fechar. Sem
 *    isso, o leitor de tela lê a lista inteira duas vezes seguidas.
 *
 * A faixa toda é decorativa: as mesmas tecnologias aparecem em texto na abertura
 * e no capítulo Sobre, que é a superfície de Ctrl+F e de ATS.
 */

interface Props {
  readonly itens: readonly string[]
  readonly volta?: boolean
}

function Grupo({ itens, oculto }: { readonly itens: readonly string[]; readonly oculto: boolean }) {
  return (
    <div className="marquee__grupo" {...(oculto ? { 'aria-hidden': true } : {})}>
      {itens.map((item, i) => (
        <span key={item} className={`marquee__item${i % 3 === 1 ? ' marquee__item--cheio' : ''}`}>
          {item}
        </span>
      ))}
    </div>
  )
}

export function Marquee({ itens, volta = false }: Props) {
  return (
    <div className={`marquee__fita${volta ? ' marquee__fita--volta' : ''}`}>
      <Grupo itens={itens} oculto={false} />
      <Grupo itens={itens} oculto />
    </div>
  )
}
