import type { Idioma } from '../conteudo/projetos'
import { EXPERIENCIA } from '../conteudo/experiencia'
import { textos } from '../i18n'
import { Capitulo } from './Capitulo'

/**
 * Capítulo 02 — Experiência (DESIGN.md §5.6 e §10, item 03).
 *
 * Nada anima aqui: é o texto que o recrutador lê devagar, copia e imprime.
 *
 * Sem cartão, sem screenshot, sem botão, sem bolinha, sem trilho vertical
 * desenhado. Os sistemas da Norte são internos — o selo de código fechado é
 * TEXTO, e essa frase transforma a ausência de link em sinal de maturidade em
 * vez de lacuna. Nenhum item desta seção pode conter uma URL; há teste que
 * garante isso (src/conteudo/__tests__/conteudo.test.ts).
 */

export function Experiencia({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)

  return (
    <Capitulo
      id="experiencia"
      numero="02"
      sobrancelha={idioma === 'pt' ? 'EMPREGADOR · CIDADE · PERÍODO' : 'EMPLOYER · CITY · PERIOD'}
      titulo={t.secaoExperiencia}
      semMovimento
    >
      <div className="documento">

        {EXPERIENCIA.map((cargo) => (
          <div className="registro" key={cargo.empresa}>
            <div className="corpo">
              <div className="cargo__cabeca">
                <h3 className="cargo__titulo">
                  {cargo.cargo[idioma]} — {cargo.empresa}
                </h3>
                {/* Linha de expediente: lugar é dado de triagem, não é tema. As
                    três entradas alinham no mesmo eixo. */}
                <p className="cargo__expediente mono">
                  {cargo.local} · {cargo.periodo[idioma]}
                </p>
              </div>

              <ul className="cargo__resultados">
                {cargo.resultados.map((r) => (
                  <li key={r.texto.pt}>
                    {r.numero && <span className="cargo__numero mono">{r.numero}</span>}
                    <span>{r.texto[idioma]}</span>
                  </li>
                ))}
              </ul>

              {/* O selo é a frase daquela entrada, não uma genérica repetida
                  nas três: a Link Jr entregava para fora e a Sea Telecom não era
                  cargo de desenvolvimento. */}
              {cargo.semLink && <p className="cargo__selo mono">{cargo.semLink[idioma]}</p>}
            </div>

            <p className="aparato">{idioma === 'pt' ? 'currículo' : 'résumé'}</p>
          </div>
        ))}
      </div>
    </Capitulo>
  )
}
