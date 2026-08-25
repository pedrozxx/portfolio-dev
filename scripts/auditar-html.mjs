// Auditoria do HTML publicado.
//
// Por que existe: a auditoria do site antigo achou defeitos que só aparecem no
// HTML final — link sem texto acessível, ausência de landmark, hierarquia de
// heading pulada, imagem sem dimensão. São exatamente os defeitos que um revisor
// técnico encontra abrindo o inspetor, e todos são baratos de evitar e fáceis de
// reintroduzir sem perceber.
//
// Roda depois do build, sobre dist/ — ou seja, sobre o que o visitante recebe,
// não sobre o JSX. Se algum item falhar, o build para.

import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseHTML } from 'linkedom'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PAGINAS = [
  { arquivo: 'dist/index.html', lang: 'pt-BR' },
  { arquivo: 'dist/en/index.html', lang: 'en' },
]

const falhas = []
const reprovar = (pagina, regra, detalhe) => falhas.push(`${pagina}: ${regra} — ${detalhe}`)

/** Nome acessível de um link ou botão, na ordem em que o navegador resolve. */
function nomeAcessivel(el) {
  const rotulo = el.getAttribute('aria-label')
  if (rotulo?.trim()) return rotulo.trim()
  const img = el.querySelector('img[alt]')
  const texto = (el.textContent ?? '').trim()
  if (texto) return texto
  if (img?.getAttribute('alt')?.trim()) return img.getAttribute('alt').trim()
  const titulo = el.getAttribute('title')
  return titulo?.trim() ?? ''
}

for (const { arquivo, lang } of PAGINAS) {
  const html = await readFile(resolve(raiz, arquivo), 'utf8')
  const { document } = parseHTML(html)
  const p = arquivo

  // O pré-render precisa ter injetado conteúdo. Uma casca vazia passa em todos os
  // outros testes justamente por não ter nada — este item vem primeiro.
  const corpo = (document.querySelector('#root')?.textContent ?? '').trim()
  if (corpo.length < 500) {
    reprovar(p, 'conteúdo estático', `#root tem só ${corpo.length} caracteres de texto`)
  }

  if (document.documentElement.getAttribute('lang') !== lang) {
    reprovar(p, 'lang', `esperado "${lang}", achei "${document.documentElement.getAttribute('lang')}"`)
  }

  const h1 = document.querySelectorAll('h1')
  if (h1.length !== 1) reprovar(p, 'h1 único', `achei ${h1.length}`)

  // Heading não pode pular nível: h2 seguido de h4 quebra a navegação por teclado
  // em leitor de tela, que é como muita gente varre uma página longa.
  const niveis = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
    Number(h.tagName[1]),
  )
  for (let i = 1; i < niveis.length; i++) {
    if (niveis[i] - niveis[i - 1] > 1) {
      reprovar(p, 'hierarquia de heading', `pulou de h${niveis[i - 1]} para h${niveis[i]}`)
    }
  }

  for (const marco of ['main', 'header', 'footer']) {
    if (!document.querySelector(marco)) reprovar(p, 'landmark', `falta <${marco}>`)
  }

  // O defeito exato do site antigo: <a> com o texto visível fora dele.
  for (const a of document.querySelectorAll('a')) {
    const nome = nomeAcessivel(a)
    if (!nome) reprovar(p, 'link sem nome acessível', a.outerHTML.slice(0, 110))
    if (/^(clique aqui|aqui|saiba mais|leia mais|click here|here|read more)$/i.test(nome)) {
      reprovar(p, 'texto de link genérico', `"${nome}"`)
    }
    const href = a.getAttribute('href')
    if (!href) reprovar(p, 'link sem href', nome)
    if (a.getAttribute('target') === '_blank' && !(a.getAttribute('rel') ?? '').includes('noopener')) {
      reprovar(p, 'target=_blank sem rel=noopener', nome)
    }
  }

  for (const b of document.querySelectorAll('button')) {
    if (!nomeAcessivel(b)) reprovar(p, 'botão sem nome acessível', b.outerHTML.slice(0, 110))
  }

  for (const img of document.querySelectorAll('img')) {
    const alt = img.getAttribute('alt')
    if (alt === null) reprovar(p, 'img sem alt', img.getAttribute('src') ?? '?')
    if (!img.getAttribute('width') || !img.getAttribute('height')) {
      reprovar(p, 'img sem dimensão (CLS)', img.getAttribute('src') ?? '?')
    }
  }

  const canonical = document.querySelector('link[rel=canonical]')?.getAttribute('href')
  if (!canonical) reprovar(p, 'canonical', 'ausente')

  const hreflangs = [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) =>
    l.getAttribute('hreflang'),
  )
  for (const esperado of ['pt-BR', 'en', 'x-default']) {
    if (!hreflangs.includes(esperado)) reprovar(p, 'hreflang', `falta ${esperado}`)
  }

  /*
   * Skip link: PRIMEIRO link do documento, e com alvo que existe.
   *
   * A regra anterior era `querySelector('a[href^="#"]')` — satisfeita por
   * qualquer âncora interna. O `<a href="#topo">` da marca no cabeçalho a
   * satisfaz para sempre, então apagar o skip link não reprovaria nada: a
   * verificação era um falso negativo permanente.
   *
   * As duas condições abaixo são o que realmente faz um skip link funcionar.
   * Ser o primeiro link importa porque o valor dele é chegar antes de todo o
   * resto no Tab; e o alvo precisa existir, senão o foco não vai a lugar nenhum
   * e a pessoa fica presa no cabeçalho.
   */
  const principal = document.querySelector('main')
  const primeiro = document.querySelector('a')
  const destino = primeiro?.getAttribute('href') ?? ''
  const alvo = destino.startsWith('#') ? document.getElementById(destino.slice(1)) : null

  if (!principal) {
    reprovar(p, 'skip link', 'não há <main> para onde pular')
  } else if (alvo === null) {
    reprovar(
      p,
      'skip link',
      `o primeiro link do documento é "${destino}", que não resolve para nenhum elemento`,
    )
  } else if (alvo !== principal) {
    reprovar(
      p,
      'skip link',
      `o primeiro link aponta para "${destino}", que não é o <main> — ` +
        `apagar o skip link deixaria a marca do cabeçalho ocupar esse lugar em silêncio`,
    )
  }

  console.log(
    `${p}: ${document.querySelectorAll('a').length} links, ` +
      `${document.querySelectorAll('img').length} imagens, ` +
      `${niveis.length} headings, ${corpo.length} caracteres de texto estático`,
  )
}

if (falhas.length) {
  console.error(`\n${falhas.length} falha(s):`)
  for (const f of falhas) console.error(`  ${f}`)
  process.exit(1)
}
console.log('\nHTML publicado passa em todos os itens.')
