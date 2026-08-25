/**
 * Textos da interface. O conteúdo factual mora em src/conteudo/ — aqui ficam só
 * rótulo, título de seção e microcópia.
 *
 * Não há biblioteca de i18n: são dois idiomas, textos fixos, e cada idioma é um
 * arquivo HTML próprio. Um objeto tipado resolve, e o TypeScript reclama se
 * alguém adicionar uma chave em português e esquecer o inglês — que é
 * exatamente a garantia que uma biblioteca daria aqui, sem os 40 KB.
 */

import type { Idioma } from './conteudo/projetos'

const PT = {
  htmlLang: 'pt-BR',
  pularParaConteudo: 'Pular para o conteúdo',
  trocarIdioma: 'View in English',
  trocarIdiomaCurto: 'EN',
  urlOutroIdioma: 'en/',
  temaClaro: 'claro',
  temaEscuro: 'escuro',
  // O texto na tela é curto porque o cabeçalho é apertado; o nome acessível é a
  // frase inteira, senão o leitor de tela anuncia só "botão, claro".
  trocarParaClaro: 'Mudar para o tema claro',
  trocarParaEscuro: 'Mudar para o tema escuro',

  cargo: 'Desenvolvedor de software',
  nivel: 'Estágio ou júnior',
  lugar: 'Castanhal · Belém · remoto (UTC−3)',

  ctaCurriculo: 'Baixar currículo (PDF)',
  // No cabeçalho o rótulo é curto: medido, os cinco capítulos mais o alternador
  // mais o CTA longo somam 1.162px num contêiner de 1.152px, e os itens
  // colidiam. O botão é o alvo do recrutador — quem cede espaço é o texto dele,
  // nunca o botão.
  ctaCurriculoCurto: 'Currículo (PDF)',
  arquivoCurriculo: 'Pedro_Augusto_Curriculo.pdf',
  ctaGithub: 'Ver o GitHub',

  secaoProjetos: 'Projetos',
  secaoExperiencia: 'Experiência',
  secaoSobre: 'Sobre',
  secaoFormacao: 'Formação',
  secaoContato: 'Contato',
  secaoMaisProjetos: 'Também publicados',

  abrirDemo: 'Abrir o site',
  verCodigo: 'Ver o código',
  lerReadme: 'Ler o README completo',
  codigoFechado: 'Sistema interno da empresa — o código é fechado e não há link público.',

  fonteDoDado: 'fonte',
  copiarEmail: 'Copiar o e-mail',
  emailCopiado: 'E-mail copiado',
  falarWhatsapp: 'Chamar no WhatsApp',
  mensagemWhatsapp: 'Oi, Pedro! Vi seu portfólio e queria conversar sobre uma vaga.',

  rodapeColofao: 'Medidas desta página',
} as const

/**
 * O tipo vem do portugues. Se alguem acrescentar uma chave em PT e esquecer o EN,
 * `satisfies Chaves` quebra o build — nao vai para producao um rotulo em portugues
 * no meio da pagina em ingles.
 */
type Chaves = Record<keyof typeof PT, string>

const EN = {
  htmlLang: 'en',
  pularParaConteudo: 'Skip to content',
  trocarIdioma: 'Ver em português',
  trocarIdiomaCurto: 'PT',
  urlOutroIdioma: '../',
  temaClaro: 'light',
  temaEscuro: 'dark',
  trocarParaClaro: 'Switch to the light theme',
  trocarParaEscuro: 'Switch to the dark theme',

  cargo: 'Software developer',
  nivel: 'Intern or junior',
  lugar: 'Castanhal · Belém · remote (UTC−3)',

  ctaCurriculo: 'Download résumé (PDF)',
  ctaCurriculoCurto: 'Résumé (PDF)',
  arquivoCurriculo: 'Pedro_Augusto_Resume.pdf',
  ctaGithub: 'View GitHub',

  secaoProjetos: 'Projects',
  secaoExperiencia: 'Experience',
  secaoSobre: 'About',
  secaoFormacao: 'Education',
  secaoContato: 'Contact',
  secaoMaisProjetos: 'Also published',

  abrirDemo: 'Open the site',
  verCodigo: 'View the code',
  lerReadme: 'Read the full README',
  codigoFechado: 'Internal company system — the code is closed and there is no public link.',

  fonteDoDado: 'source',
  copiarEmail: 'Copy the e-mail',
  emailCopiado: 'E-mail copied',
  falarWhatsapp: 'Message on WhatsApp',
  mensagemWhatsapp: 'Hi Pedro! I saw your portfolio and would like to talk about a role.',

  rodapeColofao: 'This page, measured',
} as const satisfies Chaves

export const TEXTOS = { pt: PT, en: EN } as const satisfies Record<Idioma, Chaves>

export type Textos = (typeof TEXTOS)[Idioma]

export function textos(idioma: Idioma): Textos {
  return TEXTOS[idioma]
}
