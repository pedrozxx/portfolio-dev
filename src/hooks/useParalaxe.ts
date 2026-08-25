import { useEffect, useRef, type RefObject } from 'react'

/**
 * Paralaxe do ponteiro para as figuras dos capítulos (DESIGN.md §7, item 8).
 *
 * A seção inteira é a superfície que escuta — não a figura. A pessoa está com o
 * ponteiro sobre o texto, lendo; a figura responder do outro lado da coluna é o
 * que a faz parecer parte da página em vez de um enfeite parado ao lado dela.
 *
 * Três garantias, pela ordem em que costumam ser quebradas:
 *
 * 1. **Nenhuma leitura de layout por quadro.** A posição vira −1…1 dividindo
 *    `clientX`/`clientY` por `innerWidth`/`innerHeight`. Nada de
 *    `getBoundingClientRect` dentro do evento: forçaria o navegador a recalcular
 *    o layout a cada movimento do mouse, que é o oposto do que este efeito
 *    promete (o navegador só compõe).
 * 2. **Uma escrita por quadro.** `pointermove` dispara mais vezes que a tela
 *    pinta; o evento só guarda a posição e agenda UM `requestAnimationFrame`,
 *    que é quem escreve. Escrita vai em custom property, no menor elemento que a
 *    lê (§7.1) — `--px`/`--py` no palco, `--dx`/`--dy` em cada camada, já
 *    multiplicados pela profundidade dela. Nunca em `useState`: re-renderizar a
 *    árvore sessenta vezes por segundo por causa do mouse é o defeito clássico.
 * 3. **Só com ponteiro fino e sem movimento reduzido.** Em toque não existe
 *    "passar o mouse", e com `prefers-reduced-motion` a figura fica em repouso —
 *    que é o estado base de cada camada (§1.1): sem este hook, a página é a mesma,
 *    só parada.
 *
 * A profundidade de cada camada vem de `data-profundidade`, em px de deslocamento
 * máximo. Camada mais funda desloca menos: é isso que produz a sensação de
 * profundidade sem nenhum objeto 3D (§11 proíbe).
 */
export function useParalaxe(secao: RefObject<HTMLElement | null>) {
  const palco = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = secao.current
    const cena = palco.current
    if (!el || !cena) return

    const fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fino || reduzido) return

    // Lidas uma vez: a figura é estática, e `querySelectorAll` a cada evento
    // seria trabalho repetido para o mesmo resultado.
    const camadas = Array.from(cena.querySelectorAll<SVGGElement>('[data-profundidade]')).map(
      (camada) => ({ camada, profundidade: Number(camada.dataset.profundidade) || 0 }),
    )

    let px = 0
    let py = 0
    let quadro = 0

    const escrever = () => {
      quadro = 0
      cena.style.setProperty('--px', String(px))
      cena.style.setProperty('--py', String(py))
      for (const { camada, profundidade } of camadas) {
        camada.style.setProperty('--dx', `${(px * profundidade).toFixed(1)}px`)
        camada.style.setProperty('--dy', `${(py * profundidade).toFixed(1)}px`)
      }
    }

    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(escrever)
    }

    const aoMover = (e: PointerEvent) => {
      // O matchMedia acima decide pelo ponteiro PRIMÁRIO do aparelho. Num
      // notebook com tela de toque e trackpad ele casa, e um dedo arrastando a
      // seção antes de a rolagem assumir dispararia o paralaxe aos trancos.
      if (e.pointerType === 'touch') return
      px = (e.clientX / window.innerWidth) * 2 - 1
      py = (e.clientY / window.innerHeight) * 2 - 1
      agendar()
    }

    const aoSair = () => {
      px = 0
      py = 0
      agendar()
    }

    el.addEventListener('pointermove', aoMover, { passive: true })
    el.addEventListener('pointerleave', aoSair, { passive: true })

    return () => {
      el.removeEventListener('pointermove', aoMover)
      el.removeEventListener('pointerleave', aoSair)
      if (quadro) cancelAnimationFrame(quadro)
    }
  }, [secao])

  return palco
}
