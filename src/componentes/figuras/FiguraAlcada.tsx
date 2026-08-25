import { Camada } from '../Figura'

/**
 * Capítulo 02 — "IA com alçada" (DESIGN.md §6.2).
 *
 * Da esquerda para a direita, o percurso de uma requisição de compra: o cartão
 * da proposta (o que o modelo produz), o portão de aprovação com três degraus de
 * alçada — um aceso, o que a requisição pede — e, na frente, a conversa no
 * Telegram: o aviso com o ponto de notificação em âmbar e a resposta com o
 * "aprovado". Embaixo, atrás de tudo, a trilha de registro: duas linhas
 * marcadas, uma pendente.
 *
 * A frase que a figura desenha é a do capítulo: propõe, nunca decide.
 */
export function FiguraAlcada() {
  return (
    <svg className="fig" viewBox="0 0 640 480" focusable="false">
      {/* fundo: trilha de registro */}
      <Camada profundidade={6} duracao="7.8s" atraso="-3.1s">
        <rect className="fig__painel" x="70" y="352" width="500" height="88" rx="8" />
        <rect className="fig__acento" x="86" y="368" width="12" height="12" rx="3" />
        <rect className="fig__barra" x="108" y="371" width="200" height="6" rx="3" />
        <rect className="fig__barra fig__barra--apagada" x="470" y="371" width="84" height="6" rx="3" />
        <rect className="fig__acento" x="86" y="392" width="12" height="12" rx="3" />
        <rect className="fig__barra" x="108" y="395" width="160" height="6" rx="3" />
        <rect className="fig__barra fig__barra--apagada" x="470" y="395" width="84" height="6" rx="3" />
        <rect className="fig__fio" x="86" y="416" width="12" height="12" rx="3" />
        <rect className="fig__barra" x="108" y="419" width="230" height="6" rx="3" />
        <rect className="fig__barra fig__barra--apagada" x="470" y="419" width="84" height="6" rx="3" />
      </Camada>

      {/* meio: proposta e portão de alçada */}
      <Camada profundidade={12} duracao="6.6s" atraso="-1.7s">
        <rect className="fig__painel" x="50" y="120" width="180" height="150" rx="8" />
        <circle className="fig__acento-fio" cx="70" cy="142" r="8" />
        <circle className="fig__acento" cx="70" cy="142" r="2.5" />
        <rect className="fig__forte" x="88" y="138" width="80" height="8" rx="4" />
        <rect className="fig__barra" x="66" y="166" width="140" height="6" rx="3" />
        <rect className="fig__barra" x="66" y="182" width="120" height="6" rx="3" />
        <rect className="fig__barra" x="66" y="198" width="148" height="6" rx="3" />
        <rect className="fig__forte" x="66" y="226" width="70" height="10" rx="5" />
        <rect className="fig__fio" x="150" y="224" width="64" height="14" rx="7" />

        <rect className="fig__painel" x="270" y="88" width="150" height="214" rx="8" />
        <circle className="fig__acento-fio" cx="345" cy="118" r="14" />
        <path className="fig__acento-fio fig__traco--grosso" d="M338 118 L343 123 L352 113" />
        <path className="fig__fio fig__fio--fraco" d="M345 132 V160" />
        <rect className="fig__fio" x="298" y="160" width="94" height="16" rx="4" />
        <rect className="fig__acento" x="298" y="188" width="94" height="16" rx="4" />
        <rect className="fig__fio" x="298" y="216" width="94" height="16" rx="4" />
        <rect className="fig__barra" x="298" y="256" width="60" height="6" rx="3" />
        <rect className="fig__barra" x="298" y="270" width="94" height="6" rx="3" />
      </Camada>

      {/* frente: a conversa no Telegram */}
      <Camada profundidade={20} duracao="5.4s">
        <path
          className="fig__painel fig__painel--alta"
          d="M416 120 H554 A16 16 0 0 1 570 136 V212 A16 16 0 0 1 554 228 H434 L416 242 V228 A16 16 0 0 1 400 212 V136 A16 16 0 0 1 416 120 Z"
        />
        <rect className="fig__forte" x="420" y="142" width="110" height="7" rx="3.5" />
        <rect className="fig__barra" x="420" y="158" width="130" height="6" rx="3" />
        <rect className="fig__barra" x="420" y="174" width="90" height="6" rx="3" />
        <rect className="fig__acento" x="420" y="196" width="60" height="12" rx="6" />
        <circle className="fig__estado" cx="566" cy="124" r="7" />

        <path
          className="fig__painel"
          d="M444 260 H556 A14 14 0 0 1 570 274 V302 A14 14 0 0 1 556 316 H444 A14 14 0 0 1 430 302 V274 A14 14 0 0 1 444 260 Z"
        />
        <circle className="fig__acento" cx="454" cy="288" r="9" />
        <path className="fig__traco-contraste" d="M449 288 L453 292 L460 284" />
        <rect className="fig__forte" x="472" y="284" width="80" height="8" rx="4" />
      </Camada>

      {/* os fios, parados: proposta → portão, e portão → registro */}
      <path className="fig__acento-fio fig__tracejado" d="M230 195 H270" />
      <circle className="fig__acento" cx="230" cy="195" r="4" />
      <path className="fig__acento-fio fig__tracejado" d="M345 302 V352" />
      <circle className="fig__acento" cx="345" cy="352" r="4" />
    </svg>
  )
}
