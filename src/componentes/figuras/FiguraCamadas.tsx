import { Camada } from '../Figura'

/**
 * Capítulo 01 — "Ponta a ponta" (DESIGN.md §6.2).
 *
 * Três painéis em profundidade, do fundo para a frente: o banco (cilindro), a
 * API (rotas com selo de resposta) e a interface (janela com coluna lateral,
 * três indicadores e um gráfico de barras). Um fio no acento liga a janela à
 * API e a API ao banco: é o percurso de uma requisição, desenhado.
 *
 * Nenhum texto, nenhum hex: cor por classe, tokens por baixo. As barras no lugar
 * de texto são a mesma convenção do esqueleto de carregamento (§5).
 */
export function FiguraCamadas() {
  return (
    <svg className="fig" viewBox="0 0 640 480" focusable="false">
      {/* fundo: banco de dados */}
      <Camada profundidade={6} duracao="7.8s" atraso="-2.6s">
        <path className="fig__painel" d="M300 316 V394 A130 26 0 0 0 560 394 V316" />
        <path className="fig__fio fig__fio--fraco" d="M300 355 A130 26 0 0 0 560 355" />
        <ellipse className="fig__painel fig__painel--alta" cx="430" cy="316" rx="130" ry="26" />
        <circle className="fig__acento" cx="430" cy="316" r="4" />
      </Camada>

      {/* meio: API */}
      <Camada profundidade={12} duracao="6.6s" atraso="-1.2s">
        <rect className="fig__painel" x="220" y="130" width="320" height="170" rx="8" />
        <rect className="fig__forte" x="236" y="146" width="70" height="8" rx="4" />
        <rect className="fig__acento" x="484" y="144" width="40" height="12" rx="6" />
        <path className="fig__fio fig__fio--fraco" d="M220 166 H540" />

        <rect className="fig__fio" x="236" y="178" width="34" height="16" rx="3" />
        <rect className="fig__barra" x="280" y="183" width="130" height="6" rx="3" />
        <rect className="fig__acento" x="476" y="180" width="48" height="12" rx="6" />

        <rect className="fig__fio" x="236" y="210" width="34" height="16" rx="3" />
        <rect className="fig__barra" x="280" y="215" width="150" height="6" rx="3" />
        <rect className="fig__acento" x="476" y="212" width="48" height="12" rx="6" />

        <rect className="fig__fio" x="236" y="242" width="34" height="16" rx="3" />
        <rect className="fig__barra" x="280" y="247" width="110" height="6" rx="3" />
        <rect className="fig__barra" x="476" y="244" width="48" height="12" rx="6" />

        <rect className="fig__fio" x="236" y="274" width="34" height="16" rx="3" />
        <rect className="fig__barra" x="280" y="279" width="140" height="6" rx="3" />
        <rect className="fig__acento" x="476" y="276" width="48" height="12" rx="6" />
      </Camada>

      {/* frente: interface */}
      <Camada profundidade={20} duracao="5.4s">
        <rect className="fig__painel" x="60" y="40" width="320" height="240" rx="8" />
        <path
          className="fig__painel fig__painel--alta"
          d="M68 40 H372 A8 8 0 0 1 380 48 V68 H60 V48 A8 8 0 0 1 68 40 Z"
        />
        <circle className="fig__barra" cx="76" cy="54" r="3.5" />
        <circle className="fig__barra" cx="90" cy="54" r="3.5" />
        <circle className="fig__barra" cx="104" cy="54" r="3.5" />

        <path className="fig__fio fig__fio--fraco" d="M144 68 V280" />
        <rect className="fig__barra" x="74" y="88" width="56" height="6" rx="3" />
        <rect className="fig__acento" x="74" y="108" width="44" height="6" rx="3" />
        <rect className="fig__barra" x="74" y="128" width="60" height="6" rx="3" />
        <rect className="fig__barra" x="74" y="148" width="40" height="6" rx="3" />

        <rect className="fig__forte" x="162" y="88" width="120" height="8" rx="4" />
        <rect className="fig__barra" x="162" y="104" width="180" height="6" rx="3" />

        <rect className="fig__painel fig__painel--alta" x="162" y="124" width="60" height="34" rx="4" />
        <rect className="fig__forte" x="170" y="134" width="28" height="8" rx="4" />
        <rect className="fig__barra" x="170" y="146" width="40" height="5" rx="2.5" />
        <rect className="fig__painel fig__painel--alta" x="232" y="124" width="60" height="34" rx="4" />
        <rect className="fig__forte" x="240" y="134" width="34" height="8" rx="4" />
        <rect className="fig__barra" x="240" y="146" width="36" height="5" rx="2.5" />
        <rect className="fig__painel fig__painel--alta" x="302" y="124" width="60" height="34" rx="4" />
        <rect className="fig__forte" x="310" y="134" width="24" height="8" rx="4" />
        <rect className="fig__barra" x="310" y="146" width="42" height="5" rx="2.5" />

        <rect className="fig__barra" x="172" y="216" width="22" height="34" rx="2" />
        <rect className="fig__barra" x="206" y="198" width="22" height="52" rx="2" />
        <rect className="fig__barra" x="240" y="210" width="22" height="40" rx="2" />
        <rect className="fig__acento" x="274" y="180" width="22" height="70" rx="2" />
        <rect className="fig__barra" x="308" y="204" width="22" height="46" rx="2" />
        <rect className="fig__barra" x="342" y="192" width="22" height="58" rx="2" />
        <path className="fig__fio" d="M162 250 H364" />
      </Camada>

      {/* o fio da requisição: parado, para as camadas se moverem em relação a ele */}
      <path className="fig__acento-fio fig__tracejado" d="M380 160 H420 V316" />
      <circle className="fig__acento" cx="380" cy="160" r="4" />
      <circle className="fig__acento" cx="420" cy="300" r="4" />
    </svg>
  )
}
