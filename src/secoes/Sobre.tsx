import type { Idioma } from '../conteudo/projetos'
import { textos } from '../i18n'
import { Capitulo } from './Capitulo'

/**
 * Capítulo 04 — Sobre (DESIGN.md §10, item 05).
 *
 * A stack é um <dl> de verdade, não uma nuvem de logos: é a superfície de Ctrl+F
 * e de ATS, e é assim que um robô de triagem encontra "FastAPI".
 *
 * Aqui morre a antiga seção "Serviços". Ela gastava uma tela inteira repetindo os
 * chips do hero, e o enquadramento — "como posso contribuir com o seu time",
 * três cartões de tecnologia — soa a prestador com tabela de preços. Sobra
 * "O que eu posso assumir", em três linhas de texto, sem ícone e sem cartão.
 *
 * Zero barra de proficiência: porcentagem inventada destrói exatamente o
 * argumento de rigor que o resto da página constrói.
 */

const STACK = [
  {
    rotulo: { pt: 'Linguagens', en: 'Languages' },
    itens: 'JavaScript · TypeScript · Python · SQL · HTML5 · CSS3',
  },
  {
    rotulo: { pt: 'Front-end', en: 'Front-end' },
    itens: 'React.js · Next.js · Vite · Tailwind CSS · Styled Components · responsividade · acessibilidade',
    itensEn: 'React.js · Next.js · Vite · Tailwind CSS · Styled Components · responsive design · accessibility',
  },
  {
    rotulo: { pt: 'Back-end e dados', en: 'Back-end and data' },
    itens: 'Node.js · Express.js · FastAPI · Streamlit · APIs REST · autenticação · MongoDB · Pandas',
    itensEn: 'Node.js · Express.js · FastAPI · Streamlit · REST APIs · authentication · MongoDB · Pandas',
  },
  {
    rotulo: { pt: 'DevOps', en: 'DevOps' },
    itens: 'Git · GitHub · GitHub Actions · Vercel · Heroku · Linux (systemd) · Nginx · Cloudflare Tunnel',
  },
  {
    rotulo: { pt: 'Práticas', en: 'Practices' },
    itens: 'Clean Code · SOLID · Scrum · Kanban · pull requests · code review · testes',
    itensEn: 'Clean Code · SOLID · Scrum · Kanban · pull requests · code review · testing',
  },
] as const

const FORMACAO = [
  {
    curso: { pt: 'Bacharelado em Sistemas de Informação', en: 'BSc in Information Systems' },
    instituicao: 'Universidade Federal do Pará (UFPA)',
    periodo: { pt: 'ago. 2022 – dez. 2027 (previsão)', en: 'Aug 2022 – Dec 2027 (expected)' },
    carimbo: 'UFPA · Castanhal',
  },
  {
    curso: { pt: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', en: 'Technologist in Systems Analysis and Development' },
    instituicao: 'Estácio',
    periodo: { pt: 'fev. 2026 – dez. 2028 (previsão)', en: 'Feb 2026 – Dec 2028 (expected)' },
    carimbo: { pt: 'semipresencial', en: 'blended' },
  },
] as const

const CERTIFICACOES = [
  { nome: 'Rocketseat — Engenharia de Prompt', ano: '2026' },
  { nome: 'Rocketseat — Introdução ao Node.js', ano: '2025' },
  { nome: 'Rocketseat — JavaScript', ano: '2025' },
  { nome: 'DevClub — Programação Full-Stack', ano: '2024' },
] as const

export function Sobre({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)

  return (
    <Capitulo
      id="sobre"
      numero="04"
      sobrancelha={idioma === 'pt' ? 'STACK · FORMAÇÃO · IDIOMAS' : 'STACK · EDUCATION · LANGUAGES'}
      titulo={t.secaoSobre}
    >
      <p className="sobre__texto">
        {idioma === 'pt' ? (
          <>
            Estudo Sistemas de Informação na UFPA, em Castanhal, e trabalho como estagiário de
            desenvolvimento na Norte Geradores. Comecei pelo front-end na Link Jr, empresa júnior, onde
            entreguei projetos em time, com Scrum, Kanban e revisão de código entre colegas. Hoje faço o
            ciclo completo — interface, API, banco e servidor — e sustento o que coloco no ar.
            Português nativo. Sobre o inglês: esta página inteira também existe em inglês, a um
            clique — é mais fácil conferir do que acreditar.
          </>
        ) : (
          <>
            I study Information Systems at UFPA, in Castanhal, and work as a development intern at Norte
            Geradores. I started on the front end at Link Jr, a junior enterprise, where I delivered
            projects in a team using Scrum, Kanban and peer code review. Today I handle the
            full cycle — interface, API, database and server — and maintain what I put live.
            Native Portuguese. As for English: you are reading it — this whole page exists in
            English too, and checking beats claiming.
          </>
        )}
      </p>

      <dl className="sobre__stack">
        {/*
          Numa lista de definição o <dt> PRECISA vir antes do <dd>: é o que a
          especificação exige, e é também a ordem de leitura correta aqui — o
          rótulo é a chave, não a procedência de uma afirmação. A posição visual
          continua sendo decidida por grid-column, então o rótulo aparece na
          margem esquerda sem que a ordem no DOM mude.
        */}
        {STACK.map((linha) => (
          <div className="sobre__linha" key={linha.rotulo.pt}>
            <dt className="sobre__rotulo">{linha.rotulo[idioma]}</dt>
            <dd className="sobre__itens">
              {idioma === 'en' && 'itensEn' in linha ? linha.itensEn : linha.itens}
            </dd>
          </div>
        ))}
      </dl>

      <h3 className="sobre__sub">{idioma === 'pt' ? 'O que eu posso assumir' : 'What I can take on'}</h3>
      <ul className="sobre__assumir">
        <li>
          {idioma === 'pt'
            ? 'Construir e manter tela em React com consumo de API, responsividade e acessibilidade.'
            : 'Build and maintain React screens consuming APIs, responsive and accessible.'}
        </li>
        <li>
          {idioma === 'pt'
            ? 'Escrever endpoint em Node.js/Express ou Python/FastAPI, integrar serviço de terceiro e tratar o que ele devolve errado.'
            : 'Write endpoints in Node.js/Express or Python/FastAPI, integrate third-party services and handle what they return wrong.'}
        </li>
        <li>
          {idioma === 'pt'
            ? 'Colocar no ar e sustentar: build, deploy em Linux ou Vercel, e acompanhar o que quebra depois.'
            : 'Ship and maintain: build, deploy to Linux or Vercel, and follow what breaks afterwards.'}
        </li>
      </ul>

      <h3 className="sobre__sub">{t.secaoFormacao}</h3>
      <dl className="sobre__stack sobre__formacao">
        {FORMACAO.map((f) => (
          <div className="sobre__linha" key={f.instituicao}>
            <dt className="sobre__rotulo">
              {typeof f.carimbo === 'string' ? f.carimbo : f.carimbo[idioma]}
            </dt>
            <dd>
              <span className="sobre__curso">{f.curso[idioma]}</span>
              <span className="sobre__instituicao mono">
                {f.instituicao} · {f.periodo[idioma]}
              </span>
            </dd>
          </div>
        ))}
        {CERTIFICACOES.map((c) => (
          <div className="sobre__linha" key={c.nome}>
            <dt className="sobre__rotulo">{c.ano}</dt>
            <dd className="sobre__itens">{c.nome}</dd>
          </div>
        ))}
      </dl>
    </Capitulo>
  )
}
