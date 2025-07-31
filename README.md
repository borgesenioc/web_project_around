# Tripleten web_project_around (EUA Afora)

Um projeto web interativo demonstrando técnicas modernas de desenvolvimento web, design responsivo e programação orientada a objetos usando HTML, CSS e classes JavaScript ES6, com integração de API para persistência de dados.

---

## Funcionalidades

-   **CSS Modular**: Estilos organizados no diretório `blocks` (por exemplo, `header.css`, `popup.css`)
-   **Design Responsivo**: Media queries garantem uma experiência suave tanto em dispositivos desktop quanto móveis.
-   **JavaScript Orientado a Objetos**: Classes ES6 modernas para melhor organização do código:
    -   `Card`: gerencia a criação e funcionalidade dos cartões.
    -   `FormValidator`: administra a validação de formulários.
    -   `Popup` e suas subclasses: controlam os diferentes tipos de janelas modais.
    -   `Api`: gerencia todas as interações com o servidor.
    -   `UserInfo`: controla os dados do usuário.
    -   `Section`: lida com a renderização de elementos na página.
-   **Integração com API**: Comunicação completa com o servidor para:
    -   Carregar informações do usuário
    -   Salvar alterações de perfil
    -   Carregar cartões iniciais
    -   Adicionar novos cartões
    -   Excluir cartões
    -   Curtir/descurtir cartões
    -   Atualizar foto do perfil
-   **Funcionalidades de Popup**:
    -   Abrir e fechar editor de perfil
    -   Criador de cartões
    -   Visualizador de imagens
-   **Validação de Formulários**: Validação em tempo real para todos os formulários com feedback visual.
-   **Elementos Interativos**: Adicionar cartões, curtir cartões, remover cartões e visualizar imagens ampliadas.
-   **Feedback ao Usuário**: Indicadores de carregamento durante operações no servidor.
-   **Qualidade de Código**: Configurado com Prettier e EditorConfig para estilo consistente.

---

## Estrutura do Projeto

### HTML

-   Estrutura principal definida em `index.html`

### CSS

-   Estilos globais: `index.css`
-   Estilos de componentes: diretório `blocks`
-   Estilos de terceiros: diretório `vendor`

### JavaScript

-   Ponto de entrada: `index.js` (coordena os componentes)
-   Classes ES6: organizadas em arquivos separados dentro de `components`
-   Configuração da API: `config.js`

### Assets

-   Imagens: diretório `images`
-   Fontes: `fonts.css`

---

## Como Iniciar

1. Clone o repositório.
2. Abra usando um servidor local (por exemplo, a extensão **Live Server** do VS Code) para garantir que os módulos funcionem corretamente.
3. Interaja com a página para adicionar cartões, editar o perfil e visualizar imagens.

---

## Tecnologias

-   HTML5 & CSS3
-   JavaScript (Classes ES6, Módulos)
-   Programação Orientada a Objetos
-   Metodologia BEM
-   Design Responsivo
-   Integração com API RESTful
-   Promessas e Requisições Assíncronas

---

## Autor

**Enio Borges**
