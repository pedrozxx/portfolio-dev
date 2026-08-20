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

export function Imagem({ nome, alt, width, height, className, prioritaria = false }: Props) {
  const conjunto = (formato: string) =>
    [url(nome, formato), `${url(nome, formato, true)} 2x`].filter(Boolean).join(', ')

  return (
    <picture>
      <source type="image/avif" srcSet={conjunto('avif')} />
      <source type="image/webp" srcSet={conjunto('webp')} />
      <img
        src={url(nome, 'webp')}
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
