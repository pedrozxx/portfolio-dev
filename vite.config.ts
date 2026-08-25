import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// O site é publicado em https://pedrozxx.github.io/portfolio-dev/, não na raiz do
// domínio. Sem BASE_PATH o HTML pediria /assets/... e receberia 404 — página em
// branco. Em `npm run dev` a base é '/' e tudo funciona igual.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    /*
     * Captura de projeto nunca é embutida como data URI.
     *
     * O padrão do Vite embute todo asset abaixo de 4 KB. `conversor-de-valor`
     * cabia nesse limite, e o resultado medido foi ruim de um jeito específico:
     * a mesma imagem entrava TRÊS vezes no documento — no `srcSet` do
     * `<source>` avif, no do webp e no `src` do `<img>` — somando 11,3 KB de
     * base64 em cada idioma, 19% do HTML publicado.
     *
     * E é o pior candidato possível a inline: o cartão 02 está abaixo da dobra
     * e a imagem é `loading="lazy"`. Como arquivo, quem não rola nunca a baixa;
     * embutida, todo mundo paga por ela antes da primeira pintura — inclusive
     * quem só abriu a página para ler o hero.
     *
     * `false` desliga o inline só para essa pasta; ícone SVG pequeno em outro
     * lugar continua embutido, que ali o inline compensa.
     */
    assetsInlineLimit: (caminho: string) =>
      /[\/]assets[\/]projetos[\/]/.test(caminho) ? false : undefined,

    // Duas entradas HTML de verdade, não uma SPA com rota no cliente: o Google
    // indexa /portfolio-dev/ em português e /portfolio-dev/en/ em inglês, cada uma
    // com seu <html lang>, seu <title> e seu hreflang. Rota no cliente entregaria
    // o mesmo HTML vazio para os dois idiomas.
    rollupOptions: {
      input: {
        pt: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
      },
    },
    target: 'es2022',
  },
})
