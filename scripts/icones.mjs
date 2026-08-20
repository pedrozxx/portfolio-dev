// Converte os SVG de assets/icons em componentes TSX.
//
// Por que: os arquivos vêm com `fill="#E2E4E9"` gravado dentro (e um deles com
// `#82BC4F`). Servidos como <img src="*.svg"> a cor é imutável — num fundo claro
// o ícone mede 1,27:1 e some. Trocar o fill por `currentColor` faz o ícone herdar
// a cor do texto ao redor, então tema claro, tema escuro, hover e foco passam a
// funcionar de graça.
//
// Bônus: vira parte do bundle e some uma requisição por ícone.

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const origem = resolve(raiz, 'assets/icons')
const destino = resolve(raiz, 'src/componentes/icones')

const arquivos = (await readdir(origem)).filter((f) => f.endsWith('.svg'))
const nomes = []

for (const arquivo of arquivos) {
  const nome = basename(arquivo, '.svg')
  let svg = await readFile(resolve(origem, arquivo), 'utf8')

  svg = svg
    .trim()
    // Toda cor literal vira currentColor. `fill="none"` é estrutural — preservar.
    .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"')
    .replace(/stroke="#[0-9A-Fa-f]{3,8}"/g, 'stroke="currentColor"')
    // Largura e altura fixas saem: quem decide o tamanho é o CSS.
    .replace(/\s(width|height)="[^"]*"/g, '')
    .replace(/xmlns="[^"]*"/, 'xmlns="http://www.w3.org/2000/svg"')
    // O ícone é decorativo por padrão; quando carregar significado, quem usa passa
    // aria-hidden={false} e um aria-label — por isso as props vão por último e
    // sobrescrevem.
    .replace(
      /^<svg/,
      '<svg aria-hidden="true" focusable="false" width="1em" height="1em" {...props}',
    )

  await writeFile(
    resolve(destino, `${nome}.tsx`),
    `import type { SVGProps } from 'react'\n\n` +
      `/** Gerado por scripts/icones.mjs a partir de assets/icons/${arquivo}. Não editar à mão. */\n` +
      `export function ${nome}(props: SVGProps<SVGSVGElement>) {\n  return (\n    ${svg.replace(/\n/g, '\n    ')}\n  )\n}\n`,
    'utf8',
  )
  nomes.push(nome)
  console.log(`${nome}.tsx`)
}

await writeFile(
  resolve(destino, 'index.ts'),
  `/** Gerado por scripts/icones.mjs. Não editar à mão. */\n` +
    nomes.map((n) => `export { ${n} } from './${n}'`).join('\n') +
    '\n',
  'utf8',
)

console.log(`\n${nomes.length} ícones convertidos para currentColor.`)
