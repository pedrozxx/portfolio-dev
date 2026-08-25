import { useEffect, useState } from 'react'
import type { Idioma } from '../conteudo/projetos'
import { textos } from '../i18n'
import { aplicarTema, lerTema, temaEfetivo } from '../tema'
import { BotaoLink } from './Botao'
import { home, publico } from '../caminhos'

const AVATAR = import.meta.glob<string>('../assets/pedro.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/**
 * Cabeçalho fixo.
 *
 * Minimalista de propósito, como o do site de referência: retrato e nome à
 * esquerda, alternadores e UM botão em pílula à direita. Não há navegação de
 * capítulos.
 *
 * Duas razões, e a segunda foi medida. A primeira: a página é uma passagem, não
 * um documento de consulta — o gesto que ela pede é rolar, e um índice no topo
 * convida a pular justamente a sequência que é o argumento. A segunda: com os
 * cinco capítulos, a barra somava mais que a largura do contêiner e quebrava em
 * duas linhas, cobrindo o título do hero. O botão é o alvo do recrutador e nunca
 * pode ser o que cede espaço.
 */

interface Props {
  readonly idioma: Idioma
}

export function Cabecalho({ idioma }: Props) {
  const t = textos(idioma)
  const [rolou, setRolou] = useState(false)

  // O fio embaixo do cabeçalho só aparece quando há conteúdo passando por baixo.
  // No topo da página ele seria uma linha atravessando o hero sem motivo.
  useEffect(() => {
    const medir = () => setRolou(window.scrollY > 8)
    medir()
    window.addEventListener('scroll', medir, { passive: true })
    return () => window.removeEventListener('scroll', medir)
  }, [])

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

  return (
    <header className="cabecalho" data-rolou={rolou ? 'sim' : 'nao'}>
      <div className="cabecalho__interno container">
        <a href="#topo" className="cabecalho__marca">
          <picture>
            <source type="image/avif" srcSet={AVATAR['../assets/pedro.avif']} />
            <img
              src={AVATAR['../assets/pedro.webp']}
              alt=""
              width={36}
              height={36}
              className="cabecalho__avatar"
            />
          </picture>
          <span>PEDRO A. DAROLT</span>
        </a>

        <div className="cabecalho__acoes cabecalho__acoes--fim">
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
