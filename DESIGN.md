# Design System: Portfólio — Pedro Augusto Darolt

Documento normativo. Nenhuma linha de markup, CSS ou copy deve contrariar o que está
aqui. Os valores desta página existem como custom properties em
`src/estilos/tokens.css` — **nunca escreva um hex direto no componente.**

Toda escolha abaixo vem acompanhada da medição que a sustenta, e `npm run contraste`
recalcula essas medições a cada push. Afirmação sobre renderização é **medida no
navegador**, nunca deduzida da leitura do CSS: especificidade e cascata derrubam
dedução.

## 0. Origem, e o que isso obriga

A direção visual foi construída a partir de **matteodante.it**, medida no Chrome em
20/08/2026 a pedido do autor: a paleta, os easings e a gramática de movimento (barra de
progresso, sequência de abertura, marquee, capítulos numerados com numeral fantasma,
trilho horizontal fixado) vêm de lá.

**A tipografia não vem mais de lá.** Em 25/08/2026 o autor pediu "uma fonte mais clean e
limpa", e as famílias da referência (Orbitron e Rajdhani) saíram. A família de display e
de prosa passou a ser **Sora** — a mesma do banner que o Pedro desenhou para o próprio
LinkedIn, o que fecha a continuidade entre LinkedIn e portfólio (§3).

Isso obriga duas coisas, e as duas são normativas:

1. **O rodapé declara a origem, em texto, na página.** Um site que copia a direção de
   outro e não diz é um site que aposta que ninguém vai reconhecer. Dizer custa uma
   linha e transforma uma dívida em escolha.
2. **O conteúdo é inteiramente do Pedro.** Nenhuma frase, número, projeto ou
   vocabulário do site de origem entra aqui. Em particular: **não existe metáfora de
   aviação ou espaço**, não existe personagem 3D, e nenhum texto é traduzido de lá.

---

## 1. Tema visual e atmosfera

**Passagem.** O site não abre numa página: abre numa sequência. O título do hero apaga
e encolhe conforme a pessoa rola, uma frase entra por cima, uma faixa de tecnologias
atravessa a tela, e só então começa o primeiro capítulo. O gesto que a página pede é
rolar.

- **Densidade 4.** Uma coisa por vez, em tela cheia. O oposto do `radar-licitacoes-pa`
  (densidade 8, muitos registros de uma vez) porque a função é outra: lá se consulta,
  aqui se percorre.
- **Variância 7.** Escala tipográfica extrema entre o display e o corpo, blocos de
  altura de viewport, um trilho que rompe a vertical. O gesto gráfico é parte do
  argumento — mas nunca por cima da leitura.
- **Movimento 7.** Movem-se oito coisas, listadas em §7. É a maior mudança em relação
  a qualquer coisa que o Pedro publicou antes, e é deliberada.

### 1.1 A regra que o movimento não pode quebrar

> **O estado base de todo elemento animado é o estado final.**

O JavaScript apenas **acrescenta** movimento; nunca é ele que torna algo visível. Com o
bundle bloqueado, a rede caindo ou `prefers-reduced-motion` ligado, a página fica
inteira, legível e navegável — só parada. Um reveal que começa invisível esconde a
página quando o JS falha, e é assim que portfólio some da tela de um recrutador.

---

## 2. Paleta e papéis

Um único acento (laranja) e uma única cor de estado (âmbar). Contraste mínimo
obrigatório: **4,5:1** para texto, **3:1** para borda de controle e ícone.

### 2.1 Escuro (canônico)

| Papel | Hex | Uso |
| --- | --- | --- |
| Papel | `#05060A` | fundo da página |
| Superfície | `#14120F` | cartão do trilho |
| Superfície alta | `#1F1C18` | placa do projeto sem captura |
| Tinta | `#D4CFC5` | texto corrido |
| Tinta forte | `#F2EDE3` | títulos, nomes, valores |
| Tinta fraca | `#8A8680` | rótulo, selo, metadado |
| Acento | `#FF6B35` | sobrancelha, link, botão primário, progresso, numeral de capítulo |
| Acento contraste | `#05060A` | texto **sobre** o preenchimento do acento |
| Estado (âmbar) | `#FFB347` | única cor de estado semântico |
| Fio | `#26221D` | divisória decorativa |
| Fio estrutural | `#6E6960` | borda de controle, contorno de cartão |

**Medições (escuro):** texto 13,05:1 · tinta forte 17,36:1 · tinta fraca 5,60:1 ·
acento 7,14:1 · acento sobre superfície 6,59:1 · fio estrutural 3,72:1 (papel) e
3,43:1 (superfície) · estado 11,37:1.

### 2.2 Claro

| Papel | Hex |
| --- | --- |
| Papel `#F2EDE3` · Superfície `#E4DDCF` · Superfície alta `#D9D1C0` |
| Tinta `#14120F` · Tinta forte `#05060A` · Tinta fraca `#57534B` |
| Acento `#9A3A0C` · Acento contraste `#F2EDE3` · Estado `#7A4E00` |
| Fio `#D2CABA` · Fio estrutural `#7E7768` |

**Medições (claro):** texto 16,02:1 · acento 6,03:1 · fio estrutural 3,81:1.

### 2.3 As duas correções que a acessibilidade exigiu

1. **Texto sobre o botão laranja.** O creme `#F2EDE3` sobre `#FF6B35` mede **2,43:1** e
   reprova. O texto do botão primário e do `::selection` é o **fundo da página**
   (`#05060A`), que mede **7,14:1**. Herdar o foreground da seleção reprova a 1.4.3
   num estado que qualquer pessoa alcança com `Ctrl+A`.
2. **Fio estrutural.** O par superfície/papel mede 1,08:1 — diferença decorativa. Todo
   bloco operável é delimitado pelo **fio estrutural** (`#6E6960`, 3,72:1 / 3,43:1),
   nunca pelo preenchimento da superfície.

### 2.4 Regra de tema em três estados (obrigatória)

Nenhuma cor nasce dentro de media query. Esta direção é **escura por natureza**: o
`:root` canônico é o escuro, e o claro é a variante.

```css
:root { /* paleta ESCURA completa */ }
@media (prefers-color-scheme: light) {
  :root:not([data-tema="escuro"]) { /* só REDEFINE */ }
}
:root[data-tema="claro"] { /* só REDEFINE */ }
```

O alternador é **texto** (`claro` / `escuro`), persiste a escolha e escreve `data-tema`
na raiz. Um script inline e síncrono no `<head>` aplica a escolha **antes da primeira
pintura** — sem ele, a página nasce com o tema do sistema e troca depois.

**O rótulo do alternador não entra no render.** Os dois rótulos são renderizados e o CSS
mostra o que vale, pela mesma cascata acima. Calculá-lo com `matchMedia` durante o
render fazia servidor e cliente divergirem: React error #418 no console do build de
produção.

---

## 3. Tipografia

Duas famílias, cinco cortes, **auto-hospedadas** em `public/fonts/` (subconjunto latin,
um arquivo variável por família, licença OFL) e pré-carregadas no `<head>`. O `<link>`
do Google Fonts saiu em 25/08/2026: era a maior fatia do caminho crítico — 334 ms de
401 ms até o `DOMContentLoaded` — e um terceiro domínio antes da primeira pintura.

- **Display e prosa — `Sora` 400/600/700.** Uma família só para título e texto: é a
  do banner do LinkedIn do Pedro, geométrica, de altura-x generosa, e desenha til,
  cedilha e agudo sem remendo. Display em **600 (H3) e 700 (H1, H2)**, prosa em 400,
  destaque em 600.
- **Dado — `JetBrains Mono` 400/500**, com `tabular-nums`. Continua sendo a única voz
  em caixa alta.

| Papel | Regra |
| --- | --- |
| H1 | `clamp(2.25rem, 6.2vw, 4.75rem)` · 700 · `line-height: 1.04` · `letter-spacing: -0.025em` |
| H2 | `clamp(2rem, 5.2vw, 4rem)` · 700 · `line-height: 1.06` · `letter-spacing: -0.02em` |
| H3 | `clamp(1.125rem, 1.8vw, 1.375rem)` · 600 · `line-height: 1.2` · `letter-spacing: -0.01em` |
| Corpo | `1.0625rem` / `1.65` · medida `min(58ch, 100%)` |
| Sobrancelha | mono 500 · `1rem` · caixa alta · `letter-spacing: 0.32em` |
| Passagem | `clamp(1.5rem, 3.4vw, 2.75rem)` · 700 · medida `min(22ch, 100%)` |
| Numeral fantasma | `min(20vw, 16rem)`, contornado, Sora 700 |
| Marquee | Sora 700, caixa alta, contornado alternando com cheio |

Por que Sora e não a resposta óbvia: `Inter` é banida (§11), e das famílias limpas
disponíveis a única que o Pedro **já usa em público** é a Sora. Um recrutador abre o
LinkedIn e o portfólio na mesma tarde; a fonte igual é o que diz que é a mesma pessoa.

### 3.1 Regras duras

1. **Nada abaixo de 14px**, e nada abaixo de 16px em texto corrido.
2. **Display em caixa baixa.** Título em caixa alta era a voz do Orbitron; em Sora,
   caixa alta em 4rem grita e a direção deixou de gritar. Caixa alta fica restrita ao
   mono (sobrancelha, selo, rótulo, link externo) e ao marquee, que é uma fita de nomes
   de tecnologia — rótulo, não frase.
3. **O remendo do til saiu junto com o Orbitron.** Existia um `@font-face` "Til
   Correto" em `tokens.css` que roubava seis pontos de código (`ã õ Ã Õ ñ Ñ`) do
   Orbitron, porque ele desenhava o til como crase. A Sora desenha o til; o remendo
   foi removido, e a verificação é a mesma de sempre: **olhar o glifo no navegador**,
   não confiar na tabela de cobertura da fonte.
4. **Mono é a voz de todo DADO; Sora é a voz de toda PROSA.** Frase com sujeito e
   verbo é Sora, sempre. Prosa em mono é proibida.
5. **Tracking negativo só em display.** Corpo e mono nunca levam tracking negativo:
   a Sora tem altura-x alta e fecha demais abaixo de 1.25rem.
6. **Teto de display em `em`, nunca em `ch`.** O `ch` muda com a fonte de fallback,
   e o título trocava de número de linhas quando a Sora chegava — 79px de salto no
   hero em inglês, medido. `13.75em` no H1, `10.75em` no H2 dos capítulos.
7. **A pilha tem um fallback ajustado por métrica** (`"Sora Fallback"`, `size-adjust`
   113,7% em 400 e 108,6% em 600/700, medidos contra a Segoe UI): a troca de fonte
   não move o layout. `size-adjust` é o descritor que importa, porque a entrelinha
   do site é numérica.
8. Separador de milhar pt-BR: **1.563**, nunca `1,563`.
9. **Banido:** `Inter`, serifa, `#000000`, gradiente em título, barra de proficiência,
   CSS de fonte servido por terceiro no caminho crítico.

---

## 4. Layout

- Contêiner `76rem`, `padding-inline: var(--recuo-pagina)` (1,5rem; 1rem abaixo de 480px).
- Altura cheia só com `100svh`, nunca `100vh`.
- **`overflow-x: hidden` no `body` é proibido**: mata `position: sticky` nos
  descendentes, e esta direção depende de sticky em dois lugares. Estouro se corrige na
  origem.
- Alvo de toque mínimo **48px**. Nada que contenha texto tem altura fixa em px.

### 4.1 As cinco armadilhas de encolhimento, todas medidas

Item de grid e de flex nasce com `min-width: auto`, que resolve para o conteúdo mínimo:
mesmo com a trilha declarada `minmax(0, 1fr)`, o item se recusa a encolher e vaza. Por
isso **todo item que hospeda texto leva `min-inline-size: 0`**, em cascata.

E mais quatro, cada uma encontrada no navegador e nenhuma visível como "caixa fora da
tela":

1. `display: grid` sem colunas declaradas cria trilha `auto`, que dimensiona por
   **max-content** e ignora a largura do pai. Toda grade de coluna única declara
   `grid-template-columns: minmax(0, 1fr)`.
2. Linha nomeada que some numa media query vira **trilha implícita** com aquele nome,
   dimensionada pelo conteúdo. Colapsar a grade exige redeclarar `grid-column`.
3. Medida em `ch` e tamanho em `rem` **dobram no zoom de texto**. Medida é sempre
   `min(62ch, 100%)`; o numeral fantasma é `min(20vw, 16rem)`, preso à viewport.
4. `white-space: nowrap` numa linha de dado estoura nos dois extremos: em 320px e de
   novo em qualquer largura com zoom a 200%.

### 4.2 Estouro horizontal é falha crítica

`documentElement.scrollWidth > innerWidth` precisa ser `false` em **320, 390, 768,
1024, 1280, 1366 e 1440px**, e também com **zoom de texto a 150% e 200%** — medido no
navegador com `scripts/medir.html`, que carrega o site em iframes da largura exata de
cada breakpoint.

---

## 5. Componentes

**Anel de foco:** `outline: 2px solid var(--acento)` com `outline-offset: 3px`, em tudo
que recebe foco. **Nenhum container que hospede elemento focável pode ter
`overflow: hidden`** — é o que recorta o anel.

- **Cabeçalho** — fixo, `72px`, minimalista: retrato + nome à esquerda; `PT · EN`,
  alternador de tema e **um** botão em pílula à direita. **Não há navegação de
  capítulos:** a página é uma passagem, e com os cinco capítulos a barra somava mais que
  o contêiner e quebrava em duas linhas, cobrindo o hero.
- **Botão** — dois tipos. Primário: preenchimento no acento, texto no fundo da página.
  Secundário: contorno no fio estrutural. `:disabled` **não existe neste site**: se a
  ação não pode acontecer, o botão não nasce.
- **Link externo** — um `<a>` único envolvendo ícone e texto **visível**,
  `rel="noopener noreferrer"`, seta como parte do conteúdo. O sublinhado desce 3px no
  hover. **Proibido:** `<a>` vazio esticado por cima de texto que não pertence ao link.
- **Cartão do trilho** — captura no topo, índice e selo, nome em display, resumo, faixa
  técnica, dois destinos separados. Nunca o cartão inteiro clicável.
  **Translúcido, não opaco**: o fundo é `color-mix(in oklab, var(--superficie) 54%,
  transparent)` e a borda é o fio estrutural a 55%, para o numeral fantasma e o papel
  aparecerem através dele conforme desliza. Não há `backdrop-filter`: sete cartões com
  desfoque de fundo movendo-se a cada quadro custam repintura inteira da pista, e o
  papel atrás é chapado — não há o que desfocar. Raio `10px` (o único lugar do site
  acima de `--raio`), captura recortada pelo mesmo raio em `.cartao__captura`
  (`overflow: clip` **só ali**, que não hospeda foco), realce de 1px na aresta superior
  e sombra tingida no papel. Atrás da pista há uma vinheta radial no acento a 8% —
  o mesmo recurso do banner do LinkedIn do Pedro — pintada uma vez, no fundo estático
  da pista, para o translúcido ter o que deixar passar. O contraste do texto sobre o cartão fica entre os dois
  pares medidos — texto sobre superfície e texto sobre papel — porque a mistura só
  interpola entre esses dois fundos. **Todo `color-mix` fica sob `@supports`**, com
  fallback explícito fora (cartão opaco, sem vinheta): o Lightning CSS do Tailwind
  gerava como fallback da vinheta o acento a 100% — uma mancha laranja em navegador
  sem `color-mix`.
- **Marquee** — o grupo é duplicado no DOM para o laço não ter emenda, e a **segunda
  cópia é `aria-hidden`**: sem isso o leitor de tela lê a lista duas vezes.
- **Numeral fantasma** — `aria-hidden` e redundante por construção: o mesmo número
  aparece em texto na sobrancelha.
- **Sobrancelha** — o fio de 56×2px é `position: absolute`, **não** um item de flex.
  Como item de flex ele ficava órfão numa linha própria (com `wrap`) ou impedia o texto
  de quebrar e estourava a página (com `nowrap`).

---

## 6. Arquitetura de seções

| # | Seção (PT) | Section (EN) | O que prova |
| --- | --- | --- | --- |
| — | Abertura + passagem | Opening + transition | Nível pretendido, lugar, e o diferencial numa frase |
| — | Faixa de tecnologias | Technology band | Amplitude real da stack |
| 01 | Aplicações web | Web applications | Ponta a ponta: interface, API, banco e deploy |
| 02 | IA em produção | AI in production | Integração de Anthropic e Gemini com alçada e registro |
| 03 | Sites e landing pages | Websites & landing pages | Página de captação no ar, e a falha de rate limiting corrigida |
| 04 | Projetos (trilho) | Projects (rail) | Frequência de publicação e higiene: o link funciona hoje |
| 05 | Experiência | Experience | O "roda em produção" tem empregador, cidade, período e número |
| 06 | Sobre | About | Stack, formação em curso, idiomas |
| 07 | Contato | Contact | É trivial chamá-lo, e ele diz o que procura |
| — | Colofão | Colophon | As medidas da própria página, e a origem da direção |

### 6.1 Os três capítulos de capacidade

São o equivalente às três seções de serviço do site de referência, com uma
diferença que importa: lá são **ofertas de um freelancer**; aqui são **capacidades
de um candidato**. Nenhuma promete trabalho — todas descrevem trabalho feito.

**O terceiro capítulo é "sites e landing pages", não "e-commerce".** A referência
tem e-commerce; o dossiê do Pedro não tem um único projeto de loja, checkout ou
pagamento. Copiar o rótulo obrigaria a inventar capacidade, que é exatamente o
defeito que estoura na primeira entrevista técnica. Fidelidade à referência para
no ponto em que ela exigiria mentir.

**O carro-chefe não tem mais capítulo próprio: entra como cartão 01 do trilho.**
As quatro decisões de engenharia dele não cabem num cartão e saíram da página —
continuam inteiras no README, a um clique. É a troca que esta direção cobra.

O `<h2>` é **sempre a palavra comum** — *Experiência*, *Projetos*, *Sobre*. Se o
recrutador não achar "Experiência" num `Ctrl+F`, ou o ATS não indexar, a direção falhou
por mais bonita que esteja.

### 6.2 As figuras dos capítulos

Cada capítulo de capacidade é uma grade de **duas colunas iguais quando cabem duas
colunas de 27rem** — a partir de 1024px na fonte padrão: texto de um lado, figura do
outro, alternando — **01 e 02 com a figura à esquerda e o texto à direita; 03 com o
texto à esquerda e a figura à direita**, a pedido do autor. A figura do 03 encosta na
borda direita (`justify-self: end` no irmão seguinte ao texto), espelhando as outras.
Abaixo disso vira coluna única na ordem do DOM, e a figura encolhe para
`max-inline-size: 22rem`.

**A decisão de duas colunas é em rem, não no breakpoint em px** (`auto-fit` com
`minmax(min(100%, 27rem), 1fr)`): no zoom de texto a 200% os 27rem viram 864px e a
grade volta sozinha a uma coluna. Com `1fr 1fr` fixo o parágrafo ficava com ~20
caracteres por linha a 200% (WCAG 1.4.4) — e o gate de estouro não pegava, porque
nada estourava.

**A alternância é feita na ordem do DOM, não com `order` nem `grid-template-areas`.**
A figura é decorativa (`aria-hidden`, sem nada focável), então a ordem em que ela
aparece no DOM não muda a leitura — e a regra §9.7 continua inteira.

**O que a figura é.** Uma composição em SVG inline, construída no repositório, que
desenha o *mecanismo* daquele capítulo — não uma captura, não uma ilustração genérica:

| # | Figura | O que desenha |
| --- | --- | --- |
| 01 | `FiguraCamadas` | Três painéis em profundidade: interface (janela com barra, coluna e gráfico), API (rotas com selo de resposta) e banco (cilindro), ligados por um fio no acento — "ponta a ponta" |
| 02 | `FiguraAlcada` | Proposta → portão de aprovação com três degraus de alçada (um aceso) → mensagem no Telegram, com a trilha de registro embaixo — "propõe, nunca decide" |
| 03 | `FiguraCaptacao` | Página com formulário em primeiro plano e, atrás, o contador de rate limit com o sexto envio barrado em âmbar — "formulário público sem limite é porta aberta" |

Regras das figuras, todas normativas:

1. **Nenhum hex, nenhum texto.** Cor vem dos tokens via `currentColor` e custom
   properties, para seguir os dois temas. Texto dentro de SVG dependeria de fonte
   carregada e de idioma; a figura usa barras no lugar de texto, como esqueleto.
2. **Não expõe tela interna.** O BI comercial e o agente de compras são sistemas da
   Norte; a figura desenha o mecanismo, não a tela.
3. **Camadas separadas por `<g>`**, cada uma com a própria profundidade, porque o
   movimento de §7.8 desloca cada camada numa taxa diferente.
4. **Sem `id` interno** (gradiente, máscara, filtro): o SVG entra três vezes na
   página e `id` repetido é HTML inválido. Sem filtros de desfoque: custam repintura.
5. **Coordenadas com no máximo uma casa decimal.**
6. **Nunca ultrapassa a coluna.** `inline-size: 100%` com `aspect-ratio` fixo, e a
   coluna é `minmax(0, 1fr)` — a figura não tem como pedir largura própria.

---

## 7. Movimento

Movem-se oito coisas. Só `transform`, `opacity` e `color` — nunca `width`, `height`,
`top` ou `left`.

1. **Barra de progresso** no topo, `scaleX(var(--progresso))`, escrita por `rAF`.
2. **Sequência de abertura:** o hero apaga e encolhe (`opacity`, `scale`, `translateY`)
   e a frase de passagem entra. Lê só `scrollY` e `innerHeight` — nunca a posição de um
   elemento, que forçaria recálculo de layout a cada quadro.
3. **Marquee**, duas fitas em sentidos opostos, 46s e 58s, `linear`, infinito.
4. **Entrada de capítulo:** `opacity` + `translateY(28px)`, 0,9s, `ease-out-expo`, uma
   vez só, por `IntersectionObserver`.
5. **Trilho horizontal** (§8).
6. **Estados de interação:** 0,18s em cor, borda e sublinhado; `:active` recua 1px.
7. **Flutuação das figuras (§6.2):** cada camada levita num laço `translateY` de
   ±5px, `ease-in-out`, alternado, infinito, com durações **diferentes por camada**
   (5,4s · 6,6s · 7,8s) para as três nunca subirem juntas. O que anima é o `<g>` da
   camada, via `transform` em CSS, porque o que precisa mover é a camada e não a
   figura inteira. O contêiner da figura **não** anima, para o `perspective` do
   item 8 ficar parado.
8. **Paralaxe do ponteiro:** só com `(hover: hover) and (pointer: fine)`. O hook
   `useParalaxe` ouve `pointermove` na **seção inteira** (não na figura: a pessoa
   está lendo o texto, e a figura responder ao lado é o que a faz parecer parte da
   página), converte a posição para −1…1 **em relação à viewport** (`clientX /
   innerWidth`, sem `getBoundingClientRect` — nenhuma leitura de layout por quadro)
   e escreve `--dx`/`--dy` **em cada camada**, já multiplicados pela profundidade
   dela, um `requestAnimationFrame` por evento. A figura inteira inclina até 4° em
   `rotateX`/`rotateY` sob `perspective: 1200px`. Ao sair, `pointerleave` zera e a
   transição de 0,7s em `ease-out-expo` traz tudo de volta. Toque não participa:
   sem ponteiro fino, resta a flutuação.

**Os itens 7 e 8 param inteiros em `prefers-reduced-motion`**, e a figura fica parada
na posição de repouso — que é o estado base de cada camada (§1.1).

### 7.1 Rolagem contínua nunca vira estado do React

Os valores derivados da rolagem são escritos **direto em custom properties**, por
`requestAnimationFrame`, e o CSS os lê num `transform`. Guardá-los em `useState`
re-renderizaria a árvore a cada quadro — sete cartões com imagem, sessenta vezes por
segundo. Estado do React é para o que muda em **passos discretos**, como o índice do
cartão corrente: seis vezes numa página inteira, não sessenta por segundo.

E a escrita vai no **menor elemento que usa a variável**, nunca no `:root`: custom
property no elemento raiz é herdável, e cada escrita invalidaria o estilo da árvore
toda. As variáveis animadas são registradas com `@property { inherits: false }`, o que
para a invalidação no elemento que recebeu a escrita.

> **Nota de método.** Cheguei a medir "1 fps" nesta página e a mudar CSS por causa
> disso. A medição estava errada: `requestAnimationFrame` não dispara em aba em
> segundo plano, e a aba de teste estava com `visibilityState: "hidden"`. As mudanças
> acima continuam certas por mérito próprio; o contorno de texto do marquee, que eu
> havia removido, voltou. Medição também precisa ser verificada.

**`prefers-reduced-motion: reduce` desliga tudo**, e o trilho nem sequer prende. Nenhum
conteúdo depende de animação para existir, em nenhum dos dois modos.

---

## 8. O trilho horizontal, e as quatro garantias

A seção tem **4 telas** de altura. O miolo fica `sticky` em duas colunas: o bloco de
texto parado à esquerda, a pista à direita sangrando até a borda da tela.

**O recorte acontece na pista, não na lista.** O `transform` move a caixa inteira da
lista, e `overflow` na própria lista clipa o conteúdo dela, não a caixa: medido, os
cartões passavam por cima do bloco de texto e o cobriam. A pista recebe
`overflow-x: clip` com `overflow-y: visible` — nunca `hidden`, que criaria contexto de
rolagem e mataria o `sticky` do palco — e só enquanto o deslizamento está ativo, via
`:has()`.

1. **Teclado.** Quando o foco **de teclado** entra na lista, o deslizamento **desliga**: o `transform`
   sai, `overflow-x` volta a `auto`, e um efeito traz o elemento focado à vista com
   `scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' })`.
   Isso é obrigatório e foi medido: sem ele, o link do último cartão recebia foco em
   **x=2193 numa janela de 1440** — foco fora da tela. Uma vez desligado, fica
   desligado: religar jogaria fora onde a pessoa estava.
   **Só teclado**, e a distinção é `:focus-visible`: `onFocusCapture` dispara também
   no clique de mouse num link do cartão, e como o desligamento é definitivo, um
   clique matava a animação pelo resto da visita — num trilho cujos links todos
   abrem em nova aba, ou seja, exatamente o gesto mais comum ali.
   Enquanto o deslizamento está desligado, o contador, a barra e o nome passam a
   ler a rolagem **nativa** da lista. Antes eles congelavam: a pessoa navegava até
   o cartão 07 e o rodapé continuava anunciando "01 / 07".
   *Verificado:* 14 paradas de foco no trilho (7 cartões), todas alcançáveis.
2. **Celular.** Abaixo de 768px o efeito não existe — lista vertical, sem prender, sem
   rodapé de trilho. *Verificado:* `position: static`, `flex-direction: column`.
3. **Movimento reduzido.** Mesma coisa.
4. **Sem JavaScript.** A lista nasce como lista com rolagem horizontal nativa.

O contador `03 / 07`, a barra e o nome corrente são `aria-hidden`: quem não vê o
deslocamento não ganha nada com a posição dele, e a `<ul>` já anuncia o total.

---

## 9. Acessibilidade

1. Contraste **medido**, recalculado no CI. Alterar token exige remedir e atualizar o
   colofão.
2. **Cor nunca é o único portador.** Todo selo é palavra escrita: `no ar`,
   `sem demo pública`, `sistema interno`. Idioma é o texto `PT · EN`, nunca bandeira.
3. **Um destino = um `<a>`** envolvendo ícone e texto visível.
4. O e-mail é o texto do próprio link; `copiar` é um **botão separado**, com nome
   acessível próprio e retorno anunciado por `aria-live="polite"`.
5. `:focus-visible` em tudo, sem ancestral com `overflow: hidden`.
6. **Zoom de texto a 200% sem estouro**, medido nas sete larguras.
7. Ordem do DOM = ordem de leitura. Sem `order`.
8. Hierarquia de headings sem salto; um `<h1>` por página; landmarks e skip link.
9. Imagens com `alt` descritivo, `width`/`height` reais e `loading="lazy"` fora do hero.
10. Elemento decorativo nasce `aria-hidden` **e** é redundante por construção.
11. A página funciona inteira com o JavaScript falhando: o build pré-renderiza ~58 mil
    caracteres de HTML por idioma.

---

## 10. Gate de publicação

1. **Currículo (PDF) liberado.** Os arquivos existem em `public/`. O CTA primário só
   vai ao ar se o caminho publicado responder 200 no dia do deploy.
2. **EN só com revisão humana.** O texto em português aponta para a versão em inglês
   como prova do inglês dele — o que torna a revisão obrigatória, não recomendável.
3. **Medição obrigatória antes de declarar pronto**, no navegador: estouro nas sete
   larguras e nos dois zooms, console limpo, foco alcançável no trilho, fallback de
   celular. "Compilou" não é prova.
4. **Nenhum número na tela sem origem verificável.**

---

### 10.1 Regras editoriais que os testes cobram

Estas não eram normativas em lugar nenhum — os testes as exigiam e o documento
não as dizia, o que é a mesma dívida ao contrário: a regra existia só na cabeça de
quem escreveu o teste.

- **A empresa júnior não chama o trabalho dela de "cliente".** Trabalho de empresa
  júnior é trabalho de empresa júnior; a palavra empresta um porte que não houve.
- **Quem tem código fechado explica por quê**, com a frase daquela entrada — nunca
  uma justificativa genérica repetida.
- **Toda decisão de engenharia carrega procedência**, e nenhuma procedência se
  repete: carimbo repetido é sinal de par trocado.
- **Todo número exibido é número**, não adjetivo.
- **Todo projeto tem pelo menos um link.** Cartão sem saída não entra.

---

## 11. Banido

Metáfora de aviação ou espaço · personagem ou objeto 3D · Three.js · qualquer texto
traduzido do site de origem · `Inter` · serifa · `#000000` · gradiente em título · barra
de proficiência com porcentagem · contador de "projetos concluídos" · `<a>` vazio com
`.sr-only` · cursor customizado · preloader · texto que se digita sozinho · bandeira
como seletor de idioma · `overflow-x: hidden` no `body` · `order` no CSS · botão
desabilitado · spinner (carregamento é esqueleto com as dimensões reais) ·
biblioteca de animação (`motion`, `framer-motion`, GSAP): os oito movimentos de §7
são CSS e `requestAnimationFrame`, e 30 kB de runtime para levitar três figuras é
peso morto · `backdrop-filter` em elemento que se move a cada quadro.
