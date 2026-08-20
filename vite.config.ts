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
