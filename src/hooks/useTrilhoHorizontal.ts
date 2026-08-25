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
  /** Ligue no `<ul>` dos cartões. É por aqui que `--trilho` é escrito. */
  readonly lista: React.RefObject<HTMLUListElement | null>
  /** Ligue na barra de progresso. É por aqui que `--trilho-avanco` é escrito. */
  readonly barra: React.RefObject<HTMLSpanElement | null>
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
  const lista = useRef<HTMLUListElement | null>(null)
  const barra = useRef<HTMLSpanElement | null>(null)
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
    if (!ativo) return

    let pendente = 0
    let ultimoIndice = -1
    /*
     * Quanto o trilho tem para percorrer. Isto só muda quando o layout muda —
     * ler `scrollWidth`/`clientWidth` a cada quadro força o navegador a
     * recalcular o layout dentro do próprio rAF, que é o oposto do que este
     * efeito promete ("o navegador só compõe, não há reflow").
     */
    let largura = 0

    const remedir = () => {
      const el = lista.current
      largura = el ? Math.max(0, el.scrollWidth - el.clientWidth) : 0
    }

    const anotarIndice = (fracao: number) => {
      const novo =
        quantidade > 0 ? Math.min(quantidade - 1, Math.round(fracao * (quantidade - 1))) : 0
      if (novo !== ultimoIndice) {
        ultimoIndice = novo
        setIndice(novo)
      }
    }

    const medir = () => {
      pendente = 0
      const el = secao.current
      if (!el) return

      /*
       * Com o deslizamento desligado — foco de teclado dentro da lista — quem
       * manda na posição é a rolagem NATIVA da lista, não a rolagem da página.
       * A versão anterior simplesmente parava de medir, e o contador, a barra e
       * o nome congelavam no último valor: a pessoa navegava até o cartão 07 e
       * o rodapé continuava anunciando "03 / 07". Um contador errado é pior que
       * contador nenhum.
       */
      if (!desliza) {
        const pista = lista.current
        if (!pista) return
        const percorrivel = Math.max(0, pista.scrollWidth - pista.clientWidth)
        const fracao = percorrivel <= 0 ? 0 : pista.scrollLeft / percorrivel
        if (barra.current) barra.current.style.setProperty('--trilho-avanco', String(fracao))
        anotarIndice(fracao)
        return
      }

      const r = el.getBoundingClientRect()
      // Quanto a seção pode rolar antes de o fim dela alcançar o fim da tela.
      const percurso = el.offsetHeight - window.innerHeight
      const avanco = percurso <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / percurso))

      /*
       * Escrita direta no CSS, e no MENOR elemento que usa cada variável: a
       * lista para `--trilho`, a barra para `--trilho-avanco`. Escrever na
       * seção — ou pior, no `:root` — invalidaria o estilo dos sete cartões (ou
       * da árvore inteira) a cada quadro.
       *
       * Os elementos chegam por `ref` tipado, não por `querySelector` de nome de
       * classe: renomear `.trilho__lista` no CSS passava batido no TypeScript e
       * matava a animação em silêncio, porque o `if (pista)` engolia a falha.
       */
      if (lista.current) lista.current.style.setProperty('--trilho', String(avanco * largura))
      if (barra.current) barra.current.style.setProperty('--trilho-avanco', String(avanco))

      // O índice muda em passos: só aí vale acordar o React.
      anotarIndice(avanco)
    }

    const aoRolar = () => {
      if (pendente) return
      pendente = requestAnimationFrame(medir)
    }

    const aoRedimensionar = () => {
      remedir()
      aoRolar()
    }

    remedir()
    medir()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRedimensionar, { passive: true })
    // Sem deslizamento, é a lista que rola — e é ela que precisa avisar.
    const pista = lista.current
    if (!desliza && pista) pista.addEventListener('scroll', aoRolar, { passive: true })

    return () => {
      if (pendente) cancelAnimationFrame(pendente)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRedimensionar)
      if (pista) pista.removeEventListener('scroll', aoRolar)
    }
  }, [ativo, desliza, quantidade])

  /*
   * Uma vez desligado, fica desligado pelo resto da visita.
   *
   * Religar quando o foco sai parece mais elegante e é pior: a lista saltaria de
   * volta para a posição ditada pela rolagem no instante em que a pessoa saísse
   * do último cartão, jogando fora onde ela estava. Para quem navega por
   * teclado, um trilho previsível vale mais que um trilho animado.
   */
  const aoFocar = (evento: React.FocusEvent) => {
    const alvo = evento.target as HTMLElement

    /*
     * Só o foco de TECLADO desliga o trilho.
     *
     * `onFocusCapture` dispara também quando o mouse clica num link do cartão —
     * e como o desligamento é definitivo por desenho, um único clique matava a
     * animação pelo resto da visita. E o clique é comum aqui: todo link de
     * cartão abre em nova aba, então a pessoa clica, olha o projeto, volta — e
     * encontra um trilho parado, sem entender por quê.
     *
     * `:focus-visible` é exatamente a pergunta certa: é o navegador dizendo se
     * ESTE foco merece indicação visual, aplicando a heurística que ele já usa
     * para desenhar o anel. Teclado dá `true`, clique de mouse num link dá
     * `false`. O `try` cobre o navegador que não conhece o seletor — lá, o
     * comportamento antigo (desligar sempre) é o seguro, porque prender o foco
     * fora da tela é pior que perder a animação.
     */
    let porTeclado = true
    try {
      porTeclado = alvo.matches(':focus-visible')
    } catch {
      porTeclado = true
    }
    if (!porTeclado) return

    recemFocado.current = alvo
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


  return { secao, lista, barra, indice, ativo, desliza, aoFocar }
}
