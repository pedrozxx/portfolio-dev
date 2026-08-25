# Portfólio — Pedro Augusto Darolt

Desenvolvedor de software em Castanhal, Pará. Procuro estágio ou vaga júnior —
Castanhal, Belém ou remoto.

🔗 **[Abrir o site](https://pedrozxx.github.io/portfolio-dev/)** ·
**[English version](https://pedrozxx.github.io/portfolio-dev/en/)**

[![CI](https://github.com/pedrozxx/portfolio-dev/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrozxx/portfolio-dev/actions/workflows/ci.yml)
[![Pages](https://github.com/pedrozxx/portfolio-dev/actions/workflows/pages.yml/badge.svg)](https://github.com/pedrozxx/portfolio-dev/actions/workflows/pages.yml)

---

## A ideia

O site é uma **edição anotada**: toda afirmação carrega, na margem, a fonte que a
sustenta — o arquivo, a medição, o empregador e o período, ou a data em que o link
foi verificado.

A regra que governa o conteúdo é dura e vale como critério de admissão:

> **Se não existe o que escrever na margem, a afirmação não entra na página.**

Ela é a tradução em layout do comportamento que o meu outro projeto já tem: o
[Radar de Licitações](https://github.com/pedrozxx/radar-licitacoes-pa) diz
`soma 169 de 174 — o PNCP não informou valor em 5` em vez de somar como se fosse a
lista inteira. Um número sem procedência não é sóbrio: é inventado.

Quem aplica essa regra são os testes de conteúdo, que rodam no CI antes de qualquer
publicação:

```
✓ toda decisão tem procedência
✓ nenhuma procedência se repete — carimbo repetido é sinal de par trocado
✓ todo número exibido é um número, não um adjetivo
✓ quem tem código fechado explica por quê, com a frase daquela entrada
✓ todo projeto tem pelo menos um link — sem cartão sem saída
```

A regra editorial é verificada a cada push, não confiada à memória de quem escreve.

> Este parágrafo já descreveu um componente `Registro` cujo tipo exigiria a fonte —
> "não há como renderizar uma afirmação sem procedência". **Esse componente nunca
> existiu no repositório.** Um README que inventa o mecanismo com que prova não
> inventar é o pior defeito possível aqui, e ele sobreviveu a três reescritas porque
> ninguém rodou `grep`. Fica registrado em vez de apagado.

## O que este repositório resolve

**Pré-renderização estática.** O Pages serve arquivo, não roda Node. Um app React
sem esta etapa entrega `<div id="root"></div>` vazio no `view-source`: quem inspeciona
vê uma casca, e o robô que não executa JavaScript indexa uma página em branco.
`scripts/prerender.mjs` renderiza a árvore no build e injeta o HTML — são
**~55 mil caracteres** de marcação real em cada idioma, e a página continua legível
inteira com o JavaScript desligado.

**Dois idiomas, duas páginas de verdade.** `/` em português e `/en/` em inglês, cada
uma com seu `<html lang>`, seu `<title>` e seu `hreflang` — não uma SPA que troca
texto no cliente e entrega o mesmo HTML vazio para os dois. O dicionário é tipado: se
alguém acrescentar uma chave em português e esquecer o inglês, o build quebra.

**Contraste medido, não estimado.** `npm run contraste` recalcula a razão WCAG 2.2 de
**30 pares** de cor, o ΔE entre o acento e a cor de estado, e a matiz dos dois temas.
Roda no CI e reprova o build abaixo do piso. O rodapé do site declara os números; esta
etapa existe para que a declaração continue verdadeira.

**Auditoria do HTML publicado**, não do JSX. `npm run auditar-html` abre o `dist/` e
reprova link sem nome acessível, heading pulado, landmark faltando, imagem sem
dimensão, `hreflang` ausente — e verifica se o pré-render de fato injetou conteúdo.

## Medições

Feitas no navegador, não deduzidas do CSS — especificidade e cascata derrubam dedução.

Medido em 20/08/2026, no build de produção servido por `vite preview`.

| O que | Resultado |
| --- | --- |
| Estouro horizontal em 320, 390, 768, 1024, 1280, 1366 e 1440px | nenhum |
| O mesmo, com zoom de texto a 150% e 200% (WCAG 1.4.4) — 21 combinações | nenhum |
| Console no build de produção | limpo |
| Texto no `#root` sem executar JavaScript | 8.070 caracteres (PT) · 7.911 (EN) |
| Contraste, tema claro | texto 16,02:1 · acento 6,03:1 · fio estrutural 3,81:1 |
| Contraste, tema escuro | texto 13,05:1 · acento 7,14:1 · fio estrutural 3,72:1 |
| Matiz do acento, claro × escuro | 19,4° × 16,0° — 3,4° de diferença |
| Capturas de tela servidas a uma tela 1x | 74 KB em AVIF, contra 417 KB de origem |
| Paradas de foco dentro do trilho horizontal | 14, todas alcançáveis |
| Testes | 136 |

Três defeitos que só apareceram porque a medição foi feita, e que nenhum deles
mostrava uma caixa fora da tela:

- Colocação automática do grid jogava o carimbo de procedência para uma **segunda
  linha**, 108px abaixo da frase que ele acompanha.
- No colapso para coluna única, carimbo e afirmação herdavam `grid-row: 1` e caíam na
  **mesma célula**, sobrepostos.
- Item de grid nasce com `min-width: auto`: mesmo com a trilha em `minmax(0, 1fr)`, o
  item se recusava a encolher e vazava para fora dela.

## Stack

**Front** React 19 · TypeScript (`strict`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`) · Vite · Tailwind v4 · CSS com custom properties
**Testes** Vitest
**CI** GitHub Actions — tipos, testes, contraste e build a cada push
**Deploy** GitHub Pages, publicado por Action

## Rodando localmente

```bash
git clone https://github.com/pedrozxx/portfolio-dev.git
cd portfolio-dev
npm install

npm run dev            # http://localhost:5173
npm run build          # tipos, build, SSR, pré-render e auditoria do HTML
npm test               # 135 testes de conteúdo
npm run contraste      # recalcula os 30 pares de cor
```

Geradores que rodam à mão, porque a entrada muda poucas vezes por ano:

```bash
npm run imagens        # capturas/ -> AVIF e WebP em duas larguras
npm run icones         # assets/icons/*.svg -> componentes TSX com currentColor
```

`scripts/medir.html` é o banco de medição responsiva: abre o site em iframes com a
largura exata de cada breakpoint e reporta estouro horizontal e zoom de texto. Não
vai para o build.

## Design

O documento normativo é o [`DESIGN.md`](DESIGN.md): paleta com contraste medido,
tipografia, tokens, componentes, grade, movimento, acessibilidade e uma lista do que
é banido. Nenhuma linha de markup ou CSS deste repositório pode contrariá-lo, e
nenhum hex existe fora de `src/estilos/tokens.css`.

## Contato

**pedrocod.dev@gmail.com** ·
[LinkedIn](https://www.linkedin.com/in/pedro-darolt/) ·
[GitHub](https://github.com/pedrozxx)
