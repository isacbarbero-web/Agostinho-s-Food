# Agostinho’s Food

Site de delivery com cardápio carregado do MySQL, personalização de produtos e carrinho. Na finalização, o PHP registra o pedido e o site abre a mensagem para o cliente enviar pelo WhatsApp.

## Como abrir

1. Prepare o banco seguindo a seção [Banco de dados MySQL](#banco-de-dados-mysql).
2. Copie `config/local-exemplo.php` para `config/local.php`. Preencha os dados de acesso ao MySQL e confira o número do WhatsApp com código do país e DDD. O Git ignora o arquivo local.
3. Inicie um servidor com PHP 8 e a extensão `pdo_mysql`. No Apache, coloque o projeto em uma pasta servida por ele e abra o endereço `http://localhost/agostinho-food/`. Para teste, também é possível executar `php -S localhost:8000` na raiz e abrir `http://localhost:8000/`.

O navegador usa `fetch()` para falar com [cardapio.php](pages/cardapio.php) e [salvar-pedido.php](pages/salvar-pedido.php). A página precisa de um servidor PHP e, para fotos, fonte e ícones externos, de internet.

## Estrutura do projeto

```text
agostinho-food/
├── index.html          # Página principal
├── css/
│   └── estilo.css      # Aparência e responsividade
├── js/
│   └── main.js         # Cardápio, carrinho e finalização
├── config/             # Conexão PDO e exemplo de configuração local
├── includes/           # Respostas JSON
├── pages/              # Consulta do cardápio e registro de pedidos
├── database/
│   ├── banco.sql
│   ├── atualizar-integracao.sql
│   ├── dados-iniciais.sql
│   └── consultas.sql
├── docs/
│   ├── planejamento.md
│   ├── modelagem-banco.md
│   ├── diagramas.drawio
│   └── imagens/        # Figuras da documentação
└── README.md
```

A organização usa a seção PHP e MySQL do **Guia de Organização de Projetos Web**. A conexão PDO e as consultas parametrizadas seguem a apostila de DWS do 3º bimestre. A comunicação por `fetch()` e JSON segue a do 4º bimestre.

## Documentação

O [planejamento](docs/planejamento.md) reúne requisitos, sitemap, diagramas UML e wireframes. O [arquivo editável](docs/diagramas.drawio) pode ser aberto no Draw.io.

A [modelagem do banco](docs/modelagem-banco.md) reúne o DER e o modelo lógico.

## Banco de dados MySQL

No MySQL 8.0.16 ou posterior, execute os arquivos nesta ordem. Você pode abri-los no MySQL Workbench ou importá-los pelo phpMyAdmin conectado ao MySQL.

1. [banco.sql](database/banco.sql) cria o banco `agostinho_food` e as sete tabelas do modelo lógico.
2. [dados-iniciais.sql](database/dados-iniciais.sql) insere categorias, produtos, adicionais e cupons. Execute a carga uma vez, em um banco recém-criado.
3. [consultas.sql](database/consultas.sql) lista o cardápio e demonstra consultas com `INNER JOIN`, `LEFT JOIN` e `GROUP BY`. A consulta de pedidos passa a retornar linhas quando houver pedidos registrados.

A carga dá ao Cheese Cake o ID 12 para preservar o ID 11 do Grand Gateau. A Soda Italiana aguarda revisão, pois a descrição, a foto e os adicionais no catálogo atual são de pizza.

Se você criou o banco antes da integração, execute [atualizar-integracao.sql](database/atualizar-integracao.sql) uma vez para acrescentar a chave que evita pedidos duplicados em reenvios. A estrutura nova já inclui essa coluna.

Os pedidos são registrados em uma transação com itens, adicionais e valores calculados pelo servidor. O número gerado aparece na mensagem. O cliente ainda precisa conferir e enviar a mensagem no WhatsApp.
