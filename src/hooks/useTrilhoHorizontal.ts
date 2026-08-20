import { useEffect, useRef, useState } from 'react'

/**
 * O trilho horizontal fixado — o efeito mais marcante da direção e o mais fácil
 * de fazer errado.
 *
 * Como funciona: a seção recebe altura de várias telas. Enquanto o topo dela
 * está acima da viewport e o fim ainda não chegou, o conteúdo fica `sticky` e os
 * cartões deslizam na horizontal por `transform: translate3d()`, movidos pela
 * fração de rolagem já percorrida. O navegador só compõe — não há reflow.
 *
 * As quatro coisas que a versão ingênua deste efeito quebra, e que aqui são
 * requisito:
 *
 * 1. **Teclado.** Este é o que quase escapou. A primeira versão só parava de
 *    atualizar o deslocamento quando o foco entrava na lista, e isso não bastava:
 *    com `overflow-x: clip` e um `transform` mandando na posição, o navegador
 *    não conseguia rolar até o cartão focado. Medido: o link do último cartão
 *    recebia foco em x=2193 numa janela de 1440 — foco fora da tela, que é uma
 *    das piores falhas de acessibilidade que existem. Agora o foco DESLIGA o
 *    deslizamento (`desliza` vira `false`): o `transform` sai, a lista volta a
 *    ser um contêiner com rolagem nativa, e o navegador leva o foco à vista
 *    sozinho. O palco continua preso, então não há salto de layout.
 * 2. **Celular.** Abaixo de 768px o efeito não existe: vira lista vertical.
 *    Prender a tela num aparelho onde a rolagem é o único gesto disponível é
 *    prender a pessoa.
 * 3. **Movimento reduzido.** Mesma coisa: sem prender, sem deslizar.
 * 4. **Sem JavaScript.** `ativo` nasce `false`, então a lista é uma lista comum
 *    com rolagem horizontal nativa. Nada some.
 */

interface Retorno {
  /** Referência da seção alta que provoca a rolagem. */
  readonly secao: React.RefObject<HTMLElement | null>
  /**
   * Índice do cartão corrente, para o contador "03 / 07".
   *
   * É o ÚNICO valor deste hook que vira estado do React — porque muda em passos
   * discretos, seis vezes numa página inteira. O avanço contínuo vai direto para
   * `--trilho` em custom property: guardá-lo em `useState` re-renderizava sete
   * cartões com imagem a cada quadro e derrubou a página para 1 fps.
   */
  readonly indice: number
  /** Liga a altura extra e o `sticky`. `false` no celular e sem JS. */
  readonly ativo: boolean
  /** Liga o deslocamento por `transform`. Desliga quando o foco entra na lista. */
  readonly desliza: boolean
  /** Ligue no `onFocusCapture` da lista. */
  readonly aoFocar: (evento: React.FocusEvent) => void
}

export function useTrilhoHorizontal(quantidade: number): Retorno {
  const secao = useRef<HTMLElement | null>(null)
  const [indice, setIndice] = useState(0)
  const [ativo, setAtivo] = useState(false)
  const [focado, setFocado] = useState(false)
  const recemFocado = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const mqTela = window.matchMedia('(min-width: 768px)')
    const mqMovimento = window.matchMedia('(prefers-reduced-motion: reduce)')

    const decidir = () => setAtivo(mqTela.matches && !mqMovimento.matches)
    decidir()
    mqTela.addEventListener('change', decidir)
    mqMovimento.addEventListener('change', decidir)
    return () => {
      mqTela.removeEventListener('change', decidir)
      mqMovimento.removeEventListener('change', decidir)
    }
  }, [])

  const desliza = ativo && !focado

  useEffect(() => {
    if (!desliza) return

    let pendente = 0
    let ultimoIndice = -1

    const medir = () => {
      pendente = 0
      const el = secao.current
      if (!el) return

      const r = el.getBoundingClientRect()
      // Quanto a seção pode rolar antes de o fim dela alcançar o fim da tela.
      const percurso = el.offsetHeight - window.innerHeight
      const avanco = percurso <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / percurso))

      /*
       * Escrita direta no CSS, e no MENOR elemento que usa cada variável: a
       * lista para `--trilho`, a barra para `--trilho-avanco`. Escrever na
       * seção — ou pior, no `:root` — invalidaria o estilo dos sete cartões (ou
       * da árvore inteira) a cada quadro, e foi isso que travou o renderizador.
       */
      const pista = el.querySelector<HTMLElement>('.trilho__lista')
      if (pista) {
        const largura = Math.max(0, pista.scrollWidth - pista.clientWidth)
        pista.style.setProperty('--trilho', String(avanco * largura))
      }
      const barra = el.querySelector<HTMLElement>('.trilho__barra')
      if (barra) barra.style.setProperty('--trilho-avanco', String(avanco))

      // O índice muda em passos: só aí vale acordar o React.
      const novo =
        quantidade > 0 ? Math.min(quantidade - 1, Math.round(avanco * (quantidade - 1))) : 0
      if (novo !== ultimoIndice) {
        ultimoIndice = novo
        setIndice(novo)
      }
    }

    const aoRolar = () => {
      if (pendente) return
      pendente = requestAnimationFrame(medir)
    }

    medir()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar, { passive: true })
    return () => {
      if (pendente) cancelAnimationFrame(pendente)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [desliza, quantidade])

  /*
   * Uma vez desligado, fica desligado pelo resto da visita.
   *
   * Religar quando o foco sai parece mais elegante e é pior: a lista saltaria de
   * volta para a posição ditada pela rolagem no instante em que a pessoa saísse
   * do último cartão, jogando fora onde ela estava. Para quem navega por
   * teclado, um trilho previsível vale mais que um trilho animado.
   */
  const aoFocar = (evento: React.FocusEvent) => {
    recemFocado.current = evento.target as HTMLElement
    setFocado(true)
  }

  /*
   * Trazer o elemento focado à vista DEPOIS que o deslizamento desligou.
   *
   * O navegador decide se rola até o foco no instante em que o foco acontece — e
   * naquele instante a lista ainda estava com `overflow: clip` e um `transform`
   * mandando na posição, então ele decidiu não rolar. A troca de estado do React
   * só chega no quadro seguinte. Medido na página real: `desliza` virava `nao` e
   * `overflow` virava `auto`, e mesmo assim o link do último cartão continuava em
   * x=2122 numa janela de 1440. Este efeito refaz a conta com o layout novo.
   *
   * `block: 'nearest'` para não mexer na rolagem vertical da página, que é o que
   * mantém o palco preso; `behavior: 'instant'` porque foco não é lugar de
   * animação — quem navega por teclado quer chegar, não assistir.
   */
  useEffect(() => {
    if (!focado) return
    const el = recemFocado.current
    if (!el) return
    el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' })
  }, [focado])


  return { secao, indice, ativo, desliza, aoFocar }
}
