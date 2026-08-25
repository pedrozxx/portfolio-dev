/**
 * Faixa técnica: itens em mono separados por ponto médio.
 *
 * Substitui o "chip" com logo colorido (DESIGN.md §5). Sem pílula, sem
 * preenchimento, sem borda, sem ícone. Um marcador nunca é clicável e nunca é
 * focável — se precisasse de foco, teria virado link.
 *
 * O separador vai num <span aria-hidden>: sem isso o leitor de tela lê
 * "React ponto médio TypeScript ponto médio Node ponto", que é ruído puro.
 */
export function Marcadores({ itens, className }: { readonly itens: readonly string[]; readonly className?: string }) {
  return (
    <p className={`marcadores mono${className ? ` ${className}` : ''}`}>
      {itens.map((item, i) => (
        <span key={item}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          {item}
        </span>
      ))}
    </p>
  )
}
