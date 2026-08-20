import { useEffect } from 'react'
import type { Idioma } from './conteudo/projetos'
import { textos } from './i18n'
import { useProgressoDeLeitura } from './hooks/useProgressoDeLeitura'
import { Cabecalho } from './componentes/Cabecalho'
import { Abertura } from './secoes/Abertura'
import { Radar } from './secoes/Radar'
import { Experiencia } from './secoes/Experiencia'
import { Trilho } from './secoes/Trilho'
import { Faixa } from './secoes/Faixa'
import { Sobre } from './secoes/Sobre'
import { Contato } from './secoes/Contato'
import { Colofao } from './secoes/Colofao'



export function App({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  const progresso = useProgressoDeLeitura()

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

      <Cabecalho idioma={idioma} />

      {/* A faixa de progresso no topo, na cor do acento. Cresce por scaleX, que
          roda na composicao — nao repinta e nao recalcula layout. */}
      <div className="progresso" aria-hidden="true" />

      <main id="conteudo">
        <Abertura idioma={idioma} />
        <Faixa idioma={idioma} />
        <Radar idioma={idioma} />
        <Trilho idioma={idioma} />
        <Experiencia idioma={idioma} />
        <Sobre idioma={idioma} />
        <Contato idioma={idioma} />
      </main>

      <Colofao idioma={idioma} />
    </>
  )
}
