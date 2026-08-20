import type { Idioma } from '../conteudo/projetos'
import { PROJETOS_MENORES } from '../conteudo/projetos-menores'
import { textos } from '../i18n'
import { Capitulo } from './Capitulo'
import { Imagem } from '../componentes/Imagem'
import { Marcadores } from '../componentes/Marcadores'
import { LinkExterno } from '../componentes/LinkExterno'

/**
 * Capítulo 03 — Projetos públicos (DESIGN.md §5.4 e §10, item 04).
 *
 * Linha de registro, não cartão: sem sombra, sem raio grande, separada por fio.
 * O que estas seis linhas provam não é sofisticação — é frequência de publicação
 * e higiene: ele publica, deixa no ar, e o link funciona hoje.
 *
 * Sem trilho horizontal fixado. O padrão prende a tela e o leitor rola sem nada
 * avançar; e nenhum dos seis merece o custo de acessibilidade que ele cobra.
 */

/** Só o Flappy Bird não tem captura: recebe variante tipográfica, nunca um buraco. */
const SEM_CAPTURA = 'flappy-bird-pi'

const ARQUIVO_DA_CAPTURA: Record<string, string> = {
  'conversor-de-valor': 'conversor-de-valor',
  'mundo-pet': 'mundo-pet',
  'portal-de-noticias': 'portal-noticias',
  sorteador: 'sorteador',
  'clube-de-assinatura': 'clube-assinatura',
}

export function Projetos({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)

  return (
    <Capitulo
      id="projetos"
      numero="03"
      sobrancelha={idioma === 'pt' ? 'PUBLICADOS · LINK VERIFICADO 20/08/2026' : 'PUBLISHED · LINKS CHECKED 2026-08-20'}
      titulo={t.secaoProjetos}
    >
      <ul className="projetos">
        {PROJETOS_MENORES.map((p, i) => (
          <li className="projeto" key={p.id}>
            <div className="projeto__indice mono" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}/{String(PROJETOS_MENORES.length).padStart(2, '0')}
            </div>

            <div className="projeto__texto">
              <h3 className="projeto__nome">{p.nome[idioma]}</h3>
              <p className="projeto__resumo">{p.resumo[idioma]}</p>
              <Marcadores itens={p.stack} />
              <p className="projeto__destinos">
                {p.demo ? (
                  <LinkExterno href={p.demo} descreve={p.nome[idioma]}>
                    {t.abrirDemo}
                  </LinkExterno>
                ) : (
                  /* Nunca um botão morto: a ausência é declarada em texto. */
                  <span className="projeto__sem-demo mono">
                    {idioma === 'pt' ? 'sem demo pública' : 'no public demo'}
                  </span>
                )}
                <LinkExterno href={p.repo} descreve={p.nome[idioma]}>
                  {t.verCodigo}
                </LinkExterno>
              </p>
            </div>

            <div className="projeto__captura">
              {p.id === SEM_CAPTURA ? (
                <div className="projeto__placa mono" aria-hidden="true">
                  <span className="projeto__placa-indice">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="projeto__placa-stack">{p.stack.join(' · ')}</span>
                </div>
              ) : (
                <Imagem
                  nome={ARQUIVO_DA_CAPTURA[p.id] ?? p.id}
                  alt={
                    idioma === 'pt'
                      ? `Tela do projeto ${p.nome.pt}.`
                      : `Screenshot of the ${p.nome.en} project.`
                  }
                  width={1483}
                  height={812}
                />
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="projetos__fecho">
        <LinkExterno href="https://github.com/pedrozxx?tab=repositories" descreve="GitHub">
          {idioma === 'pt' ? 'Todos os repositórios no GitHub' : 'All repositories on GitHub'}
        </LinkExterno>
      </p>
    </Capitulo>
  )
}
