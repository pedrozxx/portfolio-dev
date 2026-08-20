/**
 * Projetos públicos. Fonte: github.com/pedrozxx, verificado em 20/08/2026 —
 * todas as demos responderam HTTP 200.
 *
 * `destaque` marca o carro-chefe: recebe tratamento próprio no layout, não é
 * um cartão a mais na grade. `decisoes` só existe onde há decisão de engenharia
 * documentada e verificável no README do repositório — não inventar para
 * preencher, e não repetir a descrição em outras palavras.
 */

export type Idioma = 'pt' | 'en'

/** Texto que existe nos dois idiomas. Nunca deixar um lado vazio. */
export type Bilingue = Readonly<Record<Idioma, string>>

/** Sintoma → decisão → consequência. O formato existe para caber em 20 segundos. */
export interface Decisao {
  readonly rotulo: Bilingue
  /**
   * O carimbo de procedência que vai na margem, ao lado desta decisão.
   *
   * Mora AQUI, junto da afirmação que ele sustenta, e não num array paralelo
   * indexado por posição. A primeira versão usava array paralelo e, na primeira
   * renderização no navegador, dois carimbos apareceram ao lado da decisão
   * errada — "medido: 4,4 s / 504" ao lado de "Ausência não é zero". Num site
   * cuja tese é que toda afirmação tem procedência, procedência trocada é o
   * pior defeito possível.
   *
   * Máximo 20 caracteres por linha, no máximo 2 linhas (DESIGN.md §6.2).
   */
  readonly fonte: string
  readonly sintoma: Bilingue
  readonly decisao: Bilingue
  readonly consequencia: Bilingue
}

export interface Projeto {
  readonly id: string
  readonly nome: string
  readonly destaque: boolean
  readonly resumo: Bilingue
  readonly stack: readonly string[]
  readonly repo: string
  readonly demo: string | null
  readonly imagem: string | null
  readonly alt: Bilingue
  readonly decisoes: readonly Decisao[]
}

export const PROJETOS: readonly Projeto[] = [
  {
    id: 'radar-licitacoes-pa',
    nome: 'Radar de Licitações do Pará',
    destaque: true,
    resumo: {
      pt: 'As compras públicas do estado, do jeito que o governo publica — só que possível de filtrar. Os dados vêm do PNCP, a fonte oficial, recolhidos por um job diário.',
      en: 'Public procurement in Pará, exactly as the government publishes it — only filterable. Data comes from PNCP, the official source, collected by a daily job.',
    },
    stack: ['React 19', 'TypeScript', 'Vite', 'Python 3.12', 'FastAPI', 'httpx', 'Vitest', 'pytest', 'GitHub Actions'],
    repo: 'https://github.com/pedrozxx/radar-licitacoes-pa',
    demo: 'https://pedrozxx.github.io/radar-licitacoes-pa/',
    imagem: 'radar-licitacoes-pa',
    alt: {
      pt: 'Tela do Radar de Licitações do Pará: 174 licitações, R$ 677,5 milhões em valor estimado, 38 encerrando em até 3 dias, e um aviso de que a coleta está incompleta.',
      en: 'Radar de Licitações do Pará screen: 174 tenders, R$ 677.5 million estimated value, 38 closing within 3 days, and a notice that the collection is incomplete.',
    },
    decisoes: [
      {
        rotulo: { pt: 'A origem mente', en: 'The source lies' },
        fonte: 'PNCP · 200 + HTML',
        sintoma: {
          pt: 'O limite de requisições do PNCP responde 200 OK com corpo HTML, não 429.',
          en: 'PNCP rate limiting answers 200 OK with an HTML body, not 429.',
        },
        decisao: {
          pt: 'O cliente confere o content-type antes de interpretar a resposta.',
          en: 'The client checks content-type before parsing the response.',
        },
        consequencia: {
          pt: 'Sem isso o limite chega ao usuário como erro de parse, sem pista da causa. Travado em teste.',
          en: 'Without it the limit reaches the user as a parse error with no clue why. Locked down by a test.',
        },
      },
      {
        rotulo: { pt: 'A coleta saiu do caminho', en: 'Collection left the request path' },
        fonte: 'medido: 4,4 s / 504',
        sintoma: {
          pt: 'A API é lenta (4,4 s numa consulta de 10 dias) e cai — devolveu 504 por vários minutos.',
          en: 'The API is slow (4.4 s for a 10-day query) and goes down — it returned 504 for several minutes.',
        },
        decisao: {
          pt: 'Um job diário grava um JSON e o site lê esse arquivo.',
          en: 'A daily job writes a JSON file and the site reads that file.',
        },
        consequencia: {
          pt: 'O site abre instantaneamente e continua de pé com o PNCP fora do ar.',
          en: 'The site opens instantly and stays up while PNCP is down.',
        },
      },
      {
        rotulo: { pt: 'Ausência não é zero', en: 'Absent is not zero' },
        fonte: 'soma 169 de 174',
        sintoma: {
          pt: 'O PNCP manda null e 0 para "valor não informado".',
          en: 'PNCP sends null and 0 for "amount not reported".',
        },
        decisao: {
          pt: 'Vira null e aparece como "não informado" — nunca R$ 0,00.',
          en: 'It becomes null and shows as "not reported" — never R$ 0.00.',
        },
        consequencia: {
          pt: 'O total diz quantos registros entraram na conta: soma 169 de 174, o PNCP não informou valor em 5.',
          en: 'The total states how many records it covers: 169 of 174 summed, PNCP reported no value for 5.',
        },
      },
      {
        rotulo: { pt: 'Orçamento de tempo', en: 'Time budget' },
        fonte: 'README · orçamento',
        sintoma: {
          pt: 'O tempo total de uma coleta é imprevisível: depende de quantas modalidades respondem.',
          en: 'The total time of a collection is unpredictable: it depends on how many modalities answer.',
        },
        decisao: {
          pt: 'buscar() recebe um orçamento de tempo; se estourar, devolve o que tem e marca truncado.',
          en: 'buscar() takes a time budget; if it runs out, it returns what it has and flags it as truncated.',
        },
        consequencia: {
          pt: 'A interface avisa que a lista está incompleta em vez de fingir que é a lista inteira.',
          en: 'The interface says the list is incomplete instead of pretending it is the whole list.',
        },
      },
    ],
  },
] as const
