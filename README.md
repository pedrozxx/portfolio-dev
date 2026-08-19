# Portfólio — Pedro Augusto Darolt

Meu site pessoal: quem eu sou, o que eu construo e como falar comigo. Página estática, responsiva e sem dependências ou etapa de build.

🔗 **[Abrir o portfólio](https://pedrozxx.github.io/portfolio-dev/)**

## O que tem na página

- **Abertura** — apresentação e as tecnologias que uso no dia a dia.
- **Projetos** — cards com captura de tela real de cada projeto, ligando direto para a versão publicada.
- **Como posso contribuir** — interfaces, APIs e deploy.
- **Contato** — e-mail, LinkedIn, GitHub e Instagram.

## Decisões técnicas

- **Sem framework nem build**: HTML e CSS puros, servidos direto pelo GitHub Pages.
- **Responsivo de verdade**: larguras fluidas com `max-width` e breakpoints em 768px e 400px — nenhum overflow horizontal.
- **Acessibilidade**: `alt` descritivo nas imagens de conteúdo, `aria-hidden` nos ícones decorativos, nome acessível em todos os links, foco visível no teclado e respeito a `prefers-reduced-motion`.
- **Compartilhável**: `meta description`, Open Graph e Twitter Card, para que o link renderize com título, descrição e imagem no LinkedIn e no WhatsApp.
- **Performance**: `loading="lazy"` e `width`/`height` nas imagens dos projetos, evitando deslocamento de layout.

## Tecnologias

HTML5 · CSS3 · Google Fonts (Asap, Inconsolata, Maven Pro)

## Como executar

```bash
git clone https://github.com/pedrozxx/portfolio-dev.git
cd portfolio-dev
```

Abra o `index.html` no navegador.

## Estrutura

```
index.html   marcação da página
style.css    estilos, responsividade e acessibilidade
assets/      foto, ícones, planos de fundo e capturas dos projetos
```

## Créditos

O layout parte do desafio de portfólio da trilha Full-Stack da [Rocketseat](https://www.rocketseat.com.br/); o conteúdo, os projetos e os ajustes de responsividade e acessibilidade são meus.

## Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE) para mais detalhes.

## Autor

**Pedro Augusto Darolt** — [GitHub](https://github.com/pedrozxx) · [LinkedIn](https://www.linkedin.com/in/pedro-darolt/) · pedrocod.dev@gmail.com
