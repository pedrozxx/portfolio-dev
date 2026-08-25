/**
 * Imagem responsiva com AVIF, WebP e as dimensões declaradas.
 *
 * `width` e `height` são obrigatórios no tipo, não opcionais: sem eles o navegador
 * não reserva o espaço antes de a imagem chegar, o conteúdo pula quando ela chega,
 * e isso é CLS — a métrica que mais barato se perde e mais chato é caçar depois.
 * O portfólio atual já acerta isso; o tipo garante que continue acertando.
 */

interface Props {
  /** Nome do arquivo sem extensão, como gerado por scripts/imagens.mjs. */
  readonly nome: string
  readonly alt: string
  readonly width: number
  readonly height: number
  readonly className?: string
  /** `true` só para a imagem que aparece na primeira tela. */
  readonly prioritaria?: boolean
}

// `import.meta.glob` com `eager` resolve os caminhos no build: o Vite dá a URL com
// hash e nada é pedido em tempo de execução. Um caminho montado com string
// quebraria em produção, onde o arquivo se chama radar-licitacoes-pa.C3f9a1.avif.
const ARQUIVOS = import.meta.glob<string>('../assets/projetos/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function url(nome: string, formato: string, dobro = false): string | undefined {
  const chave = `../assets/projetos/${nome}${dobro ? '@2x' : ''}.${formato}`
  return ARQUIVOS[chave]
}

/**
 * Monta o `srcSet` com as variantes que existem de verdade.
 *
 * A versão anterior era `[url(...), `${url(..., true)} 2x`].filter(Boolean)`, e o
 * `filter` ali era decorativo: quando a variante @2x não existe, a interpolação
 * já produziu a string `"undefined 2x"` — que é truthy e passa direto. Medido:
 * o atributo publicado virava `srcSet="/radar.avif, undefined 2x"`, e o
 * navegador que escolhesse o candidato 2x pedia uma URL chamada `undefined`.
 *
 * Agora o descritor só é montado depois de a variante ser confirmada, e um
 * conjunto vazio devolve `undefined` — o React omite o atributo em vez de
 * emitir `srcSet=""`, que é inválido.
 */
function conjunto(nome: string, formato: string): string | undefined {
  const base = url(nome, formato)
  const dobro = url(nome, formato, true)

  const partes = [base, dobro === undefined ? undefined : `${dobro} 2x`].filter(
    (parte): parte is string => parte !== undefined,
  )

  return partes.length > 0 ? partes.join(', ') : undefined
}

export function Imagem({ nome, alt, width, height, className, prioritaria = false }: Props) {
  const base = url(nome, 'webp')

  /*
   * Nome errado tem que quebrar o build, não a página.
   *
   * `nome` é `string`: qualquer erro de digitação compila. Antes, um nome que
   * não resolvesse deixava o `<img>` sem `src` — o React omite o atributo — e o
   * resultado era uma caixa de imagem quebrada com o alt, em produção, sem uma
   * linha no console.
   *
   * Lançar aqui fecha o caminho inteiro: `npm run dev` mostra o overlay na hora,
   * e `npm run build` falha no pré-render, porque o prerender roda este mesmo
   * componente por `renderToString`. Uma captura faltando não consegue mais
   * chegar ao ar.
   */
  if (base === undefined) {
    throw new Error(
      `Imagem: não existe nenhum arquivo para "${nome}" em src/assets/projetos/. ` +
        `Disponíveis: ${Object.keys(ARQUIVOS).join(', ')}`,
    )
  }

  return (
    <picture>
      <source type="image/avif" srcSet={conjunto(nome, 'avif')} />
      <source type="image/webp" srcSet={conjunto(nome, 'webp')} />
      <img
        src={base}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={prioritaria ? 'eager' : 'lazy'}
        decoding={prioritaria ? 'sync' : 'async'}
        {...(prioritaria ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  )
}
