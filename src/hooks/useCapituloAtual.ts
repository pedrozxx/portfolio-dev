import { useEffect, useState } from 'react'

/**
 * Qual capítulo está na tela. Usa IntersectionObserver, não listener de scroll:
 * o navegador faz a conta fora da thread principal e avisa só quando muda.
 *
 * `rootMargin` recorta a viewport para a faixa central — sem isso, duas seções
 * visíveis ao mesmo tempo fazem o marcador piscar entre elas na rolagem.
 */
export function useCapituloAtual(ids: readonly string[]): string | null {
  const [atual, setAtual] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    const alvos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (alvos.length === 0) return

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting)
        if (visivel) setAtual(visivel.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    alvos.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [ids])

  return atual
}
