import type { Idioma } from '../conteudo/projetos'
import { textos } from '../i18n'
import { publico } from '../caminhos'
import { Capitulo } from './Capitulo'
import { BotaoLink } from '../componentes/Botao'
import { useCopiar } from '../hooks/useCopiar'
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '../componentes/icones'

/**
 * Capítulo 05 — Contato (DESIGN.md §10, item 06).
 *
 * O defeito que este componente existe para não repetir: no site antigo cada
 * item de contato era um <li> com um <a> vazio esticado por cima, com o texto
 * visível FORA do link e um .sr-only fazendo o nome acessível. Isso quebrava
 * três coisas — o e-mail não podia ser selecionado com o mouse, o anel de foco
 * era recortado pelo `overflow: hidden` do <li>, e o leitor de tela anunciava um
 * link cujo texto não estava nele.
 *
 * Aqui: um <a> por destino, envolvendo ícone + texto VISÍVEL. O e-mail é o texto
 * do próprio link, e `copiar` é um botão separado com nome acessível próprio —
 * dois controles distintos, porque num desktop corporativo sem cliente de e-mail
 * o `mailto:` não faz nada e o endereço precisa poder ser levado embora.
 */

const EMAIL = 'pedrocod.dev@gmail.com'
const TELEFONE = '5591992444460'

export function Contato({ idioma }: { readonly idioma: Idioma }) {
  const t = textos(idioma)
  const { copiar, copiado } = useCopiar()

  const whatsapp = `https://wa.me/${TELEFONE}?text=${encodeURIComponent(t.mensagemWhatsapp)}`

  return (
    <Capitulo
      id="contato"
      numero="05"
      sobrancelha={idioma === 'pt' ? 'DISPONÍVEL · UTC−3' : 'AVAILABLE · UTC−3'}
      titulo={
        idioma === 'pt'
          ? 'Procuro estágio ou vaga júnior — Castanhal, Belém ou remoto.'
          : 'Looking for an internship or junior role — Castanhal, Belém or remote.'
      }
    >
      <p className="contato__sub mono">
        {idioma === 'pt'
          ? 'Respondo por e-mail e por WhatsApp no mesmo dia útil.'
          : 'I reply by e-mail and WhatsApp within the same business day.'}
      </p>

      <ul className="contato__lista">
        <li className="contato__item">
          <a className="contato__link" href={`mailto:${EMAIL}`}>
            <EnvelopeSimple />
            <span>{EMAIL}</span>
          </a>
          <button type="button" className="contato__copiar mono" onClick={() => void copiar(EMAIL)}>
            {copiado ? t.emailCopiado : t.copiarEmail}
          </button>
          {/* O retorno é anunciado, não só pintado: quem usa leitor de tela
              precisa saber que a cópia aconteceu. */}
          <span role="status" aria-live="polite" className="sr-only">
            {copiado ? t.emailCopiado : ''}
          </span>
        </li>

        <li className="contato__item">
          <a className="contato__link" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">✆</span>
            <span>{t.falarWhatsapp}</span>
          </a>
        </li>

        <li className="contato__item">
          <a
            className="contato__link"
            href="https://www.linkedin.com/in/pedro-darolt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo />
            <span>linkedin.com/in/pedro-darolt</span>
          </a>
        </li>

        <li className="contato__item">
          <a
            className="contato__link"
            href="https://github.com/pedrozxx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogo />
            <span>github.com/pedrozxx</span>
          </a>
        </li>
      </ul>

      <div className="contato__acoes">
        <BotaoLink tipo="primario" href={publico(t.arquivoCurriculo)} download>
          {t.ctaCurriculo}
        </BotaoLink>
      </div>
    </Capitulo>
  )
}
