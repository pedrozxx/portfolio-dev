import type { Idioma } from '../conteudo/projetos'
import { PROJETOS } from '../conteudo/projetos'
import { textos } from '../i18n'
import { Capitulo } from './Capitulo'
import { Imagem } from '../componentes/Imagem'
import { Marcadores } from '../componentes/Marcadores'
import { LinkExterno } from '../componentes/LinkExterno'

/**
 * Capítulo 01 — o carro-chefe.
 *
 * Vem antes da experiência porque é a única prova que o leitor pode abrir e
 * inspecionar: resolve a desconfiança sem quebrar sigilo. É o bloco mais alto da
 * página — hierarquia por tamanho, não por ordem na lista.
 *
 * Quatro decisões visíveis, sem acordeão: em quinze segundos ninguém abre
 * acordeão. Profundidade fica a um clique, nunca atrás de uma interação.
 */
export function Radar({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  const projeto = PROJETOS.find((p) => p.destaque)
  if (!projeto) return null

  return (
    <Capitulo
      id="radar"
      numero="01"
      sobrancelha={
        idioma === 'pt' ? 'PROJETO PESSOAL · DADOS ABERTOS' : 'PERSONAL PROJECT · OPEN DATA'
      }
      titulo={projeto.nome}
    >
      <div className="radar">
        <div className="radar__captura">
          <Imagem
            nome="radar-licitacoes-pa"
            alt={projeto.alt[idioma]}
            width={1483}
            height={812}
          />
        </div>

        <div className="radar__texto">
          <p className="capitulo__texto">{projeto.resumo[idioma]}</p>
          <Marcadores itens={projeto.stack} />
          {/* Dois destinos separados e visíveis. O bloco inteiro nunca é um
              link: um único <a> gigante engole o texto de dentro dele e some da
              lista de links do leitor de tela como um parágrafo inteiro. */}
          <p className="radar__destinos">
            <LinkExterno href={projeto.demo ?? projeto.repo} descreve={projeto.nome}>
              {t.abrirDemo}
            </LinkExterno>
            <LinkExterno href={projeto.repo} descreve={projeto.nome}>
              {t.verCodigo}
            </LinkExterno>
          </p>
        </div>
      </div>

      <div className="decisoes">
        {projeto.decisoes.map((d) => (
          <div className="decisao" key={d.rotulo.pt}>
            <h3 className="decisao__rotulo">
              {d.rotulo[idioma]}
              <span className="decisao__fonte">
                {t.fonteDoDado}: {d.fonte}
              </span>
            </h3>
            <p className="capitulo__texto">
              {d.sintoma[idioma]}{' '}
              <span className="decisao__seta" aria-hidden="true">
                →
              </span>{' '}
              {d.decisao[idioma]}{' '}
              <span className="decisao__seta" aria-hidden="true">
                →
              </span>{' '}
              {d.consequencia[idioma]}
            </p>
          </div>
        ))}
      </div>

      <p className="radar__destinos">
        <LinkExterno href={`${projeto.repo}#readme`} descreve={projeto.nome}>
          {t.lerReadme}
        </LinkExterno>
      </p>
    </Capitulo>
  )
}
