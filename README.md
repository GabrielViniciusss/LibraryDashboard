# Dashboard de Livros - OpenLibrary

## Visão Geral

Este projeto é um dashboard web interativo e responsivo para pesquisar, filtrar e visualizar detalhes de livros, utilizando a API pública da [OpenLibrary](https://openlibrary.org/dev/docs/api/search). A aplicação foi desenvolvida como parte do desafio técnico para o processo seletivo de estágio em Front-End da V-lab.

As principais funcionalidades e diferenciais implementados são:
* **Arquitetura Multi-Página:** Utilização do `react-router-dom` para criar uma navegação fluida entre a página principal e a de visualização de dados.
* **Busca Dinâmica:** Pesquisa em tempo real por título ou autor com debounce para otimização de performance.
* **Filtros Avançados:** Filtragem de resultados por ano de publicação.
* **Visualização de Dados:** Uma página dedicada com gráficos interativos (gerados com Chart.js) que analisam os livros da página atual, mostrando a distribuição por década e os autores mais frequentes.
* **Paginação Completa:** Navegação entre as páginas de resultados com uma interface clara e funcional.
* **Detalhes do Livro:** Exibição de informações detalhadas em um modal customizado e estilizado.
* **UI Moderna:** Interface com skeleton loading para feedback visual durante o carregamento e um design customizado combinando Material-UI e Tailwind CSS.
* **Testes Unitários:** Cobertura de testes para componentes e fluxos principais da aplicação utilizando Jest e React Testing Library.
* **Documentação de Componentes:** Utilização do Storybook para documentar e desenvolver o componente `BookCard` de forma isolada.

## Tecnologias Utilizadas

* **Frontend:** React 18 (com Hooks)
* **Roteamento:** React Router DOM v6
* **Build Tool:** Vite
* **UI Components:** Material-UI 5+
* **Estilização Utilitária:** Tailwind CSS
* **Gráficos:** Chart.js (com react-chartjs-2)
* **Testes:** Jest & React Testing Library
* **Documentação de Componentes:** Storybook
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
* `npm test`: Executa a suíte de testes com Jest.
* `npm run storybook`: Inicia o ambiente do Storybook para visualização de componentes.
* `npm run lint`: Executa o linter para análise de código.
* `npm run preview`: Inicia um servidor local para visualizar a build de produção.

## Decisões Técnicas

Durante o desenvolvimento, algumas decisões foram tomadas para garantir a qualidade, manutenibilidade e experiência do usuário:

* **Arquitetura Multi-Página (SPA):** A decisão de usar `react-router-dom` permitiu uma clara separação entre a página principal de busca e a página de análise de dados, criando uma experiência de navegação mais intuitiva e organizada.
* **Gerenciamento de Estado Centralizado:** O estado global (lista de livros, paginação, filtros) foi mantido no componente `App.jsx`, que atua como um "provedor" para as páginas filhas. Isso simplifica o fluxo de dados e evita a necessidade de bibliotecas de gerenciamento de estado mais complexas para um projeto deste escopo.
* **UI Híbrida (Material-UI + Tailwind CSS):** Foi adotada uma abordagem híbrida para a UI. O Material-UI foi utilizado por seus componentes robustos e funcionais (`Dialog`, `AppBar`, `Skeleton`), enquanto o Tailwind CSS foi empregado para a estilização customizada e responsiva do layout principal e dos cards, proporcionando maior flexibilidade e um design único.
* **Testes Focados no Comportamento:** A estratégia de testes focou em validar o comportamento da aplicação do ponto de vista do usuário (renderização de estados de loading/erro, funcionamento da busca), garantindo que as funcionalidades principais estão robustas.

## Próximos Passos: 

* **Filtros Avançados:**
    * Substituir os campos de texto de ano por um componente de `range slider` para uma melhor UX.
    * Adicionar um filtro por idioma utilizando o parâmetro `language` da API.
    * Implementar opções de ordenação dos resultados (relevância, data, título).
* **Funcionalidade de Favoritos:**
    * Criar um sistema que permita ao usuário marcar livros como favoritos.
    * Persistir a lista de favoritos entre sessões utilizando `localStorage`.
    * Exibir um contador de livros favoritados no header.