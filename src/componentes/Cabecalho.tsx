import type { Idioma } from '../conteudo/projetos'
import { textos } from '../i18n'
import { aplicarTema, lerTema, temaEfetivo } from '../tema'
import { BotaoLink } from './Botao'
import { home, publico } from '../caminhos'

/**
 * Cabeçalho fixo (DESIGN.md §5.1).
 *
 * A navegação abaixo de 900px é um <details>/<summary> NATIVO: zero JavaScript,
 * zero armadilha de foco, zero menu inventado. O navegador já sabe abrir, fechar,
 * receber foco, responder ao Esc e anunciar o estado — um menu feito à mão erra
 * pelo menos uma dessas quatro coisas.
 */

export const CAPITULOS = [
  { id: 'radar', numero: '01' },
  { id: 'experiencia', numero: '02' },
  { id: 'projetos', numero: '03' },
  { id: 'sobre', numero: '04' },
  { id: 'contato', numero: '05' },
] as const

interface Props {
  readonly idioma: Idioma
  readonly capituloAtual: string | null
}

export function Cabecalho({ idioma, capituloAtual }: Props) {
  const t = textos(idioma)

  /*
   * O tema não entra no render — nem para escolher o rótulo do botão.
   *
   * A primeira versão calculava o rótulo com `matchMedia` durante o render. No
   * servidor não há `window`, então o pré-render escrevia "escuro"; no cliente,
   * numa máquina com preferência escura, o primeiro render escrevia "claro". O
   * build de produção acusou: React error #418, divergência de texto na
   * hidratação, no console — e console sujo é a primeira coisa que um revisor
   * técnico abre.
   *
   * Agora os dois rótulos são renderizados e o CSS mostra o que vale, pela mesma
   * regra de tema que pinta a página. Sai a divergência, e sai também a piscada:
   * o rótulo já nasce certo na primeira pintura, porque o script inline no
   * <head> escreve `data-tema` antes dela.
   */
  function alternarTema() {
    // Lido no clique, nunca no render: aqui não existe servidor com quem divergir.
    const atual = temaEfetivo(lerTema())
    aplicarTema(atual === 'escuro' ? 'claro' : 'escuro')
  }

  const nomes: Record<string, { pt: string; en: string }> = {
    radar: { pt: 'Radar', en: 'Radar' },
    experiencia: { pt: 'Experiência', en: 'Experience' },
    projetos: { pt: 'Projetos', en: 'Projects' },
    sobre: { pt: 'Sobre', en: 'About' },
    contato: { pt: 'Contato', en: 'Contact' },
  }

  const links = CAPITULOS.map((c) => (
    <li key={c.id}>
      <a
        href={`#${c.id}`}
        className="cabecalho__ancora"
        {...(capituloAtual === c.id ? { 'aria-current': 'true' as const } : {})}
      >
        <span className="cabecalho__numero" aria-hidden="true">
          {c.numero}
        </span>
        {nomes[c.id]?.[idioma]}
      </a>
    </li>
  ))

  return (
    <header className="cabecalho">
      <div className="cabecalho__interno container">
        <a href="#topo" className="cabecalho__marca mono">
          PEDRO A. DAROLT
        </a>

        <nav className="cabecalho__nav" aria-label={idioma === 'pt' ? 'Capítulos' : 'Chapters'}>
          <ul className="cabecalho__lista">{links}</ul>
        </nav>

        <details className="cabecalho__menu">
          <summary className="mono">{idioma === 'pt' ? 'Capítulos' : 'Chapters'}</summary>
          <nav aria-label={idioma === 'pt' ? 'Capítulos' : 'Chapters'}>
            <ul className="cabecalho__lista cabecalho__lista--vertical">{links}</ul>
          </nav>
        </details>

        <div className="cabecalho__acoes">
          <nav className="alternador mono" aria-label={idioma === 'pt' ? 'Idioma' : 'Language'}>
            {/*
              O idioma corrente não é link — é texto com aria-current. Três
              portadores no ativo: aria-current, peso 500 e a cor da tinta contra
              a tinta fraca do inativo. Nunca bandeira: bandeira é país, não
              idioma, e nenhuma delas significa "português do Brasil".
            */}
            {idioma === 'pt' ? (
              <span aria-current="true" className="alternador__ativo">PT</span>
            ) : (
              <a href={home('pt')}>PT</a>
            )}
            <span aria-hidden="true"> · </span>
            {idioma === 'en' ? (
              <span aria-current="true" className="alternador__ativo">EN</span>
            ) : (
              <a href={home('en')}>EN</a>
            )}
          </nav>

          <button type="button" className="alternador__tema mono" onClick={alternarTema}>
            {/* `display: none` tira o ramo inativo da árvore de acessibilidade,
                então o nome do botão é sempre o da frase visível — nunca as duas. */}
            <span className="tema--no-claro">
              <span className="sr-only">{t.trocarParaEscuro}</span>
              <span aria-hidden="true">{t.temaEscuro}</span>
            </span>
            <span className="tema--no-escuro">
              <span className="sr-only">{t.trocarParaClaro}</span>
              <span aria-hidden="true">{t.temaClaro}</span>
            </span>
          </button>

          <BotaoLink
            tipo="primario"
            href={publico(t.arquivoCurriculo)}
            download
            aria-label={t.ctaCurriculo}
          >
            {t.ctaCurriculoCurto}
          </BotaoLink>
        </div>
      </div>
    </header>
  )
}
