import type { Idioma } from './conteudo/projetos'
import { textos } from './i18n'
import { useProgressoDeLeitura } from './hooks/useProgressoDeLeitura'
import { Cabecalho } from './componentes/Cabecalho'
import { Abertura } from './secoes/Abertura'
import { Capacidade } from './secoes/Capacidade'
import { CAPACIDADES } from './conteudo/capacidades'
import { Experiencia } from './secoes/Experiencia'
import { Trilho } from './secoes/Trilho'
import { Faixa } from './secoes/Faixa'
import { Sobre } from './secoes/Sobre'
import { Contato } from './secoes/Contato'
import { Colofao } from './secoes/Colofao'



export function App({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  const barra = useProgressoDeLeitura()


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
      <div className="progresso" ref={barra} aria-hidden="true" />

      <main id="conteudo">
        <Abertura idioma={idioma} />
        <Faixa idioma={idioma} />

        {CAPACIDADES.map((c) => (
          <Capacidade key={c.id} dados={c} idioma={idioma} />
        ))}

        <Trilho idioma={idioma} />
        <Experiencia idioma={idioma} />
        <Sobre idioma={idioma} />
        <Contato idioma={idioma} />
      </main>

      <Colofao idioma={idioma} />
    </>
  )
}
