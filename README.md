# Portfólio — Pedro Augusto Darolt

Site pessoal para apresentar projetos, experiência e contato a quem avalia uma candidatura em desenvolvimento de software.

[Português](https://pedrozxx.github.io/portfolio-dev/) · [English](https://pedrozxx.github.io/portfolio-dev/en/) · [CI](https://github.com/pedrozxx/portfolio-dev/actions/workflows/ci.yml)

## O que há neste projeto

- Páginas em português e inglês, com conteúdo tipado.
- React com pré-renderização de HTML no build para publicação estática.
- Temas claro e escuro, navegação por seções e animações.
- Projetos com links para demonstração ou código, e descrição da experiência profissional.
- Verificações automatizadas de conteúdo, contraste dos tokens e HTML gerado.

Os testes verificam regras estruturais do conteúdo; **não comprovam experiência profissional, autoria, métricas de trabalho ou domínio de uma tecnologia**. Essas informações precisam ser sustentadas pelo candidato em entrevista. Projetos internos permanecem sem código público.

## Stack e requisitos

Node.js 22 · React 19 · TypeScript · Vite · Tailwind CSS 4 · Vitest.
O `sharp` é usado pelos scripts de geração de imagens, não pelo navegador. Não há backend ou chaves de API para configurar.

## Executar

```bash
git clone https://github.com/pedrozxx/portfolio-dev.git
cd portfolio-dev
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite. Para verificar a versão de produção:

```bash
npm run build
npm run preview
```

O build executa TypeScript, gera os bundles de cliente e servidor, injeta o HTML estático em `/` e `/en/` e audita a saída em `dist/`. O bundle de servidor é usado durante a geração; não é necessário manter um servidor Node em produção.

## Verificações

```bash
npm run typecheck
npm test
npm run contraste
npm run build
```

`npm test` verifica o conteúdo declarado: links, campos obrigatórios e relações entre textos e referências. `npm run contraste` calcula razões entre pares de tokens. `npm run auditar-html` pode ser repetido após o build para verificar links acessíveis, hierarquia de títulos, imagens e pré-renderização.

Essas verificações não substituem testes de interação, avaliação com leitor de tela ou conferência visual em diferentes dispositivos. As medições antigas do README não são tratadas como garantias sobre toda mudança futura.

## Organização

```text
src/conteudo/           projetos, capacidades e experiência
src/i18n.ts             textos nos dois idiomas
src/secoes/             seções da página
src/componentes/        componentes reutilizáveis
src/hooks/              interações e animações
src/estilos/            tokens e CSS
src/entry-client.tsx    inicialização no navegador
src/entry-server.tsx    renderização usada no build
scripts/prerender.mjs   geração do HTML estático
scripts/auditar-html.mjs verificações da saída
```

## Manutenção

Atualize os dados em `src/conteudo/` e os textos equivalentes nos dois idiomas. Preserve as atribuições dos projetos e não publique informações confidenciais das empresas.

`npm run imagens` gera derivados AVIF/WebP; `npm run icones` gera componentes a partir dos SVGs. Execute esses comandos quando mudar as entradas correspondentes e revise os arquivos produzidos. As regras visuais estão em [DESIGN.md](DESIGN.md).

## Publicação

O workflow de CI verifica os pull requests. O workflow de Pages publica a branch `main`. Para hospedar sob outro caminho, confira a configuração de `base` em `vite.config.ts` e valide os links do build.

## Limitações

- É um portfólio estático; não demonstra sozinho operações transacionais, autenticação ou modelagem de banco.
- O conteúdo pré-renderizado é legível sem JavaScript, mas os controles interativos dependem dele.
- Os testes existentes se concentram em conteúdo e saída estática; não constituem cobertura completa da interface.

## Contato e licença

[pedrocod.dev@gmail.com](mailto:pedrocod.dev@gmail.com) · [LinkedIn](https://www.linkedin.com/in/pedro-darolt/) · [GitHub](https://github.com/pedrozxx).
Código sob [licença MIT](LICENSE). Referências e créditos existentes no código e nos assets devem ser preservados.
