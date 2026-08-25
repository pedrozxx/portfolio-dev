import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Copia um texto e avisa que copiou.
 *
 * O e-mail existe como link `mailto:` E como texto selecionável, com este botão ao
 * lado — são dois controles, não um link invisível cobrindo tudo. Num desktop
 * corporativo sem cliente de e-mail configurado, `mailto:` não faz nada; se o
 * endereço também não puder ser copiado, existe um caminho realista em que alguém
 * quer chamar o Pedro e não consegue levar o contato.
 */
export function useCopiar(ms = 2000) {
  const [copiado, setCopiado] = useState(false)
  const tempo = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (tempo.current) clearTimeout(tempo.current) }, [])

  const copiar = useCallback(
    async (texto: string) => {
      try {
        await navigator.clipboard.writeText(texto)
        setCopiado(true)
        if (tempo.current) clearTimeout(tempo.current)
        tempo.current = setTimeout(() => setCopiado(false), ms)
        return true
      } catch {
        // A área de transferência exige contexto seguro e, em alguns navegadores,
        // gesto do usuário. Falhou: o texto continua selecionável na tela, que é
        // o motivo de ele nunca ter virado só um ícone.
        return false
      }
    },
    [ms],
  )

  return { copiar, copiado }
}
