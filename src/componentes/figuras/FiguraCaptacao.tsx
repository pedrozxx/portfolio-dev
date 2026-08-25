import { Camada } from '../Figura'

/**
 * Capítulo 03 — "Páginas que captam" (DESIGN.md §6.2).
 *
 * A página de captação no meio (navegação, manchete, dois botões, imagem), o
 * formulário em primeiro plano — três campos e o botão de envio — e, atrás, o
 * contador de rate limit: cinco envios aceitos e o sexto barrado em âmbar, a
 * única cor de estado do site. É a falha corrigida do capítulo, desenhada:
 * formulário público sem limite é porta aberta.
 */
export function FiguraCaptacao() {
  return (
    <svg className="fig" viewBox="0 0 640 480" focusable="false">
      {/* fundo: o contador de rate limit */}
      <Camada profundidade={6} duracao="7.8s" atraso="-2.2s">
        <rect className="fig__painel" x="372" y="36" width="232" height="124" rx="8" />
        <rect className="fig__forte" x="388" y="52" width="90" height="8" rx="4" />
        <rect className="fig__barra" x="388" y="68" width="60" height="5" rx="2.5" />

        <rect className="fig__painel fig__painel--alta" x="388" y="90" width="26" height="26" rx="6" />
        <circle className="fig__acento" cx="401" cy="103" r="4" />
        <rect className="fig__painel fig__painel--alta" x="422" y="90" width="26" height="26" rx="6" />
        <circle className="fig__acento" cx="435" cy="103" r="4" />
        <rect className="fig__painel fig__painel--alta" x="456" y="90" width="26" height="26" rx="6" />
        <circle className="fig__acento" cx="469" cy="103" r="4" />
        <rect className="fig__painel fig__painel--alta" x="490" y="90" width="26" height="26" rx="6" />
        <circle className="fig__acento" cx="503" cy="103" r="4" />
        <rect className="fig__painel fig__painel--alta" x="524" y="90" width="26" height="26" rx="6" />
        <circle className="fig__acento" cx="537" cy="103" r="4" />
        <rect className="fig__estado-fio" x="558" y="90" width="26" height="26" rx="6" />
        <path className="fig__estado-fio" d="M566 98 L576 108 M576 98 L566 108" />

        <rect className="fig__fio fig__fio--fraco" x="388" y="132" width="196" height="6" rx="3" />
        <rect className="fig__acento" x="388" y="132" width="163" height="6" rx="3" />
      </Camada>

      {/* meio: a página */}
      <Camada profundidade={12} duracao="6.6s" atraso="-0.9s">
        <rect className="fig__painel" x="36" y="60" width="372" height="372" rx="8" />
        <rect className="fig__forte" x="52" y="76" width="48" height="10" rx="5" />
        <rect className="fig__barra" x="300" y="78" width="28" height="6" rx="3" />
        <rect className="fig__barra" x="336" y="78" width="28" height="6" rx="3" />
        <rect className="fig__barra" x="372" y="78" width="22" height="6" rx="3" />
        <path className="fig__fio fig__fio--fraco" d="M36 96 H408" />

        <rect className="fig__forte" x="52" y="124" width="250" height="16" rx="8" />
        <rect className="fig__forte" x="52" y="148" width="200" height="16" rx="8" />
        <rect className="fig__barra" x="52" y="180" width="260" height="7" rx="3.5" />
        <rect className="fig__barra" x="52" y="194" width="220" height="7" rx="3.5" />
        <rect className="fig__acento" x="52" y="222" width="110" height="32" rx="16" />
        <rect className="fig__fio" x="172" y="222" width="90" height="32" rx="16" />

        <rect className="fig__painel fig__painel--alta" x="52" y="286" width="340" height="120" rx="6" />
        <rect className="fig__barra" x="68" y="302" width="120" height="7" rx="3.5" />
        <rect className="fig__barra" x="68" y="318" width="180" height="7" rx="3.5" />
        <path className="fig__fio fig__fio--fraco" d="M68 380 H376" />
      </Camada>

      {/* frente: o formulário */}
      <Camada profundidade={20} duracao="5.4s">
        <rect className="fig__painel fig__painel--alta" x="296" y="176" width="268" height="250" rx="10" />
        <rect className="fig__forte" x="316" y="196" width="120" height="9" rx="4.5" />

        <rect className="fig__barra" x="316" y="220" width="46" height="5" rx="2.5" />
        <rect className="fig__campo" x="316" y="230" width="228" height="30" rx="4" />
        <rect className="fig__barra" x="324" y="242" width="40" height="6" rx="3" />

        <rect className="fig__barra" x="316" y="274" width="60" height="5" rx="2.5" />
        <rect className="fig__campo" x="316" y="284" width="228" height="30" rx="4" />

        <rect className="fig__barra" x="316" y="328" width="52" height="5" rx="2.5" />
        <rect className="fig__campo" x="316" y="338" width="228" height="30" rx="4" />

        <rect className="fig__acento" x="316" y="386" width="228" height="28" rx="14" />
      </Camada>
    </svg>
  )
}
