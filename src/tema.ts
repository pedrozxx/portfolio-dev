/**
 * Tema claro/escuro.
 *
 * Três estados, não dois: "sistema" (o padrão, segue prefers-color-scheme),
 * "claro" e "escuro". Guardar só um booleano perderia a diferença entre "escolheu
 * escuro" e "está escuro porque o sistema está" — e aí o site pararia de
 * acompanhar quem troca o tema do celular ao anoitecer.
 */

export type Tema = 'sistema' | 'claro' | 'escuro'

const CHAVE = 'tema'

export function lerTema(): Tema {
  try {
    const guardado = localStorage.getItem(CHAVE)
    return guardado === 'claro' || guardado === 'escuro' ? guardado : 'sistema'
  } catch {
    // Modo anônimo com armazenamento bloqueado devolve exceção em vez de null.
    // Um portfólio não pode ficar em branco por causa disso.
    return 'sistema'
  }
}

export function aplicarTema(tema: Tema): void {
  const raiz = document.documentElement
  if (tema === 'sistema') raiz.removeAttribute('data-tema')
  else raiz.setAttribute('data-tema', tema)

  try {
    if (tema === 'sistema') localStorage.removeItem(CHAVE)
    else localStorage.setItem(CHAVE, tema)
  } catch {
    // Sem persistência a escolha vale para esta visita. Melhor que quebrar.
  }
}

/** O que está na tela agora, já resolvido — usado para rotular o botão. */
export function temaEfetivo(tema: Tema): 'claro' | 'escuro' {
  if (tema !== 'sistema') return tema
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

/**
 * Script que roda antes da primeira pintura, inserido inline no <head>.
 *
 * Sem isso a página nasce com o tema do sistema e troca para o escolhido só
 * depois do JavaScript carregar — o flash branco clássico. Precisa ser inline e
 * síncrono: um arquivo externo já chega tarde demais.
 */
export const SCRIPT_ANTI_FLASH = `(function(){try{var t=localStorage.getItem('${CHAVE}');if(t==='claro'||t==='escuro')document.documentElement.setAttribute('data-tema',t)}catch(e){}})()`
