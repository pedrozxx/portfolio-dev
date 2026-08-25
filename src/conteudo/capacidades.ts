/**
 * Os três capítulos numerados que abrem a página, no lugar das três seções de
 * serviço do site de referência.
 *
 * Diferença que importa: lá são ofertas de um freelancer; aqui são capacidades
 * de um candidato. Nenhuma delas promete trabalho — todas descrevem trabalho
 * feito, e cada uma cita o que a sustenta.
 *
 * Regra de admissão, a mesma do resto do site: **nada entra aqui sem estar no
 * dossiê**. Foi por isso que o terceiro capítulo é "sites e landing pages" e não
 * "e-commerce": não há um único projeto de loja, checkout ou pagamento no
 * histórico do Pedro, e inventar capacidade num site de contratação é o defeito
 * que estoura na primeira entrevista técnica.
 */

import type { Bilingue } from './projetos'

export interface Capacidade {
  readonly id: string
  readonly numero: string
  readonly sobrancelha: Bilingue
  /** Curto, uma frase com ponto: vai em Sora 700, no tamanho de display. */
  readonly titulo: Bilingue
  readonly texto: Bilingue
  readonly stack: readonly string[]
  /** Qual composição de DESIGN.md §6.2 desenha o mecanismo deste capítulo. */
  readonly figura: 'camadas' | 'alcada' | 'captacao'
  /**
   * De que lado a figura fica acima de 1024px. Pedido do autor: 01 e 02 com a
   * figura à esquerda e o texto à direita; 03 ao contrário. A alternância vai
   * para a ordem do DOM, não para `order` (banido em §11).
   */
  readonly lado: 'esquerda' | 'direita'
}

export const CAPACIDADES: readonly Capacidade[] = [
  {
    id: 'aplicacoes',
    numero: '01',
    sobrancelha: { pt: 'APLICAÇÕES WEB', en: 'WEB APPLICATIONS' },
    titulo: { pt: 'Ponta a ponta.', en: 'End to end.' },
    texto: {
      pt: 'Interface, API, banco e deploy. Os painéis internos que construí na Norte Geradores são abertos todo dia pelas áreas comercial, de compras e de operações — o BI comercial virou a fonte oficial de acompanhamento da diretoria. Quando o front-end pesa, eu corto: o componente principal da landing de captação caiu de 1.563 para 93 linhas.',
      en: 'Interface, API, database and deployment. The internal dashboards I built at Norte Geradores are opened every day by the sales, procurement and operations teams — the sales BI became leadership’s official source of truth. When the front end gets heavy, I cut: the lead-capture landing page’s main component went from 1,563 lines to 93.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'FastAPI'],
    figura: 'camadas',
    lado: 'esquerda',
  },
  {
    id: 'ia',
    numero: '02',
    sobrancelha: { pt: 'IA EM PRODUÇÃO', en: 'AI IN PRODUCTION' },
    titulo: { pt: 'IA com alçada.', en: 'AI with a leash.' },
    texto: {
      pt: 'Integro APIs de IA — Anthropic e Google Gemini — dentro de automações que já rodavam. O agente de compras propõe, nunca decide sozinho: cada requisição passa por aprovação por alçada e sai registrada, com um bot no Telegram avisando quem precisa aprovar. Modelo que age sem trilha de aprovação não é automação, é risco.',
      en: 'I integrate AI APIs — Anthropic and Google Gemini — inside automations that were already running. The procurement agent proposes, never decides on its own: every request goes through tiered approval and is logged, with a Telegram bot notifying whoever needs to approve. A model that acts with no approval trail is not automation, it is risk.',
    },
    stack: ['Anthropic', 'Google Gemini', 'Python', 'Telegram Bot'],
    figura: 'alcada',
    lado: 'esquerda',
  },
  {
    id: 'sites',
    numero: '03',
    sobrancelha: { pt: 'SITES E LANDING PAGES', en: 'WEBSITES & LANDING PAGES' },
    titulo: { pt: 'Páginas que captam.', en: 'Pages that convert.' },
    texto: {
      pt: 'A landing de captação de leads da Norte está no ar em React e Express. Além de reescrever o front-end dela, corrigi uma falha de rate limiting que deixava o formulário aberto a envios em massa — formulário público sem limite não é bug de conforto, é porta aberta. Fora do trabalho, layout editorial em CSS Grid e páginas de estudo com animação.',
      en: 'Norte’s lead-capture landing page is live, in React and Express. Beyond rewriting its front end, I fixed a rate-limiting flaw that left the form open to mass submissions — an unthrottled public form is not a comfort bug, it is an open door. Outside work, editorial layouts in CSS Grid and study pages with animation.',
    },
    stack: ['React', 'Express', 'CSS Grid', 'Acessibilidade'],
    figura: 'captacao',
    lado: 'direita',
  },
] as const
