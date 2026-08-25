// Validador de contraste e de matiz.
//
// Por que existe: o DESIGN.md deste site afirma razões de contraste medidas, e o
// site diz no rodapé que segue essas medidas. Afirmação que ninguém recalcula
// apodrece — basta alguém ajustar um hex "só um pouquinho". Aqui a régua é código:
// roda em CI e reprova o build se um par cair abaixo do piso.
//
// Fórmulas: luminância relativa e razão de contraste da WCAG 2.2 (1.4.3 e 1.4.11),
// e ΔE CIE76 em Lab para separação entre cores de estado.

import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const hexParaRgb = (hex) => {
  const h = hex.replace('#', '')
  const largo = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(largo.slice(i, i + 2), 16))
}

/** Luminância relativa, WCAG 2.x. */
const luminancia = (hex) =>
  hexParaRgb(hex)
    .map((v) => {
      const c = v / 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    .reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0)

export const razao = (a, b) => {
  const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

/** sRGB → Lab (D65), para ΔE. */
const paraLab = (hex) => {
  const [r, g, b] = hexParaRgb(hex).map((v) => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
  const Y = r * 0.2126 + g * 0.7152 + b * 0.0722
  const Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116)
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]
}

export const deltaE = (a, b) => {
  const [l1, a1, b1] = paraLab(a)
  const [l2, a2, b2] = paraLab(b)
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2)
}

/** Matiz em graus — serve para provar continuidade de marca com número, não adjetivo. */
export const matiz = (hex) => {
  const [r, g, b] = hexParaRgb(hex).map((v) => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max === min) return 0
  const d = max - min
  const h =
    max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return ((h * 60) % 360 + 360) % 360
}

// ---------------------------------------------------------------------------

const t = JSON.parse(await readFile(resolve(raiz, 'src/tokens.json'), 'utf8'))

/*
 * A paleta existe em dois lugares: src/estilos/tokens.css, que o navegador usa, e
 * src/tokens.json, que este script mede. Duplicacao sem verificacao apodrece: bastaria
 * alguem ajustar um hex no CSS para o rodape do site passar a declarar um contraste
 * que a pagina nao tem mais. Aqui os dois sao comparados antes de qualquer medicao.
 */
const css = await readFile(resolve(raiz, 'src/estilos/tokens.css'), 'utf8')

const PARES = {
  claro: { papel: '--papel', superficie: '--superficie', tinta: '--tinta', tintaFraca: '--tinta-fraca', acento: '--acento', acentoContraste: '--acento-contraste', ambar: '--estado', fio: '--fio', fioEstrutural: '--fio-estrutural' },
  escuro: { papel: '--papel', superficie: '--superficie', tinta: '--tinta', tintaFraca: '--tinta-fraca', acento: '--acento', acentoContraste: '--acento-contraste', ambar: '--estado', fio: '--fio', fioEstrutural: '--fio-estrutural' },
}

// Esta direcao e escura por natureza: o :root canonico e o ESCURO, e o claro e
// que e a variante, no override de [data-tema="claro"].
const blocoEscuro = css.slice(css.indexOf(':root {'), css.indexOf('@media'))
const blocoClaro = css.slice(css.indexOf(':root[data-tema="claro"]'))

/*
 * O TERCEIRO bloco — o que a maioria das pessoas de fato vê.
 *
 * O tema claro existe em dois lugares: `@media (prefers-color-scheme: light)`,
 * que atende quem nunca tocou no alternador, e `:root[data-tema="claro"]`, que
 * atende quem escolheu. Só o segundo estava sendo medido. Alguém podia ajustar
 * um hex dentro da media query — o caminho padrão, o de maior tráfego — e
 * derrubar o contraste sem que uma única verificação apitasse.
 *
 * A regra do DESIGN.md §2.4 é que os dois blocos claros digam a mesma coisa.
 * Então não basta medir o da media query: o certo é exigir que sejam idênticos,
 * porque duas paletas claras diferentes já são o defeito, mesmo que as duas
 * passem na WCAG.
 */
const iMedia = css.indexOf('@media (prefers-color-scheme: light)')
if (iMedia === -1) {
  console.error('contraste: não achei o bloco @media (prefers-color-scheme: light) em tokens.css.')
  process.exit(1)
}
const blocoMedia = css.slice(iMedia, css.indexOf(':root[data-tema="claro"]'))

const doCss = (bloco, nome) => {
  // Regex montada com RegExp: numa string, '\s' vira apenas 's' — o padrão saía
  // como "--papels*:s*(#…)" e nunca casava. Com a barra dobrada, casa.
  const m = bloco.match(new RegExp(nome + '\\s*:\\s*(#[0-9A-Fa-f]{3,8})'))
  return m ? m[1].toUpperCase() : null
}

let divergencias = 0
for (const [modo, mapa] of Object.entries(PARES)) {
  const bloco = modo === 'claro' ? blocoClaro : blocoEscuro
  for (const [chaveJson, nomeCss] of Object.entries(mapa)) {
    const noCss = doCss(bloco, nomeCss)
    const noJson = String(t[modo][chaveJson]).toUpperCase()
    if (noCss !== noJson) {
      console.error(`DIVERGE  ${modo}.${chaveJson}: tokens.css=${noCss} tokens.json=${noJson}`)
      divergencias++
    }
  }
}
// Os dois blocos claros precisam declarar exatamente os mesmos hexes.
for (const nomeCss of Object.values(PARES.claro)) {
  const naMedia = doCss(blocoMedia, nomeCss)
  const noAtributo = doCss(blocoClaro, nomeCss)
  if (naMedia !== noAtributo) {
    console.error(
      `DIVERGE  claro.${nomeCss}: @media=${naMedia} [data-tema="claro"]=${noAtributo} ` +
        `— quem segue o sistema veria uma paleta e quem escolheu veria outra.`,
    )
    divergencias++
  }
}

if (divergencias > 0) {
  console.error(`${divergencias} token(s) divergem entre tokens.css e tokens.json. O build para aqui.`)
  process.exit(1)
}
console.log('tokens.css e tokens.json batem em 18 valores.')

/**
 * Cada par vem com o piso que a WCAG exige para o USO dele:
 * 4.5 para texto normal, 3 para texto grande (≥24px ou ≥18.66px negrito),
 * 3 para borda de campo, ícone e anel de foco.
 */
const pares = []
for (const modo of ['claro', 'escuro']) {
  const c = t[modo]
  pares.push(
    { modo, nome: 'texto sobre papel', a: c.tinta, b: c.papel, piso: 4.5 },
    { modo, nome: 'texto sobre superficie', a: c.tinta, b: c.superficie, piso: 4.5 },
    { modo, nome: 'texto fraco sobre papel', a: c.tintaFraca, b: c.papel, piso: 4.5 },
    { modo, nome: 'texto fraco sobre superficie', a: c.tintaFraca, b: c.superficie, piso: 4.5 },
    { modo, nome: 'acento sobre papel (link)', a: c.acento, b: c.papel, piso: 4.5 },
    { modo, nome: 'acento sobre superficie', a: c.acento, b: c.superficie, piso: 4.5 },
    { modo, nome: 'ambar (estado) sobre papel', a: c.ambar, b: c.papel, piso: 4.5 },
    { modo, nome: 'anel de foco sobre papel', a: c.acento, b: c.papel, piso: 3 },
    { modo, nome: 'anel de foco sobre superficie', a: c.acento, b: c.superficie, piso: 3 },
    // O fio estrutural e o unico autorizado a delimitar algo operavel, entao
    // responde pelo piso de 3:1 da WCAG 1.4.11 nos DOIS fundos que ele encosta.
    { modo, nome: 'fio estrutural sobre papel', a: c.fioEstrutural, b: c.papel, piso: 3 },
    { modo, nome: 'fio estrutural sobre superficie', a: c.fioEstrutural, b: c.superficie, piso: 3 },
    // O fio decorativo REPROVA de proposito: ele so separa, nunca delimita controle.
    // O piso baixo aqui e um registro de que a escolha foi deliberada, nao um descuido.
    { modo, nome: 'fio decorativo sobre papel (decorativo)', a: c.fio, b: c.papel, piso: 1.2 },
    // O juiz de engenharia mediu 1,96:1 aqui num dos conceitos. Seleção é um estado
    // que se alcança com Ctrl+A: o texto tem de continuar legível dentro dela.
    { modo, nome: 'texto da selecao sobre o acento', a: c.selecaoTexto, b: c.acento, piso: 4.5 },
    { modo, nome: 'texto do botao primario', a: c.botaoPrimarioTexto, b: c.acento, piso: 4.5 },
  )
}

let reprovados = 0
console.log('PAR                                        MODO     MEDIDO   PISO')
for (const p of pares) {
  const r = razao(p.a, p.b)
  const ok = r >= p.piso
  if (!ok) reprovados++
  console.log(
    `${(ok ? 'ok  ' : 'FALHA')} ${p.nome.padEnd(36)} ${p.modo.padEnd(8)} ` +
      `${r.toFixed(2).padStart(6)}:1 ${String(p.piso).padStart(5)}`,
  )
}

// Âmbar é a única cor de estado. Se ele não se separar do acento, a regra "cor de
// estado é semântica, nunca decorativa" deixa de ser legível na prática.
console.log('')
for (const modo of ['claro', 'escuro']) {
  const d = deltaE(t[modo].acento, t[modo].ambar)
  const ok = d >= 15
  if (!ok) reprovados++
  console.log(
    `${ok ? 'ok  ' : 'FALHA'} DeltaE acento x ambar (${modo}): ${d.toFixed(1)} (piso 15)`,
  )
}

console.log('')
console.log(
  `matiz do acento: claro ${matiz(t.claro.acento).toFixed(1)}deg · ` +
    `escuro ${matiz(t.escuro.acento).toFixed(1)}deg · ` +
    `diferenca ${Math.abs(matiz(t.claro.acento) - matiz(t.escuro.acento)).toFixed(1)}deg`,
)

if (reprovados > 0) {
  console.error(`\n${reprovados} par(es) reprovados. O build para aqui.`)
  process.exit(1)
}
console.log('\nTodos os pares passam.')
