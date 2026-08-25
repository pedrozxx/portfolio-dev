import { useEffect, useRef } from 'react'

/**
 * Progresso de leitura, escrito em `--progresso` **no próprio elemento da barra**.
 *
 * Escrever no `:root` parece inofensivo e não é: uma custom property no elemento
 * raiz é herdável, então cada escrita invalida o estilo de toda a árvore. Feito a
 * cada quadro, com sete cartões de imagem e cinco numerais contornados na
 * página, isso travou o renderizador do Chrome — `Runtime.evaluate` expirando
 * em 45 s, tanto em desenvolvimento quanto no build de produção.
 *
 * A regra que fica: **custom property animada mora no menor elemento que a usa.**
 */
export function useProgressoDeLeitura(): React.RefObject<HTMLDivElement | null> {
  const barra = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const raiz = document.documentElement
    let pendente = 0

    const medir = () => {
      pendente = 0
      const el = barra.current
      if (!el) return
      const rolavel = raiz.scrollHeight - window.innerHeight
      const p = rolavel <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / rolavel))
      el.style.setProperty('--progresso', String(p))
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

  return barra
}
