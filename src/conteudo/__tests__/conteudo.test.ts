import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { PROJETOS, type Bilingue } from '../projetos'
import { PROJETOS_MENORES } from '../projetos-menores'
import { EXPERIENCIA } from '../experiencia'
import { TEXTOS } from '../../i18n'

/**
 * Estes testes não checam se o site é bonito. Checam as regras que o dossiê chama
 * de restrição de honestidade — as que, se quebradas em silêncio, transformam o
 * portfólio numa peça que não se sustenta numa entrevista.
 */

const IDIOMAS = ['pt', 'en'] as const

/** Junta todo campo bilíngue de um objeto, em qualquer profundidade. */
function bilinguesDe(valor: unknown, caminho: string, saida: [string, Bilingue][] = []) {
  if (valor === null || typeof valor !== 'object') return saida
  const obj = valor as Record<string, unknown>
  if (typeof obj['pt'] === 'string' && typeof obj['en'] === 'string') {
    saida.push([caminho, obj as unknown as Bilingue])
    return saida
  }
  for (const [chave, v] of Object.entries(obj)) bilinguesDe(v, `${caminho}.${chave}`, saida)
  return saida
}

describe('paridade entre idiomas', () => {
  const tudo = [
    ...bilinguesDe(PROJETOS, 'PROJETOS'),
    ...bilinguesDe(PROJETOS_MENORES, 'PROJETOS_MENORES'),
    ...bilinguesDe(EXPERIENCIA, 'EXPERIENCIA'),
  ]

  it('encontra campos bilíngues para verificar', () => {
    expect(tudo.length).toBeGreaterThan(30)
  })

  it.each(tudo)('%s tem os dois idiomas preenchidos', (_caminho, texto) => {
    for (const idioma of IDIOMAS) {
      expect(texto[idioma].trim().length).toBeGreaterThan(0)
    }
  })

  it.each(tudo)('%s não deixou o inglês igual ao português', (caminho, texto) => {
    // Nome próprio e sigla podem coincidir; frase inteira igual nos dois idiomas
    // é tradução esquecida. O corte em 40 caracteres separa os dois casos.
    if (texto.pt.length > 40) {
      expect(texto.en, `${caminho} parece não traduzido`).not.toBe(texto.pt)
    }
  })

  it('a interface tem as mesmas chaves nos dois idiomas', () => {
    expect(Object.keys(TEXTOS.en).sort()).toEqual(Object.keys(TEXTOS.pt).sort())
  })
})

describe('sistema interno nunca vira link', () => {
  it.each(EXPERIENCIA)('$empresa não expõe repositório nem demonstração', (cargo) => {
    // A regra de fundo: código fechado é narrado, nunca linkado. Um único
    // http:// dentro de uma entrada de experiência significa que alguém colou um
    // repositório onde não podia.
    const serializado = JSON.stringify(cargo)
    expect(serializado).not.toMatch(/https?:\/\//)
  })

  it('a empresa júnior não chama o trabalho dela de "cliente"', () => {
    // DESIGN.md §10.1 proíbe a palavra na entrada da empresa júnior: chamar de
    // cliente o trabalho de EJ infla o cargo. Não é uma proibição global — a
    // Sea Telecom fala de "controle de clientes" da operadora, que é o cargo
    // dele descrito com a palavra certa, e essa fica.
    const linkJr = EXPERIENCIA.find((c) => c.empresa === 'Link Jr')
    expect(linkJr, 'entrada da Link Jr sumiu').toBeDefined()
    expect(JSON.stringify(linkJr).toLowerCase()).not.toContain('cliente')
  })

  it('quem tem código fechado explica por quê, com a frase daquela entrada', () => {
    const selos = EXPERIENCIA.map((c) => c.semLink).filter((s) => s !== null)
    // Nenhuma frase genérica repetida: cada ausência tem o motivo dela.
    expect(new Set(selos.map((s) => s.pt)).size).toBe(selos.length)
  })
})

describe('links', () => {
  const urls = [
    ...PROJETOS.flatMap((p) => [p.repo, p.demo]),
    ...PROJETOS_MENORES.flatMap((p) => [p.repo, p.demo]),
  ].filter((u): u is string => u !== null)

  it('tem link para verificar', () => {
    expect(urls.length).toBeGreaterThan(5)
  })

  it.each(urls)('%s usa https e é uma URL válida', (url) => {
    expect(() => new URL(url)).not.toThrow()
    expect(new URL(url).protocol).toBe('https:')
  })

  it('todo projeto tem pelo menos um link — sem cartão sem saída', () => {
    for (const p of [...PROJETOS, ...PROJETOS_MENORES]) {
      expect(p.repo ?? p.demo, `${p.id} não tem link nenhum`).toBeTruthy()
    }
  })
})

describe('hierarquia', () => {
  it('existe exatamente um carro-chefe', () => {
    expect(PROJETOS.filter((p) => p.destaque)).toHaveLength(1)
  })

  it('o carro-chefe traz decisões de engenharia; sem elas ele é só mais um cartão', () => {
    const destaque = PROJETOS.find((p) => p.destaque)
    expect(destaque?.decisoes.length).toBeGreaterThanOrEqual(3)
  })

  it('nenhum id se repete', () => {
    const ids = [...PROJETOS, ...PROJETOS_MENORES].map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('carimbo de procedência', () => {
  const decisoes = PROJETOS.flatMap((p) => p.decisoes)

  it('toda decisão tem procedência', () => {
    expect(decisoes.length).toBeGreaterThan(0)
    for (const d of decisoes) {
      expect(d.fonte.trim().length, `"${d.rotulo.pt}" sem fonte`).toBeGreaterThan(0)
    }
  })

  it.each(decisoes)(
    'a fonte de "$rotulo.pt" cabe na margem: 20 caracteres por linha, no máximo 2',
    (d) => {
      // A margem tem 12rem = 192px, e JetBrains Mono avança 0,6em: a 16px são
      // 9,6px por caractere, logo 20 caracteres por linha. Passar disso quebra o
      // alinhamento de linha de base, que é o argumento visual inteiro.
      const linhas = d.fonte.split(String.fromCharCode(10))
      expect(linhas.length).toBeLessThanOrEqual(2)
      for (const linha of linhas) {
        expect(linha.length, `"${linha}" tem ${linha.length} caracteres`).toBeLessThanOrEqual(20)
      }
    },
  )

  it('nenhuma procedência se repete — carimbo repetido é sinal de par trocado', () => {
    const fontes = decisoes.map((d) => d.fonte)
    expect(new Set(fontes).size).toBe(fontes.length)
  })
})

describe('números', () => {
  it('todo número exibido é um número, não um adjetivo', () => {
    const numeros = EXPERIENCIA.flatMap((c) =>
      c.resultados.map((r) => r.numero).filter((n): n is string => n !== null),
    )
    expect(numeros.length).toBeGreaterThan(0)
    for (const n of numeros) {
      expect(n, `"${n}" não contém dígito`).toMatch(/\d/)
    }
  })

  it('usa separador de milhar brasileiro no texto em português', () => {
    // 1.563 e não 1,563. Um recrutador brasileiro lê "1,563" como um e meio.
    const ptInteiro = JSON.stringify(EXPERIENCIA).match(/"pt":"[^"]*"/g)?.join(' ') ?? ''
    expect(ptInteiro).not.toMatch(/\b\d{1,3},\d{3}\b/)
  })
})

/*
 * O DESIGN.md §3.1 declara "nada abaixo de 14px", e o rodapé do site linka esse
 * documento. Até aqui a regra era uma promessa: três regras a violavam ao mesmo
 * tempo — duas dicas a 13px e o selo do cartão ("NO AR") a 12px, que não é
 * decoração, é conteúdo. Regra que ninguém verifica é regra que já quebrou.
 */
describe('piso tipográfico do DESIGN.md §3.1', () => {
  const FOLHAS = ['base.css', 'componentes.css', 'tokens.css']

  it('nenhuma regra declara fonte abaixo de 14px', () => {
    const infratores: string[] = []

    for (const folha of FOLHAS) {
      const css = readFileSync(resolve(__dirname, '../../estilos', folha), 'utf8')
      const linhas = css.split('\n')

      linhas.forEach((linha, i) => {
        const rem = linha.match(/font-size:\s*([\d.]+)rem/)
        if (rem?.[1] && Number(rem[1]) * 16 < 14) {
          infratores.push(`${folha}:${i + 1} — ${Number(rem[1]) * 16}px`)
        }
        const px = linha.match(/font-size:\s*([\d.]+)px/)
        if (px?.[1] && Number(px[1]) < 14) {
          infratores.push(`${folha}:${i + 1} — ${px[1]}px`)
        }
      })
    }

    expect(infratores, `abaixo do piso de 14px:\n${infratores.join('\n')}`).toEqual([])
  })
})

/*
 * O DESIGN.md é normativo e o rodapé do site linka para ele. Oito citações
 * apontavam para seções que não existem (§2.5, §5.2, §5.5, §5.6, §6.2) e quatro
 * mandavam o leitor para "§10, item 05" quando a tabela de capítulos é a §6 —
 * três delas com o número de capítulo errado por cima. Referência quebrada num
 * documento normativo é pior que comentário nenhum: ela promete uma regra que o
 * leitor não vai achar, e ninguém percebe porque nada compila a partir dela.
 */
describe('citações ao DESIGN.md', () => {
  const raiz = resolve(__dirname, '../../..')

  it('toda seção citada existe no DESIGN.md', () => {
    const design = readFileSync(resolve(raiz, 'DESIGN.md'), 'utf8')

    const existentes = new Set(
      [...design.matchAll(/^#{2,3}\s+(\d+(?:\.\d+)?)\.?\s/gm)].map((m) => m[1]),
    )

    const arquivos = [
      'src/componentes/Botao.tsx',
      'src/componentes/Marcadores.tsx',
      'src/componentes/LinkExterno.tsx',
      'src/conteudo/projetos.ts',
      'src/estilos/tokens.css',
      'src/secoes/Colofao.tsx',
      'src/secoes/Contato.tsx',
      'src/secoes/Experiencia.tsx',
      'src/secoes/Sobre.tsx',
      'README.md',
    ]

    const quebradas: string[] = []
    for (const arq of arquivos) {
      const texto = readFileSync(resolve(raiz, arq), 'utf8')
      // Só as citações ao DESIGN.md; "WCAG 2.2 §2.5.8" não é deste documento.
      for (const m of texto.matchAll(/DESIGN\.md[^\n]*?§(\d+(?:\.\d+)?)/g)) {
        if (m[1] && !existentes.has(m[1])) quebradas.push(`${arq} → §${m[1]}`)
      }
    }

    expect(
      quebradas,
      `citam seção inexistente:\n${quebradas.join('\n')}\n` +
        `seções que existem: ${[...existentes].join(', ')}`,
    ).toEqual([])
  })
})
