# Dashboard de Livros - OpenLibrary

## Visão Geral

Este projeto é um dashboard web interativo e responsivo para pesquisar, filtrar e visualizar detalhes de livros, utilizando a API pública da [OpenLibrary](https://openlibrary.org/dev/docs/api/search). A aplicação foi desenvolvida como parte do desafio técnico para o processo seletivo de estágio em Front-End da V-lab.

As principais funcionalidades implementadas são:
* **Busca Dinâmica:** Pesquisa em tempo real por título ou autor com debounce para otimização de performance.
* **Filtros Avançados:** Filtragem de resultados por ano de publicação.
* **Paginação Completa:** Navegação entre as páginas de resultados com botões de Primeira, Anterior, Próxima e Última.
* **Detalhes do Livro:** Exibição de informações detalhadas (capa, autor, ano, editora, nº de páginas) em um modal ao clicar em um livro.
* **UI Moderna:** Interface com skeleton loading para feedback visual durante o carregamento e um design customizado combinando Material-UI e Tailwind CSS.
* **Comunicação Resiliente com a API:** Mecanismo de retentativas automáticas para lidar com instabilidades temporárias da API.

## Tecnologias Utilizadas

* **Frontend:** React 18 (com Hooks)
* **Build Tool:** Vite
* **UI Components:** Material-UI 5+
* **Estilização Utilitária:** Tailwind CSS
* **Cliente HTTP:** Axios
* **Ícones:** Material Icons

## Instalação e Execução

Para executar este projeto localmente, siga os passos abaixo:

**Pré-requisitos:**
* Node.js (versão 16 ou superior)
* npm ou yarn

**Passos:**
1.  Clone o repositório para a sua máquina local:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_AQUI]
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd [NOME_DA_PASTA_DO_PROJETO]
    ```
3.  Instale as dependências necessárias:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).

## Scripts Disponíveis

* `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
* `npm run build`: Compila a aplicação para produção.
* `npm run lint`: Executa o linter para análise de código.
* `npm run preview`: Inicia um servidor local para visualizar a build de produção.

## Decisões Técnicas

Durante o desenvolvimento, algumas decisões foram tomadas para garantir a qualidade, manutenibilidade e experiência do usuário:

* **Arquitetura de Pastas:** O projeto foi estruturado com uma clara separação de responsabilidades (`components`, `hooks`, `services`), facilitando a navegação e a manutenção do código.
* **Gerenciamento de Estado:** O estado foi gerenciado localmente nos componentes com os hooks do React (`useState`, `useEffect`). A lógica de busca e os estados relacionados (dados, loading, erro, paginação) foram encapsulados no hook customizado `useBooks`, desacoplando a lógica de negócio dos componentes de UI.
* **UI Híbrida (Material-UI + Tailwind CSS):** Foi adotada uma abordagem híbrida para a UI. O Material-UI foi utilizado por seus componentes robustos e prontos para uso (`Dialog`, `AppBar`, `Button`, `Skeleton`), enquanto o Tailwind CSS foi empregado para a estilização customizada e responsiva do layout principal (grid) e dos cards, proporcionando maior flexibilidade e um design único.
* **Resiliência da API:** Para lidar com a instabilidade da API da OpenLibrary (erros `503`), foi implementada uma camada de serviço com Axios que possui uma lógica de retentativas automáticas. Isso garante que a aplicação continue tentando buscar os dados por até um minuto antes de exibir uma mensagem de erro, melhorando a robustez da aplicação.
* **Performance da Busca:** O hook `useDebounce` foi criado para gerenciar o input do usuário na barra de busca. Isso evita que uma nova chamada à API seja feita a cada tecla digitada, disparando a busca apenas quando o usuário para de digitar, o que otimiza o uso da API e melhora a performance geral.

## Próximos Passos

Com mais tempo de desenvolvimento, as seguintes melhorias e funcionalidades poderiam ser implementadas:

* **Testes Unitários e de Integração:** Adicionar uma suíte de testes com React Testing Library e Jest para garantir a confiabilidade dos componentes e hooks.
* **Storybook:** Documentar os componentes da UI (`BookCard`, `Pagination`, `SearchBar`) com o Storybook para facilitar o desenvolvimento isolado e criar um guia de estilo visual.
* **Filtro por Idioma:** Implementar o filtro por idioma, conforme sugerido nas funcionalidades extras do desafio.
* **Funcionalidade de Favoritos:** Criar um sistema que permita ao usuário marcar livros como favoritos, com os dados persistidos no `localStorage`.
* **Otimização de Performance:** Implementar virtualização na lista de livros para renderizar de forma eficiente um número muito grande de resultados sem degradar a performance.