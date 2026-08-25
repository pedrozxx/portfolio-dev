import { useEffect, useRef, useState } from 'react'

/**
 * Revela um bloco quando ele entra na tela.
 *
 * Duas garantias que a maioria das implementações não dá:
 *
 * 1. Se `prefers-reduced-motion` estiver ligado, o bloco nasce revelado e nenhum
 *    observador é criado. Não é "animação mais rápida": é ausência de animação.
 * 2. Se o JavaScript não rodar, o bloco também nasce revelado — o estado inicial é
 *    `true` e só vira `false` dentro do efeito. Um reveal que começa invisível
 *    esconde a página inteira quando o bundle falha, e é assim que portfólio some
 *    da tela de um recrutador com bloqueador agressivo.
 */
export function useRevelar<T extends HTMLElement>() {
  const alvo = useRef<T | null>(null)
  const [revelado, setRevelado] = useState(true)

  useEffect(() => {
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semMovimento || !alvo.current) return

    setRevelado(false)
    const el = alvo.current

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada?.isIntersecting) {
          setRevelado(true)
          observador.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )

    observador.observe(el)
    return () => observador.disconnect()
  }, [])

  return { alvo, revelado }
}
