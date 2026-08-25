/**
 * Gera os cartões de compartilhamento (public/og.png e public/og-en.png).
 *
 * Por que existe: antes, a instrução dentro de scripts/og-cartao.html era
 * "abra no navegador, capture a tela e recorte os 1200x630 do canto superior
 * esquerdo". Passo manual não roda em revisão, e foi assim que o cartão ficou
 * turquesa por três reescritas de direção enquanto o site virava laranja — a
 * peça que aparece no WhatsApp e no LinkedIn era a última a ser lembrada.
 *
 * Por que Chrome e não sharp: o rasterizador de SVG do sharp não tem Orbitron,
 * Rajdhani nem JetBrains Mono instaladas, cai em fonte com serifa e perde os
 * acentos. Fonte errada numa peça de marca é o defeito mais visível possível.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, copyFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const CANDIDATOS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]

const chrome = CANDIDATOS.find((c) => existsSync(c))
if (!chrome) {
  throw new Error(`og: não achei o Chrome. Procurei em:\n  ${CANDIDATOS.join('\n  ')}`)
}

const PECAS = [
  { fonte: 'scripts/og-cartao.html', destino: 'public/og.png' },
  { fonte: 'scripts/og-cartao-en.html', destino: 'public/og-en.png' },
]

for (const { fonte, destino } of PECAS) {
  const perfil = mkdtempSync(join(tmpdir(), 'og-'))
  const saida = join(perfil, 'shot.png')
  try {
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--window-size=1200,630',
        `--user-data-dir=${perfil}`,
        // 2s para as três famílias do Google Fonts chegarem. Sem isso o cartão
        // sai em fallback — que é justamente o que este script existe para evitar.
        '--virtual-time-budget=2000',
        `--screenshot=${saida}`,
        pathToFileURL(resolve(fonte)).href,
      ],
      { stdio: 'ignore' },
    )
    copyFileSync(saida, resolve(destino))
    console.log(`og: ${destino} gerado a partir de ${fonte}`)
  } finally {
    rmSync(perfil, { recursive: true, force: true })
  }
}
