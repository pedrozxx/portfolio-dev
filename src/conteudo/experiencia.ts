/**
 * Experiência profissional. Fonte: currículo de Pedro Augusto Darolt.
 *
 * Regra que não se quebra: os sistemas da Norte Geradores são ferramentas
 * internas — o código é fechado e não existe link público. Aqui eles são
 * narrados com número e período, nunca apresentados como cartão com botão
 * "ver código" ou "abrir demo". Nenhum número neste arquivo pode ser estimado:
 * cada um está no currículo e é sustentável numa entrevista.
 */

import type { Bilingue } from './projetos'

/** Uma linha de resultado. `numero` só existe quando há número real. */
export interface Resultado {
  readonly numero: string | null
  readonly texto: Bilingue
}

export interface Cargo {
  readonly empresa: string
  readonly cargo: Bilingue
  readonly local: string
  readonly periodo: Bilingue
  /**
   * Por que não há link de código nesta entrada — na palavra certa para ESTA
   * entrada, não uma frase genérica repetida nas três.
   *
   * `null` quando a pergunta nem se coloca: o cargo na Sea Telecom era de
   * infraestrutura, não de desenvolvimento, e explicar ali a ausência de
   * repositório sugeriria que deveria haver um.
   */
  readonly semLink: Bilingue | null
  readonly resultados: readonly Resultado[]
}

export const EXPERIENCIA: readonly Cargo[] = [
  {
    empresa: 'Norte Geradores',
    cargo: {
      pt: 'Estagiário de Desenvolvimento de Software',
      en: 'Software Development Intern',
    },
    local: 'Benevides, PA',
    periodo: { pt: 'jun. 2026 – atual', en: 'Jun 2026 – present' },
    semLink: {
      pt: 'Sistema interno da empresa — código fechado, sem link público. Descrevo a arquitetura em entrevista.',
      en: 'Internal company system — closed code, no public link. I walk through the architecture in an interview.',
    },
    resultados: [
      {
        numero: null,
        texto: {
          pt: 'Construí o BI comercial integrando a API do CRM — faturamento, projeção mensal, comparativo ano a ano e alertas automáticos. A diretoria adotou como fonte oficial de acompanhamento.',
          en: 'Built the company sales BI on top of the CRM API — revenue, monthly projection, year-over-year comparison and automated alerts. Leadership adopted it as the official source of truth.',
        },
      },
      {
        numero: '1.563 → 93',
        texto: {
          pt: 'Refatorei o front-end da landing page de captação: o componente principal caiu de 1.563 para 93 linhas.',
          en: 'Refactored the lead-capture landing page front-end: the main component went from 1,563 lines to 93.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Corrigi uma falha de rate limiting que expunha o formulário a envios em massa.',
          en: 'Fixed a rate-limiting flaw that left the form open to mass submissions.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Consolidei painéis de BI duplicados em uma ferramenta única, eliminando a divergência de números entre áreas.',
          en: 'Consolidated duplicated BI dashboards into a single tool, ending the number mismatch between departments.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Desenvolvi a ferramenta de prospecção que consolida bases públicas (PNCP, Google Places, Receita Federal) em React + FastAPI, substituindo a pesquisa manual do time comercial.',
          en: 'Built the prospecting tool that consolidates public datasets (PNCP, Google Places, Receita Federal) in React + FastAPI, replacing the sales team manual research.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Implementei um agente de compras com aprovação por alçada e bot no Telegram, padronizando requisição e cotação.',
          en: 'Implemented a procurement agent with tiered approval and a Telegram bot, standardising requests and quotes.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Faço deploy e sustentação em servidor Linux — systemd, Cloudflare Tunnel, UFW — com Git, pull requests e code review.',
          en: 'I deploy and maintain on a Linux server — systemd, Cloudflare Tunnel, UFW — with Git, pull requests and code review.',
        },
      },
    ],
  },
  {
    empresa: 'Link Jr',
    cargo: {
      pt: 'Desenvolvedor Front-End · Empresa Júnior',
      en: 'Front-End Developer · Junior Enterprise',
    },
    local: 'Castanhal, PA',
    periodo: { pt: 'set. 2024 – nov. 2025', en: 'Sep 2024 – Nov 2025' },
    semLink: {
      pt: 'Projetos entregues pela empresa júnior — o código não fica comigo.',
      en: 'Projects delivered by the junior enterprise — the code is not mine to publish.',
    },
    resultados: [
      {
        numero: null,
        texto: {
          pt: 'Construí interfaces em React.js consumindo APIs REST, e atuei no back-end com Node.js/Express e MongoDB quando o projeto exigia.',
          en: 'Built React.js interfaces consuming REST APIs, and worked on the back end with Node.js/Express and MongoDB when the project called for it.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Publiquei aplicações na Vercel e no Heroku, com deploy automatizado a partir do GitHub.',
          en: 'Shipped applications to Vercel and Heroku, with deployment automated from GitHub.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Trabalhei em equipe com Scrum e Kanban, versionamento Git e revisão de código entre colegas.',
          en: 'Worked in a team using Scrum and Kanban, Git versioning and peer code review.',
        },
      },
    ],
  },
  {
    empresa: 'Sea Telecom',
    cargo: {
      pt: 'Estagiário de Infraestrutura',
      en: 'Infrastructure Intern',
    },
    local: 'Castanhal, PA',
    periodo: { pt: 'ago. 2024 – jul. 2025', en: 'Aug 2024 – Jul 2025' },
    // Cargo de infraestrutura, não de desenvolvimento: não havia repositório a
    // publicar, e dizer "código fechado" aqui inventaria um software que não existiu.
    semLink: null,
    resultados: [
      {
        numero: '+25%',
        texto: {
          pt: 'Estruturei e mantive planilhas de controle em Excel, elevando em 25% a precisão dos dados operacionais.',
          en: 'Structured and maintained Excel control sheets, raising operational data accuracy by 25%.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Apoiei a equipe técnica em campo e no controle de clientes, com vivência prática em redes e fibra óptica.',
          en: 'Supported the field technical team and customer records, with hands-on exposure to networking and fibre optics.',
        },
      },
      {
        numero: null,
        texto: {
          pt: 'Participei de testes e homologação de novos softwares antes da adoção pela operação.',
          en: 'Took part in testing and sign-off of new software before operations adopted it.',
        },
      },
    ],
  },
] as const
