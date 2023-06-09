<div align="center">
  <img src="assets/pintastic-logo.png" />
</div>

# SCC0219 Pintastic: a fully-functional Online Store to sell button pins.

Group project for SCC0219 Introduction to Web Development Course @ ICMC-USP.<br>
(Imagens da aplicação podem ser encontradas no diretório mockups/)

## Membros:

- Pedro Kenzo Muramatsu Carmo (11796451)
- Ana Cristina Silva de Oliveira (11965630)
- André Santana Fernandes (11208537)

## Requisitos

- O sistema possui 2 tipos de usuários: Clientes e Administradores.
  - Os administradores gerenciam o sistema, os usuários e os produtos oferecidos (pins e adesivos).
  - Um administrador pode apenas ser cadastrado por outros administradores, fornecendo: nome completo e email. <br>
    Após o cadastro de um administrador, enviamos em seu email os dados para login no sistema: email e senha única, sendo a última gerada pelo sistema.
  - Os usuário são clientes que acessam a aplicação para a compra de pins e adesivos.
- O registro de cada cliente inclui: nome completo, email, senha, endereço de entrega e telefone para contato.
- Os registros dos pins e adesivos incluem: ID, nome do produto, categoria, preço de venda e quantidade em estoque.
- Vendas de pins e adesivos: O produto é selecionado, a quantidade é escolhida e incluída no carrinho. Os produtos são comprados utilizando dados de cartão de crédito (qualquer número é aceito pelo sistema), boleto ou PIX. A quantidade vendida de pins/adesivos é subtraída da quantidade em estoque. O carrinho é esvaziado somente após o pagamento ou retirada manual pelo cliente.
- Gerenciamento de pins/adesivos: Administradores devem ser capazes de criar, atualizar, ler e deletar (CRUD) novos pins e adesivos. Por exemplo, mudar a quantidade de produtos em estoque.
- O sistema deve conter requisitos de accessibilidade e prover boa usabilidade para o cliente.

### Funcionalidade extra: Pin do Dia

* Todos os dias, os clientes podem acessar uma tela chamada  **Pin do dia** , na qual um dos pins que o cliente gostou da loja (ou seja, algum dos itens do seu 'wishlist') será sorteado e terá um desconto especial naquele dia.

## Descrição do projeto
- O projeto desenvolvido trata-se de uma loja de pins e adesivos colecionáveis de diversas categorias, como Brasil, arquitetura, folclore, animes e séries. As funcionalidades apresentadas no tópico anterior foram organizadas da seguinte forma:

![Diagrama de navegação](./assets/nav-diagram.png)
- A partir de todas as páginas é possível acessar a **Landing Page**.
- O usuário pode realizar login/cadastro na página de **Sign In / Sign Up**.
- Após logado, o cliente pode editar as informações cadastradas em seu perfil através da página **Edit Profile** e possuir um pin em sua Wishlist que poderá ser sorteado para o **Pin do Dia**.
- A todo momento é possível acessar a página de carrinho (**Cart**) através do ícone presente no cabeçalho.
- A todo momento é possível acessar a página de catálogo (**Catalogue**) através do ícone presente no cabeçalho.
- Quando logado em uma conta de administrador, será possível acessar a página **Admin Page** através de um botão que estará presente no dropdown ao passar com o mouse sobre o nome de usuário logado presente no canto superior direito da tela. Dessa forma, na página do administrador será possível acessar todas as funcionalidades voltadas aos administradores.
- Além disso, como admin poderá visitar as páginas de **Customers Management** e **Products Management** para modificações dos produtos selecionados.

### Informações armazenadas no servidor
- Informações sobre os usuários-clientes: nome completo, email, senha, endereço de entrega e telefone para contato.
- Informações sobre os administradores: nome completo, email, senha e endereço (opcional).
- Informações sobre pins e adesivos: ID, nome do produto, categoria, preço de venda e quantidade em estoque.
- Informações sobre o Pin do Dia: nome do pin sorteado de cada usuário, data e valor de desconto.

## Comentários sobre o código
- O arquivo de estilização CSS está dividido em sessões para cada parte essencial das páginas. Essa divisão é feita de forma simples através de comentários que explicitam o inicio e fim dos blocos de código de cada página. Vide exemplo abaixo:
![image](https://user-images.githubusercontent.com/68512242/236645720-2f35a738-0581-4462-91c0-8a5892e74105.png)

- Como cada página possui componentes diferentes, adicionamos os arquivos referentes a estes no diretório **milestone-1/components**. Para os arquivos **.css** que são comuns aos arquivos, armazenamos na pasta **milestone-1/utils**. Por fim, os arquivos **.html** e **.css** relacionados estão no diretório **milestone-1/**.

## Plano de testes
A seguir estão listados os testes que iremos realizar:
1) Busca de pin/adesivo por nome
    - Buscar por um pin/adesivo no catálogo por meio de uma string de busca a partir da barra de pesquisa presente no cabeçalho do site.
2) Filtragem por categoria
    - Verificar retorno ao selecionar uma categoria de pin/adesivo na barra de navegação do cabeçalho.
3) Navegação nas diferentes páginas do catálogo
    - Verificar se a barra de navegação do cabeçalho funciona conforme esperado.
4) Adicionar item ao carrinho
    - Verificar se o botão de **Adicionar ao carrinho** presente na página do pin/adesivo e catálogo funciona conforme esperado.
5) Wishlist
    - Verificar se o botão de **Adicionar à Wishlist** presente na página do pin/adesivo, catálogo e página do carrinho funciona conforme esperado.
6) Remover um item do carrinho
    - Na página do carrinho testar se o item será removido ao clicar no botão **Remove**
7) Testar a máscara de input em alguns dos campos presentes no site
8) Testar funcionalidade de edição de pin quando logado como Administrador
9) Testar inclusão de pins e usuários (outros admins) por parte do administrador
10) Testar alteração de perfil por parte do usuário
11) Testar finalização de compra após itens serem adicionados ao carrinho.

## Resultado dos testes
1)
2) Ao selecionar cada categoria, os pins exibidas no catálogo são atualizados conforme esperado
3) A navegação nas diferentes páginas do catálogo funciona conforme esperado, alterando o número de páginas caso alguma categoria específica tenha sido selecionada.
4)
5)
6) Na página do carrinho, ao clicar no botão Remove o produto será removida do carrinho independentemente da quantidade de um mesmo item conforme o esperado.
7) A maioria dos campos numéricos possui máscaras de input.
8) Quando logado como Administrador, ao selecionar um produto do catálogo e clicar para editar o item, as informações a serem editadas do item são exibidas e as alterações feitas são salvas conforme esperado.
9) As inclusões de pins e usuários, quando logado como administrador, funcionam conforme o esperado, permitindo que um administrador faça o cadastro de outros administradores no sistema.
10) 
11)

## Procedimentos de build

- Para a entrega do Milestone 2 foram apenas desenvolvidos todas as páginas do sistema ([link figma](https://www.figma.com/file/MftvtXlZh9A57ovjIyvspl/Mockup-Pintastic---Template-p%2F-Costumer-Side?type=design&node-id=17189%3A143372&t=uTBwirYr3YysFnDW-1)) utilizando o framework [React](https://react.dev/).

- Todas as componentes do React (JSX + CSS) desenvolvidas estão presentes na pasta **milestone-2/frontend/src**, sendo que, para o desenvolvimento de uma SPA (Single Page Application) utilizou-se o [React Router](https://reactrouter.com/en/main), fazendo com que os componentes da página sejam dinamicamente carregados durante a nevegação do usuário.

- As componentes desenvolvidas são as seguintes:
    - **App.js**: componente principal contendo header, footer e as demais componentes dinamicamente carregadas.
    - **admin/components**: componentes relacionados ao administrador.
    - **admin/pages/Admins**: página com informações dos administradores + mocks.
    - **admin/pages/Clients**: página com informações sobre os clientes + mocks.
    - **admin/pages/Home**: página principal (home) dos administradores + mocks.
    - **admin/pages/Login**: página de login do administrador.
    - **admin/pages/Products**: página de gerenciamento de produtos.
    - **shop/components**: componentes relacionados a loja.
    - **shop/pages**: contém as páginas de Carrinho, Catálogo, Checkout, Landing Page, Pin Of the Day, Detalhes do Produto e Wishlist.
    - **shop/pages/mock**: mock de produtos.

### Tutorial de Build

Abaixo, um pequeno tutorial de como rodar e visualizar as páginas do site:

Para executar a aplicação é preciso que o software Node.js esteja instalado em sua máquina através do tutorial abaixo:        
https://nodejs.org/en/

**IMPORTANTE!**

Para o correto funcionamento da aplicação é necessária que o FrontEnd (presente neste repositório) esteja em execução. Dessa forma, temos o tutorial de build seguinte:
#### **FrontEnd**

    Faça download do projeto por meio do botão [Code] -> [Download ZIP] presente no GitHub e decompacte o arquivo .ZIP, ou clone o projeto em sua pasta de preferência.

    Depois, por meio do terminal, dentro da pasta (milestone-2/frontend) do projeto, executar o comando abaixo:
    > npm install

    Em seguida, para executar o projeto, basta utilizado o comando abaixo:
    > npm run

    Por fim, em seu navegador, vá para a url abaixo: 
    localhost:3000/
     
    Lembrando que para acessar a página do administrador, você deve utilizar a URL localhost:3000/admin
    Para logar utilize:
      Email: admin@pintastic.com
      Senha: 123
    
    Pronto! Você agora estará na página principal de nosso site!
