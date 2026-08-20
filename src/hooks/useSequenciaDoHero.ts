import { useEffect, useRef, useState } from 'react'

/**
 * A sequência de abertura: o título do hero apaga e encolhe conforme a pessoa
 * rola, e a linha seguinte entra por cima. É o gesto que define a direção — o
 * site não começa numa página, começa numa passagem.
 *
 * Devolve 0→1 sobre a altura de uma tela. Lê apenas `scrollY` e
 * `innerHeight` — nunca a posição de um elemento. Ler posição de elemento a cada
 * quadro força o navegador a recalcular layout no meio da rolagem, que é o jeito
 * clássico de um efeito bonito engasgar a página.
 *
 * Com `prefers-reduced-motion`, devolve 0 e nunca instala o listener: o hero
 * fica parado e legível, que é o estado final e o estado base.
 */
export function useSequenciaDoHero(): number {
  const [avanco, setAvanco] = useState(0)
  const pendente = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const medir = () => {
      pendente.current = 0
      const altura = window.innerHeight || 1
      setAvanco(Math.min(1, Math.max(0, window.scrollY / altura)))
    }

    const aoRolar = () => {
      if (pendente.current) return
      pendente.current = requestAnimationFrame(medir)
    }

    medir()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar, { passive: true })
    return () => {
      if (pendente.current) cancelAnimationFrame(pendente.current)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return avanco
}
