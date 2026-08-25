import type { Idioma } from '../conteudo/projetos'
import { Marquee } from '../componentes/Marquee'

/**
 * A faixa de tecnologias entre a abertura e o primeiro capítulo.
 *
 * Só entra o que ele usa de verdade — o dossiê proíbe listar tecnologia que não
 * usou, e uma faixa correndo é o lugar mais fácil de inflar sem ninguém notar.
 */

const LINHA_UM = [
  'React',
  'TypeScript',
  'Vite',
  'Node.js',
  'Express',
  'Python',
  'FastAPI',
  'Pandas',
  'MongoDB',
] as const

const LINHA_DOIS_PT = [
  'Linux',
  'systemd',
  'Nginx',
  'Cloudflare Tunnel',
  'GitHub Actions',
  'Vercel',
  'Acessibilidade',
  'Code review',
  'Testes',
] as const

const LINHA_DOIS_EN = [
  'Linux',
  'systemd',
  'Nginx',
  'Cloudflare Tunnel',
  'GitHub Actions',
  'Vercel',
  'Accessibility',
  'Code review',
  'Testing',
] as const

export function Faixa({ idioma }: { readonly idioma: Idioma }) {
  return (
    <div
      className="marquee"
      role="group"
      aria-label={idioma === 'pt' ? 'Tecnologias' : 'Technologies'}
    >
      <Marquee itens={LINHA_UM} />
      <Marquee itens={idioma === 'pt' ? LINHA_DOIS_PT : LINHA_DOIS_EN} volta />
    </div>
  )
}
