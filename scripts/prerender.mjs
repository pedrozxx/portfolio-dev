// Pré-renderização estática.
//
// Por que existe: o site é publicado no GitHub Pages, que serve arquivo — não roda
// Node. Um app React sem esta etapa entrega `<div id="root"></div>` vazio no
// view-source. Quem inspeciona o HTML vê uma casca, e o robô de busca que não
// executa JavaScript indexa uma página em branco. O conteúdo deste site é fixo:
// não há motivo para ele nascer só no navegador.
//
// O que faz: para cada idioma, renderiza a árvore React em HTML no momento do
// build e injeta esse HTML dentro do #root do arquivo já produzido pelo Vite. O
// bundle continua sendo carregado e hidrata a página — os pedaços interativos
// (tema, barra de progresso, revelações) seguem funcionando.
//
// Consequência: com o JavaScript desligado a página continua legível por inteiro.

import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(raiz, 'dist')

// pathToFileURL e obrigatorio: no Windows o caminho absoluto comeca com `c:\`, e o
// carregador ESM do Node interpreta `c:` como um protocolo desconhecido
// (ERR_UNSUPPORTED_ESM_URL_SCHEME). No Linux do CI passaria sem isso — o build
// quebraria so na maquina do Pedro, que e onde ele roda antes de publicar.
const { renderizar } = await import(pathToFileURL(resolve(raiz, 'dist-ssr/entry-server.js')).href)

/** Cada idioma tem seu próprio arquivo HTML, com seu <html lang> e seu <title>. */
const PAGINAS = [
  { idioma: 'pt', arquivo: 'index.html' },
  { idioma: 'en', arquivo: 'en/index.html' },
]

const MARCADOR = '<div id="root"></div>'

for (const { idioma, arquivo } of PAGINAS) {
  const caminho = resolve(dist, arquivo)
  const html = await readFile(caminho, 'utf8')

  if (!html.includes(MARCADOR)) {
    // Falhar alto: se o marcador mudou de forma, injetar em silêncio produziria
    // uma página publicada sem conteúdo — e ninguém notaria até um recrutador abrir.
    throw new Error(
      `prerender: não achei ${MARCADOR} em dist/${arquivo}. ` +
        `Se o id do container mudou, atualize MARCADOR em scripts/prerender.mjs.`,
    )
  }

  const marcacao = renderizar(idioma)
  await writeFile(caminho, html.replace(MARCADOR, `<div id="root">${marcacao}</div>`), 'utf8')

  console.log(`prerender: ${arquivo} — ${marcacao.length.toLocaleString('pt-BR')} caracteres de HTML injetados`)
}
