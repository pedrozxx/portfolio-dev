import { useEffect } from 'react'
import type { Idioma } from './conteudo/projetos'
import { textos } from './i18n'
import { useProgressoDeLeitura } from './hooks/useProgressoDeLeitura'
import { useCapituloAtual } from './hooks/useCapituloAtual'
import { Cabecalho, CAPITULOS } from './componentes/Cabecalho'
import { Abertura } from './secoes/Abertura'
import { Radar } from './secoes/Radar'
import { Experiencia } from './secoes/Experiencia'
import { Projetos } from './secoes/Projetos'
import { Sobre } from './secoes/Sobre'
import { Contato } from './secoes/Contato'
import { Colofao } from './secoes/Colofao'

const IDS = CAPITULOS.map((c) => c.id)

export function App({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  const progresso = useProgressoDeLeitura()
  const capituloAtual = useCapituloAtual(IDS)

  // O progresso vai para o CSS como custom property e é pintado com
  // `transform: scaleY()`, que roda na composição. Escrever no elemento raiz
  // evita passar o valor por dezenas de componentes e evita re-render por quadro.
  useEffect(() => {
    document.documentElement.style.setProperty('--progresso', String(progresso))
  }, [progresso])

  return (
    <>
      {/* O skip link é o primeiro elemento focável da página: quem navega por
          teclado não deveria atravessar cinco âncoras de capítulo toda vez. */}
      <a href="#conteudo" className="pular">
        {t.pularParaConteudo}
      </a>

      <Cabecalho idioma={idioma} capituloAtual={capituloAtual} />

      {/* A Margem de Procedencia: o fio da margem do documento E o indicador de
          leitura, no mesmo objeto. Nao ha barra horizontal no topo da pagina. */}
      <div className="margem-pagina" aria-hidden="true" />

      <main id="conteudo">
        <Abertura idioma={idioma} />
        <Radar idioma={idioma} />
        <Experiencia idioma={idioma} />
        <Projetos idioma={idioma} />
        <Sobre idioma={idioma} />
        <Contato idioma={idioma} />
      </main>

      <Colofao idioma={idioma} />
    </>
  )
}
