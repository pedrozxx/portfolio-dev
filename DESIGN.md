# Design System: Portfólio — Pedro Augusto Darolt

Documento normativo da direção **Margem de Prova**. Nenhuma linha de markup, CSS ou
copy deve contrariar o que está aqui. Os valores desta página existem como custom
properties em `src/estilos/tokens.css` — **nunca escreva um hex direto no componente.**

Toda escolha abaixo vem acompanhada da medição que a sustenta. Onde houver divergência
em relação ao `DESIGN.md` do `radar-licitacoes-pa` ou aos banners de LinkedIn, a
divergência está escrita, com o número que a justifica. Afirmação sobre renderização é
**medida no navegador**, nunca deduzida da leitura do CSS — especificidade e cascata
derrubam dedução.

---

## 1. Tema visual e atmosfera

**Edição anotada.** A página é um texto estabelecido com o aparato de procedência ao
lado: a coluna larga carrega a afirmação, a coluna estreita carrega a fonte que a
sustenta. Fio de 1px em vez de cartão flutuando, capítulos numerados, entradas datadas,
número em mono tabular com a origem colada nele.

A metáfora vive **na estrutura** — duas colunas, fios, alinhamento de linha de base — e
**nunca na textura**. Sem papel envelhecido, sem serifa de jornal, sem carimbo
desenhado, sem grão, sem fibra, sem moldura. O que o leitor reconhece não é "papel
antigo": é *cada frase aqui tem endereço*.

- **Densidade 6.** O radar é 8 (cockpit: muitos registros de uma vez). Aqui o leitor lê
  prosa e decide em quinze segundos, então o respiro é maior — mas continua sendo
  documento, não vitrine. Por ser densidade acima de 5, **todo número é monoespaçado e
  tabular**, sem exceção.
- **Variância 4.** Assimetria estrutural fixa (aparato à esquerda, texto à direita) e
  simetria dentro de cada capítulo. O gesto gráfico não compete com a leitura.
- **Movimento 2.** Movem-se exatamente três coisas (§7). Nada se move entre o topo da
  página e o capítulo do Radar, e **nada se move no capítulo de Experiência** — é o
  texto que o recrutador precisa ler devagar, copiar e imprimir.

### 1.1 A regra que governa o conteúdo, não a superfície

> **Se não existe o que escrever na margem, a afirmação não entra na página.**

Esta é a assinatura da direção, e ela é uma regra editorial, não um objeto gráfico. É a
tradução em layout do comportamento que o software dele já tem: `soma 169 de 174 — o
PNCP não informou valor em 5`, e `truncado` em vez de lista fingida. Um número sem
procedência não é sóbrio: é inventado.

---

## 2. Paleta e papéis

Um único acento (teal petróleo) e **uma única cor de estado semântico** (âmbar). A cor
de estado nunca é decorativa e nunca aparece sozinha — todo estado também é palavra
escrita.

Contraste mínimo obrigatório: **4,5:1** para texto, **3:1** para borda de controle e
ícone. Todos os pares abaixo foram **recalculados** para esta paleta (luminância
relativa WCAG 2.x), não copiados de outro documento.

### 2.1 Claro (canônico)

| Papel do token | Hex | Uso |
| --- | --- | --- |
| Papel | `#FBFAF7` | fundo da página, off-white levemente quente |
| Superfície | `#F2EFE8` | só bloco de citação, caixa de decisões do Radar e caixa de imagem. Nunca cartão com sombra |
| Tinta | `#16181C` | texto, títulos, valores. Nunca `#000000` |
| Tinta Fraca | `#5B5F66` | rótulo, unidade, carimbo de procedência, colofão |
| Acento | `#0E6E63` | link, sobrancelha, anel de foco, preenchimento do CTA primário, fio da margem |
| Estado (âmbar) | `#8A5800` | **única** cor de estado semântica |
| Fio decorativo | `#E0DBD0` | só separa. Proibido como borda de controle |
| Fio estrutural | `#767E7C` | borda de elemento interativo, contorno de ícone, delimitação de bloco |

**Medições (claro):**

- Tinta `#16181C` sobre Papel `#FBFAF7` = **17,03:1** (mín 4,5) OK
- Tinta `#16181C` sobre Superfície `#F2EFE8` = **15,48:1** (mín 4,5) OK
- Tinta Fraca `#5B5F66` sobre Papel = **6,15:1** (mín 4,5) OK
- Tinta Fraca `#5B5F66` sobre Superfície = **5,59:1** (mín 4,5) OK
- Acento `#0E6E63` sobre Papel = **5,87:1** (mín 4,5) OK — link, sobrancelha, anel de foco
- Acento `#0E6E63` sobre Superfície = **5,33:1** (mín 4,5) OK
- Papel `#FBFAF7` sobre preenchimento Acento `#0E6E63` (CTA primário) = **5,87:1** OK
- Estado `#8A5800` sobre Papel = **5,79:1** (mín 4,5) OK
- Estado `#8A5800` sobre Superfície = **5,26:1** (mín 4,5) OK
- Fio estrutural `#767E7C` sobre Papel = **3,99:1** (mín 3,0) OK
- Fio estrutural `#767E7C` sobre Superfície = **3,62:1** (mín 3,0) OK
- Fio decorativo `#E0DBD0` sobre Papel = **1,32:1** — **REPROVA de propósito e está
  registrado**: é divisória puramente decorativa. Proibido como borda de campo, contorno
  de botão, delimitação de bloco operável ou portador de informação
- Superfície `#F2EFE8` sobre Papel `#FBFAF7` = **1,10:1** — diferença decorativa por
  decisão. Todo bloco é delimitado pelo **fio estrutural** ou por espaço, nunca pelo
  preenchimento da superfície

### 2.2 Escuro (de primeira classe, não "variante")

O escuro herda o fundo do banner v2 "Petróleo" que ele publicou no LinkedIn. Os dois
temas têm tokens completos e os mesmos pisos de contraste.

| Papel do token | Hex |
| --- | --- |
| Papel | `#0C1B22` |
| Superfície | `#17303A` |
| Tinta | `#EFF5F5` |
| Tinta Fraca | `#9FB3B8` |
| Acento | `#35C4B5` |
| Estado (âmbar) | `#D99A2B` |
| Fio decorativo | `#22414C` |
| Fio estrutural | `#6B939C` |

**Medições (escuro):**

- Tinta `#EFF5F5` sobre Papel `#0C1B22` = **15,93:1** OK · sobre Superfície `#17303A` = **12,53:1** OK
- Tinta Fraca `#9FB3B8` sobre Papel = **8,04:1** OK · sobre Superfície = **6,32:1** OK
- Acento `#35C4B5` sobre Papel = **8,13:1** OK · sobre Superfície = **6,39:1** OK
- Papel `#0C1B22` sobre preenchimento Acento `#35C4B5` (CTA primário) = **8,13:1** OK
- Estado `#D99A2B` sobre Papel = **7,20:1** OK · sobre Superfície = **5,66:1** OK
- Fio estrutural `#6B939C` sobre Papel = **5,25:1** OK · sobre Superfície = **4,13:1** OK
- Fio decorativo `#22414C` sobre Papel = **1,61:1** — decorativo declarado, mesmas
  proibições do claro
- Superfície `#17303A` sobre Papel `#0C1B22` = **1,27:1** — decorativo por decisão

> **Correção registrada.** O fio estrutural escuro `#5A8089`, herdado de um dos
> conceitos, mede **3,21:1** sobre a Superfície — 7% acima do piso de 3:1. Margem dessa
> ordem morre no primeiro ajuste de token. Subiu para `#6B939C`, que mede **4,13:1**
> sobre a Superfície e **5,25:1** sobre o Papel. **Nenhum ajuste no token de Superfície
> pode acontecer sem remedir este par.**

### 2.3 Seleção de texto (`::selection`)

O acento é fundo de seleção, então a **mesma regra fixa a cor do texto selecionado**.
Herdar o foreground da seleção reprova a 1.4.3 num estado que qualquer pessoa alcança
com `Ctrl+A` — e é o estado em que um recrutador copia o e-mail.

- Claro: `::selection { background: #0E6E63; color: #FBFAF7 }` → **5,87:1** OK
- Escuro: `::selection { background: #35C4B5; color: #0C1B22 }` → **8,13:1** OK

Medido para registro: sem foreground explícito, o par cairia em **1,96:1** (tinta clara
sobre teal escuro-claro) e **2,88:1** (tinta escura sobre teal). Os dois reprovam.

### 2.4 Regra de tema em três estados (obrigatória)

Nenhuma cor pode nascer dentro de uma media query. A ordem é sempre esta:

```css
:root { /* paleta CLARA completa — todos os tokens */ }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* só REDEFINE os tokens */ }
}

:root[data-theme="dark"] { /* só REDEFINE os tokens */ }
```

O alternador de tema é **texto** (`claro / escuro`), persiste a escolha e escreve
`data-theme` no elemento raiz. O `<body>` recebe `background: var(--papel)` explícito —
fundo transparente empresta o tema de quem hospeda a página.

### 2.5 Decisões de cor registradas (e as que foram recusadas)

1. **Acento teal, não âmbar.** O `#855511` proposto na direção original tem matiz
   **35,2°**, a mesma do `#E8A13D` do banner v1 — argumento correto de continuidade, e
   ainda assim recusado. Motivo verificável: gastar o âmbar como acento decorativo
   deixaria o site **sem cor de estado semântico**, contradizendo a regra do próprio
   Pedro ("cor de estado é semântica, nunca decorativa") nos dois artefatos que o mesmo
   recrutador abre na mesma tarde. Com teal, o âmbar continua livre para fazer aqui o
   mesmo trabalho que faz no radar.
2. **Continuidade de marca provada por medição, não por adjetivo.** O acento escuro
   `#35C4B5` é literalmente o do `banner_v2_petroleo.html` publicado no LinkedIn. O
   acento claro `#0E6E63` é o mesmo tom rebaixado para papel: **H=173,1° · S=87,3 ·
   V=43,1** contra **H=173,7° · S=73,0 · V=76,9** — **0,6° de diferença de matiz**.
   Mesma tinta, dois papéis.
3. **Âmbar de estado remedido.** O `#9E6500` do radar dá **4,66:1** sobre este papel —
   passa, mas com 3,5% de folga, e reprova em qualquer papel mais quente. Subiu para
   `#8A5800` = **5,79:1**. A matiz é **38,3°** nos dois temas (`#8A5800` e `#D99A2B`),
   idêntica à do âmbar do radar. **Não herde o token do radar sem remedir.**
4. **Este site NÃO afirma compartilhar o sistema do radar.** Medido em 20/08/2026, o
   `radar-licitacoes-pa` no ar usa `Geist` / `Geist Mono` e acento `#37B07C`
   (**H=154,2°**) — 19,5° de distância do acento daqui, e só o tema escuro implementado.
   A escolha registrada é herdar a **marca pessoal publicada** (banners do LinkedIn:
   Sora + JetBrains Mono + petróleo), porque é dela que o recrutador vem. Consequência
   normativa: o rodapé **nunca** escreve "mesmo sistema de design do Radar". Escreve que
   este site segue **este** `DESIGN.md`, e linka. Afirmação que não bate com a tela
   transforma rigor em folclore.

---

## 3. Tipografia

Duas famílias, três pesos. As duas no Google Fonts, as duas já usadas por ele nos
banners que desenhou para o próprio LinkedIn.

- **Display e prosa — `Sora`** (400, 600). Um único peso de display na página inteira.
- **Dado — `JetBrains Mono`** (400, 500), com `font-variant-numeric: tabular-nums`
  ligado globalmente em tudo que é número.

### 3.1 Escala

| Papel | Regra |
| --- | --- |
| H1 (hero) | Sora 600 · `clamp(2.35rem, 6.2vw, 4.5rem)` · `letter-spacing: -0.025em` · `line-height: 1.04` · `text-wrap: balance` |
| H2 (capítulo) | Sora 600 · `clamp(1.6rem, 3.2vw, 1.9rem)` · `-0.02em` · `text-wrap: balance` |
| H3 (item) | Sora 600 · `1.125rem` (18px) — hierarquia por **peso**, não por mais um tamanho |
| Corpo | Sora 400 · `1.0625rem` (17px) / `line-height: 1.62` · `text-wrap: pretty` · `hyphens: none` |
| Sobrancelha | JetBrains Mono 500 · `1rem` (16px) · caixa alta · `letter-spacing: 0.32em` (o valor exato dos banners dele) |
| Rótulo, unidade, período, stack, navegação, URL, nome de arquivo | JetBrains Mono 500 · `1rem` (16px) · `letter-spacing: 0.06em` |
| Carimbo de procedência (margem) | JetBrains Mono 500 (forte) / 400 (declarada) · `1rem` (16px) / `1.5` |
| Número dentro do corpo | JetBrains Mono 500 · `1.0625rem`, tabular |
| Número de destaque (régua de leituras) | JetBrains Mono 500 · `clamp(1.75rem, 4vw, 2.5rem)`, tabular |

### 3.2 Regras duras

1. **Nada abaixo de 16px em lugar nenhum do site** — carimbo de procedência, colofão e
   rodapé inclusive. É auditável com o inspetor aberto, e é a regra que o colofão vai
   declarar em público. A direção original especificava a margem em 13px: **corrigido
   para 16px**, e a coluna de texto encolheu para acomodar (§6.2), nunca o contrário.
2. **Mono é a voz de todo DADO; Sora é a voz de toda PROSA.** A fronteira é objetiva:
   *frase com sujeito e verbo é Sora, sempre*. Rótulo, número, data, período, medição,
   arquivo, URL, stack, sobrancelha e navegação são mono. **Prosa em mono é proibida** —
   monoespaçado é mais lento de ler em texto contínuo e lê como fantasia de dev.
3. **Medida máxima 62ch** em texto corrido (§6.2 explica a aritmética). O radar permite
   até 65ch; 62 está dentro do teto e é o que cabe ao lado do aparato em 1024px.
4. Separador de milhar pt-BR formatado por locale: **1.563**, nunca `1,563`, e nunca
   fixado na string de tradução.
5. Aspas curvas e travessão de verdade na prosa em português.
6. Carregamento de fonte: `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`,
   subset `latin` + `latin-ext`, **apenas os pesos usados** (Sora 400/600, JetBrains Mono
   400/500), `display=swap`, mais um `@font-face` de fallback com `size-adjust` casado
   com a métrica da Sora para conter CLS na troca.
7. **Banido:** `Inter`, `Orbitron`, qualquer serifa, `#000000`, gradiente em título. As
   três famílias atuais (Asap, Inconsolata, Maven Pro) saem — duas delas hoje são
   baixadas e nunca usadas.

---

## 4. Tokens

Lista completa e final. Nomes em português, como no radar. Arquivo:
`src/estilos/tokens.css`.

```css
:root {
  /* --- cor: claro (canônico) --- */
  --papel:            #FBFAF7;
  --superficie:       #F2EFE8;
  --tinta:            #16181C;
  --tinta-fraca:      #5B5F66;
  --acento:           #0E6E63;
  --acento-contraste: #FBFAF7;   /* texto sobre preenchimento de acento e ::selection */
  --estado:           #8A5800;   /* âmbar — ÚNICA cor de estado semântico */
  --fio:              #E0DBD0;   /* DECORATIVO: 1,32:1. Nunca borda de controle */
  --fio-estrutural:   #767E7C;   /* 3,99:1 — o único autorizado a delimitar algo operável */

  /* --- tipografia --- */
  --fonte:            "Sora", ui-sans-serif, system-ui, "Segoe UI", sans-serif;
  --fonte-mono:       "JetBrains Mono", ui-monospace, "Cascadia Code", monospace;
  --corpo:            1.0625rem;   /* 17px */
  --corpo-altura:     1.62;
  --mono-base:        1rem;        /* 16px — piso absoluto do site */
  --tracking-sobrancelha: 0.32em;
  --tracking-rotulo:      0.06em;
  --medida:           62ch;

  /* --- espaço (mesma escala do radar) --- */
  --e1: .25rem; --e2: .5rem; --e3: .75rem; --e4: 1rem;
  --e5: 1.5rem; --e6: 2rem;  --e7: 3rem;   --e8: 5rem;

  /* --- layout --- */
  --largura-maxima:   72rem;   /* 1152px */
  --largura-aparato:  12rem;   /* 192px = 20 caracteres de JetBrains Mono 16px */
  --gap-aparato:      2rem;
  --recuo-pagina:     1.5rem;
  --raio:             4px;     /* caixa de imagem e superfície */
  --raio-pilula:      999px;   /* SÓ o botão primário */
  --alvo:             48px;    /* alvo de toque mínimo */
  --proporcao-captura: 1483 / 812;

  /* --- movimento --- */
  --transicao:  .12s cubic-bezier(.2, 0, 0, 1);
  --entrada:    .18s cubic-bezier(.19, 1, .22, 1);
  --progresso:  0;             /* 0→1, escrito por rAF na assinatura */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --papel: #0C1B22; --superficie: #17303A;
    --tinta: #EFF5F5; --tinta-fraca: #9FB3B8;
    --acento: #35C4B5; --acento-contraste: #0C1B22;
    --estado: #D99A2B;
    --fio: #22414C; --fio-estrutural: #6B939C;
  }
}

:root[data-theme="dark"] {
  --papel: #0C1B22; --superficie: #17303A;
  --tinta: #EFF5F5; --tinta-fraca: #9FB3B8;
  --acento: #35C4B5; --acento-contraste: #0C1B22;
  --estado: #D99A2B;
  --fio: #22414C; --fio-estrutural: #6B939C;
}
```

Regras de uso dos tokens:

- Nenhum hex fora deste arquivo. Nenhum `rgba()` improvisado para "clarear um pouco".
- `--fio` nunca aparece sozinho delimitando bloco: se o bloco precisa de contorno, o
  contorno é `--fio-estrutural`.
- `--estado` só acompanha palavra escrita (`truncado`, `não informado`, `sem demo
  pública`, `código fechado`). Nunca colore um ícone sozinho.
- Ícones herdam `currentColor` — os 16 componentes em `src/componentes/icones/` já são
  TSX com `fill="currentColor"`, verificado por `grep`; nenhum hex gravado.

---

## 5. Componentes

Regra transversal, válida em todos: **anel de foco é `outline: 2px solid var(--acento)`
com `outline-offset: 2px`**, nunca `outline: none`, nunca só mudança de cor. Nenhum
container que hospede elemento focável pode ter `overflow: hidden` — é exatamente o que
recorta o anel hoje (`style.css:193, 326, 359`). E **nada que contenha texto recebe
altura fixa em px** — só `min-height` + `padding`.

### 5.1 Cabeçalho (`<header>`)

`position: sticky; top: 0`, `min-height: 56px`, fundo `--papel` sólido (sem blur), fio
inferior de 1px em `--fio-estrutural`.

- Esquerda: `PEDRO A. DAROLT` em mono 16px, `letter-spacing: .18em`, link para `#topo`.
- Centro (≥900px): âncoras numeradas `01`–`05` em mono. **Abaixo de 900px vira um
  `<details>`/`<summary>` nativo** — zero JS, zero focus trap, zero menu inventado.
- Direita: alternador `PT · EN` em texto, alternador de tema em texto (`claro`/`escuro`)
  e **um** botão primário em pílula: `Currículo (PDF)`.
- `scroll-margin-top: 72px` em toda âncora.
- **Nenhum ancestral pode ter `overflow-x: hidden`** (hoje em `style.css:31`): mata o
  `sticky` e esconde o estouro em vez de corrigi-lo.

Estados: `:hover` leva o texto para `--acento` em `--transicao`; `:focus-visible` desenha
o anel; `:active` recua 1px (`translateY(1px)`). A âncora da seção corrente ganha um fio
de 2px em `--acento` sob o número **e** `aria-current="true"` — dois portadores.

### 5.2 Botão

Dois e só dois tipos.

- **Primário:** preenchimento `--acento`, texto `--acento-contraste` (5,87:1 claro /
  8,13:1 escuro), `border-radius: var(--raio-pilula)`, `min-height: var(--alvo)`,
  `padding-inline: var(--e5)`. Existe em exatamente **dois** lugares: cabeçalho e
  contato.
- **Secundário:** sem preenchimento, borda de 1px em `--fio-estrutural` (3,99:1 /
  5,25:1), texto `--tinta`, mesmo `min-height`.

Estados (os dois): `:hover` troca a borda/fundo para `--acento` em 120ms; `:active`
`translateY(1px)`; `:focus-visible` anel de 2px em `--acento` com offset 2px.
`:disabled` **não existe neste site** — se a ação não pode acontecer, o botão não nasce.

### 5.3 Link externo

Um `<a>` **único** envolvendo ícone + texto **visível**, `rel="noopener noreferrer"`,
`target="_blank"`, seta `↗` como parte do conteúdo, `min-height: var(--alvo)`.

- Repouso: cor `--acento`, `text-decoration-thickness: 1px`, `text-underline-offset: 3px`.
- `:hover`: o sublinhado desce 2px (`text-underline-offset: 5px`) em 120ms. Só isso.
- `:active`: `translateY(1px)`.
- `:focus-visible`: anel de 2px em `--acento`, offset 2px.
- **Proibido:** `<a>` vazio esticado por cima de texto que não pertence ao link, com
  `.sr-only` fazendo o nome acessível (é o defeito de acessibilidade do site atual).
  Proibido também o bloco inteiro virar um único link.

### 5.4 Linha de projeto (o que substitui o "cartão de projeto")

Não é cartão: é **linha de registro**, sem sombra e sem raio grande, separada da seguinte
por `--fio` de 1px de borda a borda, `min-height: 56px`, `padding-block: var(--e5)`.

Composição, em grid: aparato à esquerda (índice `01/06` em mono + selo de categoria em
**texto**: `estudo`, `projeto integrador · UFPA`); texto no centro (H3 em Sora 600 18px,
uma frase técnica concreta, faixa de tecnologias, e **dois links separados** `Demo ↗` e
`Código ↗`, cada um com alvo de 48px); captura à direita.

- **Captura:** `<picture>` com AVIF + WebP 1x/2x já codificados em
  `src/assets/projetos/`, `width`/`height` reais (`1483×812`),
  `aspect-ratio: var(--proporcao-captura)`, `loading="lazy"`, `decoding="async"`, largura
  240px em ≥1024px. Abaixo de 768px a captura vai para o topo da linha, em largura cheia.
  **A caixa é reservada antes de o CSS chegar** — nunca há salto de layout.
- **Flappy Bird PI é o único sem captura.** Ele recebe uma **variante tipográfica
  desenhada** no mesmo slot (bloco em mono com o índice grande e a stack `Python ·
  Pygame`) e declara em texto `sem demo pública`. Nunca um buraco, nunca um botão morto.
- Cortar todas as imagens desta seção — como a direção original propunha — está
  **revogado**: 5 dos 6 projetos têm captura, já em AVIF/WebP no repositório. A premissa
  de que "Clube de Assinatura não tem captura" é falsa
  (`.brief/capturas/clube-assinatura.jpg`, 1483×812, 49 KB, já codificada).

Estados da linha: `:hover` leva o fundo para `--superficie` em 120ms — **e nada mais**;
o realce nunca é o único sinal, porque os dois links já são visíveis e focáveis.

### 5.5 Marcador de tecnologia (o que substitui o "chip")

Texto em mono 16px, `letter-spacing: .06em`, cor `--tinta-fraca`, itens separados por `·`
dentro de uma faixa técnica. **Sem logo colorido, sem pílula, sem preenchimento, sem
borda, sem ícone.** Um marcador nunca é clicável e nunca é focável — se precisa de foco,
virou link e vale a §5.3.

Onde aparece: faixa técnica do capítulo do Radar, linha de projeto, linha de stack do
hero. Onde **não** aparece: hero como grade de logos; "Sobre" como barra de proficiência
(proficiência com porcentagem é banida, §12).

### 5.6 Entrada de experiência (o que substitui a "linha do tempo")

Sem cartão, sem screenshot, sem botão, sem bolinha, sem trilho vertical desenhado.

Cada entrada é um registro em grid:

- **Cabeça:** H3 `Cargo — Empresa` à esquerda (Sora 600) e a **linha de expediente** à
  direita, em mono tabular: `Benevides, PA · jun. 2026 – atual`. As três entradas alinham
  a linha de expediente no mesmo eixo. Lugar é dado de triagem, não é tema —
  Benevides-PA, Castanhal-PA e UFPA Castanhal já são campos preenchidos em toda linha do
  currículo.
- **Corpo:** 4–6 linhas narradas com verbo e número. `1.563 → 93` e `+25%` em mono
  tabular, **alinhados no mesmo eixo horizontal entre as três entradas** — é o alinhamento
  que faz o olho pousar no número.
- **Selo de código fechado, em TEXTO**, onde couber: *"sistema interno — código fechado
  da empresa, sem link público; descrevo a arquitetura em entrevista."* Essa frase
  transforma a ausência de link em sinal de maturidade em vez de lacuna.
- **Aparato:** carimbo `currículo` na margem (prova declarada, §9.3).
- Separação entre entradas: `--fio` de 1px.

Regra dura: texto real, selecionável, buscável por `Ctrl+F` (`FastAPI`,
`Norte Geradores`) e imprimível por `Ctrl+P`. **Nada anima nesta seção.** Copy: "projetos
entregues pela empresa júnior" — a palavra *cliente* não aparece.

### 5.7 Alternador de idioma

Um `<nav aria-label="Idioma">` com dois controles, `PT` e `EN`, em texto mono separados
por `·`. **Nunca bandeira.** O ativo carrega `aria-current="true"` **e** peso 500 **e** a
cor `--tinta` (o inativo fica em `--tinta-fraca`) — três portadores, nenhum deles só cor.
Troca `document.documentElement.lang`, preserva a âncora corrente e persiste a escolha.
Aparece no cabeçalho e repetido no rodapé.

Estados: `:hover` cor `--acento`; `:focus-visible` anel; `:active` recuo de 1px.

### 5.8 Rodapé / colofão

Estrutura em §10, item 07. Estados dos links iguais à §5.3, com cor de repouso
`--tinta-fraca` e `:hover` em `--acento`. Fio de topo em `--fio-estrutural`, nunca em
`--fio`.

---

## 6. Layout, grid e breakpoints

### 6.1 Contêiner

- `--largura-maxima: 72rem` (1152px), centralizado, `padding-inline: var(--recuo-pagina)`.
- CSS Grid como base. Nada de `calc()` com porcentagem.
- Altura cheia só onde for necessária, com `min-height: 88svh` — **nunca** `h-screen`,
  **nunca** `100vh`.
- Nenhum elemento sobrepõe outro. Cada um tem sua faixa.

### 6.2 A grade do documento (e a aritmética que a define)

```css
.documento {
  display: grid;
  align-items: baseline;
  grid-template-columns:
    [ap]   var(--largura-aparato)   /* 12rem = 192px */
    [gap]  var(--gap-aparato)       /* 2rem  =  32px */
    [tx]   minmax(0, var(--medida)) /* 62ch  ≈ 632px em Sora 17px */
    [resto] minmax(0, 1fr);
}
```

Aritmética verificada, porque foi aqui que a direção original quebrou:

- JetBrains Mono tem avanço de **0,6em**. A 16px isso dá **9,6px por caractere**;
  `12rem = 192px` cabem exatamente **20 caracteres** por linha na margem.
- A direção original pedia 13ch com mono a 13px: ~133px, ~17 caracteres — e os próprios
  exemplos dela tinham 18, 21 e 50 caracteres. O alinhamento de linha de base, que **é** o
  argumento visual inteiro, nunca aconteceria. **Corrigido.**
- **Regra editorial que torna o alinhamento real:** um carimbo tem no máximo **20
  caracteres por linha e no máximo 2 linhas**. Se não couber, não é carimbo — é linha de
  expediente, e vai alinhada à direita na cabeça da entrada (§5.6). Léxico aprovado:
  `tests/test_pncp.py` (18), `README · Vitest 39` (18), `PNCP · 200 + HTML` (17),
  `medido: 4,4 s / 504` (19), `soma 169 de 174` (15), `currículo` (9),
  `verificado 20/08` (16), `UFPA · Castanhal` (16).
- Largura exigida em 1024px: `192 + 32 + 632 + 2×24 = 904px` ≤ 1024, sobrando 120px para
  a trilha `[resto]`. Foi por isso que a medida caiu de 65ch para 62ch: **a coluna de
  texto cede, a margem não** — e a página não estoura na faixa de 900–1180px, que era o
  risco declarado da direção.
- `minmax(0, …)` em **todas** as trilhas. Sem isso, uma faixa técnica longa ou uma URL
  empurram a grade e estouram a página.

### 6.3 Breakpoints

| Faixa | Comportamento |
| --- | --- |
| ≥1024px | Grade de duas colunas completa; aparato à esquerda, na linha de base da afirmação |
| 900–1023px | Coluna única. O aparato colapsa (§9.4): a procedência vira uma linha em mono **abaixo** da afirmação, precedida de um fio de 32×1px em `--acento` |
| 768–899px | Idem, e a navegação do cabeçalho vira `<details>` nativo |
| <768px | Idem, e a captura da linha de projeto vai para o topo da linha, em largura cheia |

Alvo de toque mínimo **48px** em todo controle. `min-height`, nunca `height`.

### 6.4 Overflow horizontal é falha crítica

`document.documentElement.scrollWidth > innerWidth` precisa ser `false` em **320, 390,
768, 1024, 1280 e 1440px**, medido no navegador — não deduzido do CSS. O site atual não
tem estouro; introduzir um seria regressão. **`overflow-x: hidden` no `body` é proibido**:
estouro se corrige, não se esconde.

---

## 7. Movimento

**Nível 2.** Movem-se exatamente três coisas, e nenhuma delas fica entre o topo da página
e o capítulo do Radar. Só `transform`, `opacity` e `color`/`background-color`. Nunca
`width`, `height`, `top`, `left`.

1. **O fio de progresso da margem.** Um pseudo-elemento de 1px na coluna do aparato com
   `transform: scaleY(var(--progresso)); transform-origin: top`, `--progresso` atualizado
   num `requestAnimationFrame` a partir de **um** listener passivo de scroll (ou
   `animation-timeline: scroll()` onde houver suporte, com o valor estático como
   fallback). `aria-hidden="true"`, `pointer-events: none`, largura já reservada no grid.
   **Não há segunda barra no topo da página, e não há número nem porcentagem em lugar
   nenhum dela.**
2. **Entrada de capítulo:** `opacity 0→1` + `translateY(8px→0)`, **180ms**,
   `cubic-bezier(.19, 1, .22, 1)`, uma vez só, via `IntersectionObserver`. O CSS base já é
   `opacity: 1` — o JS apenas **acrescenta** a classe de animação. Com o JS falhando
   inteiro, a página fica 100% legível e **nada some**.
3. **Estados de interação:** 120ms em cor, borda e `text-underline-offset` no `:hover`;
   `:active` recua 1px; troca de tema em 120ms de `background-color` e `color`, sem
   cross-fade de página inteira.

**`prefers-reduced-motion: reduce` (obrigatório):** o fio de progresso nasce cheio
(`scaleY(1)`, sem listener), o `translateY` de entrada vai a zero, as transições vão a
`0ms` e `scroll-behavior` volta a `auto`. **Nenhum conteúdo depende de animação para
existir**, em nenhum dos dois modos.

**Nada se move no hero e nada se move no capítulo de Experiência.**

---

## 8. Acessibilidade — regras que o código tem que cumprir

1. Contraste **medido**: 4,5:1 texto, 3:1 borda de controle e ícone. Toda alteração de
   token exige remedir os pares de §2 e atualizar a linha do colofão.
2. **Cor nunca é o único portador de informação.** Todo selo e todo estado é palavra
   escrita: `sistema interno`, `estudo`, `truncado`, `não informado`, `sem demo pública`,
   `código fechado`. Idioma é o texto `PT · EN`, nunca bandeira.
3. **Um destino = um `<a>`** envolvendo ícone + texto visível. Nada de `<a>` vazio com
   `.sr-only`, nada de link absoluto com `z-index` por cima de texto que não é dele.
4. O e-mail é o **texto do próprio link**; `copiar` é um **botão separado**, com nome
   acessível próprio e retorno em texto anunciado por `aria-live="polite"`.
5. `:focus-visible` visível em tudo que recebe foco, com `outline-offset: 2px`. Nenhum
   ancestral de elemento focável com `overflow: hidden`.
6. Zoom de texto a **200%** (WCAG 1.4.4) sem perda de conteúdo nem estouro — por isso nada
   que contenha texto tem altura fixa em px, e o inglês é mais longo que o português.
7. Ordem do DOM = ordem de leitura. Sem `order`, sem `flex-direction: column-reverse`,
   sem `direction`. Regra completa em §9.4.
8. Hierarquia de headings sem salto; um `<h1>` por página; landmarks (`header`, `nav`,
   `main`, `footer`) e `aria-label` em cada `nav`.
9. Alvo de toque **48px**. Imagens com `alt` descritivo de verdade (o site atual acerta
   isso — preservar), `width`/`height` reais e `loading="lazy"` fora do hero.
10. Elemento decorativo nasce `aria-hidden="true"` **e** é redundante por construção: se a
    informação existe só ali, ele não é decorativo e não pode ser escondido.
11. Carregamento é **esqueleto com as dimensões reais**. Círculo girando é proibido.
12. A página funciona inteira com o JavaScript falhando: o build pré-renderiza, o conteúdo
    nasce visível, e o único recurso que some sem JS é o fio de progresso — sem deixar
    buraco.

---

## 9. A assinatura: a Margem de Procedência

### 9.1 O que é

A página inteira é uma grade de duas colunas (§6.2). **Toda afirmação verificável do site
tem, na coluna estreita, em JetBrains Mono 16px e na mesma linha de base, a fonte que a
sustenta**: o arquivo (`tests/test_pncp.py`), a medição (`medido: 4,4 s / 504`, `soma 169
de 174`), o empregador (`Norte Geradores`) ou a data de verificação (`verificado 20/08`).

Não é um objeto gráfico: é uma **regra de admissão**. Um template não tem procedência a
exibir, porque não tem nada a provar.

### 9.2 Como implementar

- Componente `<Procedencia nivel="forte | declarada">`, renderizado **depois** da
  afirmação no DOM e posicionado por `grid-column: ap` na **mesma `grid-row`** da
  afirmação.
- `align-items: baseline` na linha, para que a primeira linha do carimbo divida a linha de
  base com a primeira linha da afirmação. O teto de 20 caracteres × 2 linhas (§6.2) é o
  que torna essa promessa executável.
- Um fio de 1px em `--acento` corre pela coluna e é **também** o indicador de progresso de
  leitura (§7.1). Ele é o único adorno tolerado no site, é `aria-hidden`, é redundante com
  os headings numerados, e **não é a assinatura**: se for removido, a direção continua de
  pé, porque a assinatura é o texto do carimbo.
- Custo total: CSS Grid, uma custom property, um `IntersectionObserver` e um listener
  passivo de scroll. **Sem canvas, sem WebGL, sem biblioteca, sem `getBoundingClientRect`
  em laço, sem `ResizeObserver`.** Nenhuma marca é pintada a partir da posição medida de
  um elemento — medir posição para desenhar traço reexecutaria a cada swap de fonte, a
  cada troca de idioma e a cada imagem assentando.

### 9.3 Dois níveis de prova, em palavra e em peso — nunca em cor

Para que a página mostre sozinha **onde ele é mais provado**:

- **Prova forte** — arquivo, medição, teste: `tests/test_pncp.py`, `medido: 4,4 s / 504`,
  `soma 169 de 174`, `39 + 39 testes`. Mono **500**, cor `--tinta`.
- **Prova declarada** — `currículo`, `README`, `verificado 20/08`. Mono **400**, cor
  `--tinta-fraca`.

A diferença é tipográfica e o conteúdo já é a palavra escrita. **Nada de tick decorativo e
nada que peça contagem visual de traço de 1px:** se a prova não estiver escrita em palavra
ou número legível, ela não existe. O colofão traz a legenda dos dois níveis.

### 9.4 O colapso móvel — desenhado, não improvisado

Esta era a fraqueza fatal da direção, e é onde ela se ganha ou se perde. Abaixo de 1024px:

- A procedência vira uma linha em mono 16px **imediatamente abaixo** da afirmação,
  precedida de um fio de 32×1px em `--acento`.
- **A ordem vertical nunca inverte.** DOM: afirmação → procedência. Visual: afirmação →
  procedência, nas duas larguras. Em ≥1024px o carimbo divide a **mesma linha de base** da
  afirmação — jamais uma linha acima dela. Sem `order`, sem `column-reverse`, sem
  reordenação por CSS em nenhum eixo vertical.
- **Critério de aceite, medido no navegador a 390px de largura:** a primeira tela precisa
  mostrar **pelo menos três procedências**. Quem garante isso é a régua de leituras do
  hero (§10, item 01). Se não mostrar, a direção não foi entregue — foi entregue um
  screenshot de desktop.

---

## 10. Arquitetura final de seções

Regra de nomenclatura, dura: **o `<h2>` é sempre a palavra comum** — *Experiência*,
*Projetos públicos*, *Sobre*, *Contato*. O vocabulário do aparato (*procedência*,
*colofão*, *capítulo*) vive na sobrancelha e nas legendas. Se o recrutador não achar
"Experiência" num `Ctrl+F`, ou o ATS não indexar, a direção falhou por mais coerente que
esteja.

| # | Seção (PT) | Section (EN) | O que prova |
| --- | --- | --- | --- |
| 00 | Cabeçalho | Header | A página é navegável sem rolar; existe versão EN; existe artefato para levar embora |
| 01 | Abertura (hero, fora da numeração) | Opening | Nível pretendido, lugar e modalidade, o diferencial com número — e a origem de cada número |
| 02 | Capítulo 01 · Radar de Licitações PA | Chapter 01 · Radar de Licitações PA | Julgamento de engenharia sob restrição real, com a prova travada em teste |
| 03 | Capítulo 02 · Experiência | Chapter 02 · Experience | O "roda em produção" tem empregador, cidade, período e número; e ele trabalhou dentro de time |
| 04 | Capítulo 03 · Projetos públicos | Chapter 03 · Public projects | Frequência de publicação e higiene: publica, deixa no ar, e o link funciona hoje |
| 05 | Capítulo 04 · Sobre | Chapter 04 · About | Stack larga e real, formação em curso com data prevista, inglês verificável |
| 06 | Capítulo 05 · Contato | Chapter 05 · Contact | É trivial chamá-lo, e ele diz o que procura e onde |
| 07 | Colofão | Colophon | O próprio site é o sexto artefato público, e as medidas dele estão declaradas |

**00 · Cabeçalho.** §5.1.

**01 · Abertura.** `min-height: 88svh`. Ordem vertical fixa:

1. Sobrancelha em mono, `ESTÁGIO OU JÚNIOR · CASTANHAL · BELÉM · REMOTO (UTC−3)`,
   precedida do fio de 56×2px em `--acento`. O `UTC−3` entra aqui, em **texto
   horizontal**, porque é a informação que decide contratação remota.
2. H1 em display: **"Meu código roda em produção — e dá para conferir."**
   (EN: *"My code runs in production — and you can check it."*) A segunda metade é o que
   converte leitor em auditor, e é a tese do site inteiro.
3. Parágrafo de apoio em 62ch, com o retrato de 96px ao lado do nome — a origem é
   720×1280 e só cobre ~360 CSS px em tela 2x, então é retrato de coluna, nunca hero de
   página inteira.
4. A **régua de leituras**: três colunas separadas por fio vertical de 1px, cada uma com
   rótulo em mono acima, valor grande em mono tabular no centro e `fonte:` embaixo —
   `1.563 → 93` · `LINHAS, COMPONENTE PRINCIPAL` · `fonte: refatoração da landing de
   captação, Norte Geradores` | `39 + 39` · `TESTES VITEST + PYTEST` · `fonte:
   radar-licitacoes-pa, CI no GitHub Actions` | `JUN/2026 → HOJE` · `ESTAGIÁRIO DE DEV,
   BENEVIDES (PA)` · `fonte: currículo`. É este bloco que faz a assinatura sobreviver ao
   celular (§9.4).
5. CTA primário `Currículo (PDF)` e secundário `Ver o Radar de Licitações`.

A stack é **uma linha em mono, cinco itens**: `React · TypeScript · Node.js ·
Python/FastAPI · Linux`. Sem seta de rolagem, sem "Hello World!", sem grade de logos.
**Zero movimento aqui.**

**02 · Capítulo 01 — Radar de Licitações PA.** O bloco mais largo e mais alto da página:
hierarquia por tamanho, não por ordem, e vem antes da experiência porque é a única prova
que o leitor pode abrir e inspecionar. Linha do que é, faixa técnica em mono (`React 19 ·
TS strict · Vite · Python 3.12 · FastAPI · httpx · Vitest 39 · pytest 39 · GitHub
Actions`) e **dois destinos separados e visíveis**, `Abrir o site ↗` e `Ver o código ↗` —
nunca o bloco inteiro clicável. Captura em `<picture>` AVIF/WebP, `1483×812`, caixa
reservada antes de o CSS chegar. Miolo: **quatro linhas de decisão**, cada uma numa linha
de grade separada por fio, com o carimbo de procedência na margem e `sintoma → decisão →
consequência` no texto:

- `PNCP · 200 + HTML` — o rate limit responde `200 OK` com corpo HTML, não 429 → o cliente
  checa `content-type` antes de interpretar → travado em `tests/test_pncp.py`.
- `medido: 4,4 s / 504` — origem lenta numa consulta de 10 dias e instável → a coleta saiu
  do caminho da requisição, um job diário grava JSON → o site fica de pé com o PNCP fora
  do ar.
- `soma 169 de 174` — o PNCP manda `null` para valor não informado → vira "não informado",
  não vira zero → o total declara a cobertura.
- `README · orçamento` — `buscar()` estourou o prazo → devolve o que tem e marca
  `truncado` → a interface avisa que a lista está incompleta em vez de fingir.

Máximo quatro visíveis e **sem acordeão** (em 15 segundos ninguém abre); o resto atrás de
`ler o README completo ↗`. Selo de categoria em texto: `projeto pessoal · dados abertos`.

**03 · Capítulo 02 — Experiência.** §5.6. Três entradas, mais recente primeiro.

**04 · Capítulo 03 — Projetos públicos.** §5.4. Seis linhas com fio. Fecho: `Todos os
repositórios no GitHub ↗`. Sem trilho horizontal fixado.

**05 · Capítulo 04 — Sobre.** Parágrafo factual de 3–4 linhas em 62ch. Depois, a stack
como `<dl>` de verdade: `<dt>` em mono na margem (`Linguagens`, `Front-End`, `Back-End e
dados`, `DevOps`, `Práticas`) e `<dd>` no texto — esta é a superfície de `Ctrl+F` e de
ATS. Depois, **"O que eu posso assumir"** em três linhas de texto simples, sem ícone, sem
cartão, sem título de pitch: é o que sobra da antiga seção "Serviços", que **morre como
seção**. Por fim, formação e certificações como entradas datadas, com a previsão de
conclusão visível (UFPA ago. 2022 – dez. 2027; Estácio fev. 2026 – dez. 2028) e a data na
margem. Zero barra de proficiência.

**06 · Capítulo 05 — Contato.** Pergunta-convite grande e factual em display — *"Procuro
estágio ou vaga júnior — Castanhal, Belém ou remoto."* — e sub em mono. Quatro destinos,
cada um um `<a>` único (§5.3), `min-height: 48px`, sem nenhum container com
`overflow: hidden` (é o que hoje recorta o anel de foco) e sem altura fixa em px (é o que
hoje corta 4px do conteúdo). E-mail como texto do link + botão `copiar` separado com
`aria-live`. Segundo e último ponto de download do currículo. **Instagram não aparece
aqui.**

**07 · Colofão (rodapé).** Fio de topo em `--fio-estrutural` e três linhas em mono 16px na
cor `--tinta-fraca`, no formato de colofão de livro impresso — nenhum template declara as
próprias medidas, porque nenhum template as escolheu:

1. `Sora 600/400 · JetBrains Mono 500/400 · corpo 17/1,62 · medida 62ch`
2. `Contraste medido: texto 17,03:1 · acento 5,87:1 · fio estrutural 3,99:1` — valores do
   tema claro; no escuro a linha troca para `15,93:1 · 8,13:1 · 5,25:1`
3. `Feito em React + Vite + TypeScript + Tailwind — ver o código ↗` e `Este site segue o
   DESIGN.md deste repositório, atualizado em <data do último commit> ↗`

Mais: nome + `Castanhal, PA — Brasil (UTC−3)`, repetição de e-mail/GitHub/LinkedIn,
alternador `PT · EN`, alternador de tema e a legenda dos dois níveis de procedência
(§9.3). Instagram, se ficar, fica aqui com peso mínimo.

---

## 11. Gate de publicação

Regra explícita, não observação de rodapé: **o site é mais coerente publicado só em PT do
que publicado com um controle que não funciona.**

1. **Currículo (PDF): liberado.** Os arquivos existem —
   `public/Pedro_Augusto_Curriculo.pdf` (60 KB) e `public/Pedro_Augusto_Resume.pdf`. O CTA
   primário só vai ao ar se o caminho **publicado** responder 200 no dia do deploy; se não
   responder, o botão não nasce e o primário passa a ser `Ver o Radar de Licitações`.
   Botão primário morto num site de contratação prova, no primeiro clique, que ele publica
   coisa que não funciona.
2. **EN só com revisão humana.** Inglês de máquina ao lado da linha "inglês avançado,
   certificado" transforma uma certificação em mentira demonstrável na própria página. Sem
   revisor, lança só em PT.
3. **`og:image` própria 1200×630 e favicon** antes do deploy — hoje o cartão de
   compartilhamento ainda mostra a Agenda Pet Shop.
4. **Medição obrigatória antes de declarar pronto**, no navegador e não deduzida:
   `scrollWidth` vs `innerWidth` em 320/390/768/1024/1280/1440; três procedências acima da
   dobra a 390px; onde o capítulo 01 começa num notebook **1366×768** (se o Radar cair
   fora do primeiro scroll, o hero encolhe — o orçamento de 15 segundos é o objetivo
   declarado da direção); zoom de texto a 200%; console limpo. "Compilou" não é prova.
5. **Nenhum número na tela sem origem no dossiê** (`.brief/FATOS.md`). Onde faltar prova,
   escreva menos — não escreva mais.

---

## 12. Banido

Nunca, em nenhuma hipótese. Nenhum destes volta como "exceção pequena".

**Estrutura e ornamento**

- Texto vertical (`writing-mode: vertical-rl`) carregando lugar de emissão, fuso ou
  qualquer outra coisa. É `aria-hidden` por necessidade, invade a coluna de texto a 200%
  de zoom, some no celular e repete o que o cabeçalho já diz.
- Numeral de capítulo gigante contornado ao fundo (`-webkit-text-stroke`). Nomear o
  ornamento não o autoriza.
- Qualquer elemento vendido como portador da metáfora e implementado com `aria-hidden`. Se
  o leitor de tela não precisa dele, o design também não precisa.
- Readout de porcentagem de rolagem (`03 · 62%`), no cabeçalho ou na margem. Ninguém pediu
  a porcentagem e é vocabulário de dashboard.
- Argumento que exija contagem visual — "a densidade de traços é o argumento". Ninguém
  conta traço de 1px.
- Barra de progresso horizontal no topo da página; trilho horizontal fixado; marquee de
  logos; parallax; tilt 3D; scroll hijack; cursor customizado; partículas; Three.js /
  WebGL; objeto 3D; glassmorphism; brilho neon; sombra colorida; gradiente em título.
- Preloader, contador subindo, typewriter no cargo, spinner de qualquer espécie
  (carregamento é esqueleto com as dimensões reais), seta de rolagem como único caminho
  para o conteúdo.
- Cartão com raio grande e sombra; três cartões iguais lado a lado; seção "Serviços" em
  qualquer forma — ele procura vaga, não cliente.
- Textura de papel envelhecido, serifa de jornal, carimbo desenhado, fita crepe, brasão,
  fibra, grão, moldura. A metáfora vive na estrutura, jamais na superfície.
- Ornamento regional: folha de açaí, palmeira, tucano, rio, canoa, pôr do sol, grafismo
  marajoara — **e também pela porta dos fundos, no nome do token** ("Verde Guamá" e
  similares). O Pará entra por dado (município, UF, PNCP, licitações do Pará) ou não entra.
- Vocabulário de cartório como `<h2>`: *Expediente*, *Procedência*, *Colofão*, *Leitura
  principal*, *Registro de operação*. São boas sobrancelhas e péssimos títulos.

**Conteúdo e honestidade**

- Qualquer sistema da Norte Geradores virando cartão de projeto: screenshot inventado,
  botão "ver código" morto, "demo indisponível". Entram como experiência narrada com
  empresa, cidade, período e número.
- Número que não esteja no `.brief/FATOS.md`. Métrica de vitrine: contador de projetos,
  anos de experiência, barra de proficiência com porcentagem, card do
  `github-readme-stats`, quadro de contribuições embedado.
- A palavra **cliente** para o trabalho da Link Jr — é "projetos entregues pela empresa
  júnior".
- "Hello World!", "Vamos conversar?", "apaixonado por tecnologia", "Scroll to explore",
  "Elevate", "Seamless", "Unleash", "Next-Gen", `LABEL // 2026`. Sem emoji.
- Versão EN publicada sem revisão humana.

**Código**

- `overflow-x: hidden` em qualquer ancestral (hoje em `style.css:31`) e `overflow: hidden`
  em container que hospede elemento focável (hoje em `style.css:193, 326, 359`).
- Altura fixa em px em qualquer elemento que contenha texto — só `min-height` + `padding`.
- `<a>` vazio esticado por cima de texto que não pertence ao link, com `.sr-only` fazendo
  o nome acessível.
- Cor como único portador de informação; bandeira como alternador de idioma.
- `::selection` com fundo de acento sem `color` explícito.
- `--fio` decorativo como único separador de bloco, ou como borda de controle.
- Fonte fora do par declarado; `Inter`; `Orbitron`; serifa; `#000000`; o laranja `#ff6b35`
  do matteodante.it.
- Prosa em monoespaçado.
- Animar `width`, `height`, `top` ou `left`. Ler posição de elemento em laço
  (`getBoundingClientRect` + `ResizeObserver`) para pintar qualquer coisa.
- Texto abaixo de 16px em qualquer lugar do site.
