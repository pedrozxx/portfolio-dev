// Pipeline de imagem.
//
// Por que existe: as capturas de tela saem do navegador com 1483x812 e até 356 KB.
// Servir isso num cartão que ocupa 640 px de largura é mandar quatro vezes mais
// pixel do que a tela usa, e pagar o custo em LCP. Aqui cada captura vira AVIF e
// WebP em duas larguras, e o componente escolhe com <picture> e srcset.
//
// Roda à mão (`npm run imagens`), não no build: as capturas mudam poucas vezes
// por ano, e reprocessar imagem a cada deploy é desperdício de CI.
//
// As capturas de origem ficam versionadas em capturas/ justamente para isto
// continuar reproduzível num clone limpo. Sem elas no repositório, o script
// existiria como enfeite: ninguém conseguiria rodá-lo de novo.

import { readdir, mkdir, stat } from 'node:fs/promises'
import { resolve, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const origem = resolve(raiz, 'capturas')
const destino = resolve(raiz, 'src/assets/projetos')

/**
 * Duas larguras: a do cartão em tela comum e a mesma em tela de densidade 2x.
 * Não gerar mais do que o layout usa — cada variante extra é peso no repositório
 * e uma decisão a mais no srcset sem ganho visível.
 *
 * 384px é o teto REAL do cartão: `.cartao` é `flex: 0 0 clamp(17rem, 30vw, 24rem)`,
 * e 24rem = 384px. Medido na página, o `<img>` renderiza a 382 CSS px.
 *
 * Estava em [760, 1520], número herdado do layout anterior, em que o cartão era
 * largo. Depois que os projetos viraram trilho horizontal ninguém remediu: o
 * arquivo "1x" virou, na prática, um 2x, e o "@2x" virou um 4x — quatro vezes
 * mais pixels do que qualquer tela consegue mostrar naquele slot.
 */
const LARGURAS = [384, 768]

await mkdir(destino, { recursive: true })

const arquivos = (await readdir(origem)).filter(
  (f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('ANTES-'),
)

let totalAntes = 0
/** Só o que uma tela comum realmente baixa: uma variante por imagem, a 1x em AVIF. */
let totalBaixado = 0

for (const arquivo of arquivos) {
  const caminho = resolve(origem, arquivo)
  const nome = basename(arquivo, extname(arquivo))
  const { size: bytesAntes } = await stat(caminho)
  totalAntes += bytesAntes

  const meta = await sharp(caminho).metadata()

  for (const largura of LARGURAS) {
    // Não ampliar: uma captura de 1483 px virar 1520 px só inventa pixel borrado.
    const alvo = Math.min(largura, meta.width ?? largura)
    const sufixo = largura === LARGURAS[0] ? '' : '@2x'

    for (const [formato, opcoes] of [
      ['avif', { quality: 55, effort: 6 }],
      ['webp', { quality: 78 }],
    ]) {
      const saida = resolve(destino, `${nome}${sufixo}.${formato}`)
      const info = await sharp(caminho)
        .resize({ width: alvo, withoutEnlargement: true })
        .toFormat(formato, opcoes)
        .toFile(saida)
      if (sufixo === '' && formato === 'avif') totalBaixado += info.size
      console.log(
        `${nome}${sufixo}.${formato}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
      )
    }
  }
}

// Comparar a soma das quatro variantes com a origem daria um número enganoso: o
// navegador baixa UMA variante por imagem, não as quatro. A medida honesta é o
// que uma tela comum puxa de fato.
const reducao = (1 - totalBaixado / totalAntes) * 100
console.log(
  `
${arquivos.length} capturas. Origem: ${(totalAntes / 1024).toFixed(0)} KB. ` +
    `O que uma tela 1x baixa agora: ${(totalBaixado / 1024).toFixed(0)} KB em AVIF ` +
    `(${reducao.toFixed(0)}% a menos). As variantes @2x e os WebP de reserva ficam no ` +
    `repositório e só saem pela rede para quem precisa deles.`,
)
