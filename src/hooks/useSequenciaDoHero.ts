import { useEffect, useRef } from 'react'

/**
 * A sequência de abertura: o hero apaga e encolhe, a frase de passagem entra.
 *
 * Escreve as variáveis **em cada um dos dois elementos**, nunca no `:root` — ver
 * `useProgressoDeLeitura` para a medição que motivou a regra. Devolve as duas
 * referências.
 */
export function useSequenciaDoHero() {
  const hero = useRef<HTMLDivElement | null>(null)
  const passagem = useRef<HTMLParagraphElement | null>(null)
  const dica = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let pendente = 0

    const medir = () => {
      pendente = 0
      const altura = window.innerHeight || 1
      const avanco = Math.min(1, Math.max(0, window.scrollY / altura))

      const saida = Math.min(1, avanco / 0.7)
      const opacidade = String(1 - saida)
      if (hero.current) {
        hero.current.style.setProperty('--hero-opacidade', opacidade)
        hero.current.style.setProperty('--hero-escala', String(1 - saida * 0.06))
        hero.current.style.setProperty('--hero-y', `${saida * -40}px`)
      }
      if (dica.current) dica.current.style.setProperty('--hero-opacidade', opacidade)

      if (passagem.current) {
        const entrada = Math.min(1, Math.max(0, (avanco - 0.55) / 0.5))
        passagem.current.style.setProperty('--passagem-opacidade', String(entrada))
        passagem.current.style.setProperty('--passagem-y', `${(1 - entrada) * 32}px`)
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
  }, [])

  return { hero, passagem, dica }
}
