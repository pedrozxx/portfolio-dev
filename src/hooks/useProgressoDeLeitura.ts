import { useEffect, useState } from 'react'

/**
 * Progresso de leitura, de 0 a 1.
 *
 * Lê só `scrollY` e a altura do documento — nunca a posição de elementos. Ler
 * posição de elemento a cada quadro força o navegador a recalcular layout no meio
 * da rolagem, que é o jeito clássico de um indicador bonito engasgar a página.
 *
 * O valor sai como custom property e o CSS pinta com `transform: scaleY()`, que
 * roda na composição e não repinta nada.
 */
export function useProgressoDeLeitura(): number {
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    let pendente = 0

    const medir = () => {
      pendente = 0
      const rolavel = document.documentElement.scrollHeight - window.innerHeight
      // Página curta demais para rolar: progresso cheio, não divisão por zero.
      setProgresso(rolavel <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / rolavel)))
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

  return progresso
}
