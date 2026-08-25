/**
 * Projetos publicados menores. Fonte: github.com/pedrozxx.
 * Todas as demos verificadas com HTTP 200 em 20/08/2026.
 *
 * Estes NÃO recebem cartão com captura de tela grande. A auditoria de triagem foi
 * direta: Conversor, Agenda Pet Shop, Portal de Notícias e Sorteador são os mesmos
 * quatro exercícios de trilha que aparecem em dezenas de portfólios, e gastar
 * 156 px de imagem em cada um empurra o carro-chefe para fora da dobra. Entram
 * como lista compacta — uma linha cada, com demo e código — porque volume de
 * projeto publicado é sinal, mas não é o argumento.
 *
 * Repositórios de estudo e forks de 2024 ficam de fora: estão no GitHub, e o link
 * para o perfil dá conta deles.
 */

import type { Bilingue } from './projetos'

export interface ProjetoMenor {
  readonly id: string
  readonly nome: Bilingue
  readonly resumo: Bilingue
  readonly stack: readonly string[]
  readonly repo: string
  readonly demo: string | null
}

export const PROJETOS_MENORES: readonly ProjetoMenor[] = [
  {
    id: 'conversor-de-valor',
    nome: { pt: 'Conversor de Valor', en: 'Currency Converter' },
    resumo: {
      pt: 'Cotação real via API, com cache de 24 h em localStorage para não repetir chamada à toa.',
      en: 'Live rates from an API, cached for 24 h in localStorage to avoid pointless calls.',
    },
    stack: ['JavaScript', 'API REST', 'localStorage'],
    repo: 'https://github.com/pedrozxx/conversor-de-valor',
    demo: 'https://conversor-de-valor.vercel.app',
  },
  {
    id: 'mundo-pet',
    nome: { pt: 'Agenda Pet Shop', en: 'Pet Shop Scheduler' },
    resumo: {
      pt: 'Validação de campos, bloqueio de conflito de horário e tema claro/escuro.',
      en: 'Field validation, time-slot conflict blocking and a light/dark theme.',
    },
    stack: ['JavaScript', 'CSS', 'a11y'],
    repo: 'https://github.com/pedrozxx/Mundo-Pet',
    demo: 'https://pedrozxx.github.io/Mundo-Pet/',
  },
  {
    id: 'portal-de-noticias',
    nome: { pt: 'Portal de Notícias', en: 'News Portal' },
    resumo: {
      pt: 'Layout editorial responsivo construído em CSS Grid, com destaque e grade de matérias.',
      en: 'Responsive editorial layout built on CSS Grid, with a lead story and an article grid.',
    },
    stack: ['HTML', 'CSS Grid'],
    repo: 'https://github.com/pedrozxx/Portal-de-noticias',
    demo: 'https://pedrozxx.github.io/Portal-de-noticias/',
  },
  {
    id: 'sorteador',
    nome: { pt: 'Sorteador de Números', en: 'Number Draw' },
    resumo: {
      pt: 'Sorteio num intervalo definido pelo usuário, com validação e opção de repetição.',
      en: 'Draws numbers within a user-defined range, with validation and an optional repeat.',
    },
    stack: ['JavaScript'],
    repo: 'https://github.com/pedrozxx/sorteador-de-numeros-rocketseat',
    demo: 'https://pedrozxx.github.io/sorteador-de-numeros-rocketseat/',
  },
  {
    id: 'clube-de-assinatura',
    nome: { pt: 'Clube de Assinatura', en: 'Subscription Club' },
    resumo: {
      pt: 'Landing page feita para praticar animação e transição em CSS.',
      en: 'A landing page built to practise CSS animation and transitions.',
    },
    stack: ['HTML', 'CSS'],
    repo: 'https://github.com/pedrozxx/clube-de-assinatura',
    demo: 'https://pedrozxx.github.io/clube-de-assinatura/',
  },
  {
    id: 'flappy-bird-pi',
    nome: { pt: 'Flappy Bird', en: 'Flappy Bird' },
    resumo: {
      pt: 'Recriado em Python com Pygame — projeto integrador de Sistemas de Informação na UFPA.',
      en: 'Rebuilt in Python with Pygame — integrative project for the Information Systems course at UFPA.',
    },
    stack: ['Python', 'Pygame'],
    repo: 'https://github.com/pedrozxx/flappy-bird-PI',
    demo: null,
  },
] as const
