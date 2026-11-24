# Agostinho’s Food

Site de delivery com cardápio, personalização de produtos e carrinho. Na finalização, o site prepara uma mensagem para o cliente enviar pelo WhatsApp.

## Como abrir

Abra `index.html` no navegador. A página usa a internet para carregar as fotos, a fonte e os ícones externos.

## Estrutura do projeto

```text
agostinho-food/
├── index.html          # Página principal
├── css/
│   └── estilo.css      # Aparência e responsividade
├── js/
│   └── main.js         # Cardápio, carrinho e finalização
├── database/
│   ├── banco.sql
│   ├── dados-iniciais.sql
│   └── consultas.sql
├── docs/
│   ├── planejamento.md
│   ├── modelagem-banco.md
│   ├── diagramas.drawio
│   └── imagens/        # Figuras da documentação
└── README.md
```

A organização segue o **Guia de Organização de Projetos Web**, capítulo 3. As imagens do site são carregadas por URL e a interface inteira está em `index.html`.

## Documentação

O [planejamento](docs/planejamento.md) reúne requisitos, sitemap, diagramas UML e wireframes. O [arquivo editável](docs/diagramas.drawio) pode ser aberto no Draw.io.

A [modelagem do banco](docs/modelagem-banco.md) reúne o DER e o modelo lógico.

## Banco de dados MySQL

No MySQL 8.0.16 ou posterior, execute os arquivos nesta ordem. Você pode abri-los no MySQL Workbench ou importá-los pelo phpMyAdmin conectado ao MySQL.

1. [banco.sql](database/banco.sql) cria o banco `agostinho_food` e as sete tabelas do modelo lógico.
2. [dados-iniciais.sql](database/dados-iniciais.sql) insere categorias, produtos, adicionais e cupons. Execute a carga uma vez, em um banco recém-criado.
3. [consultas.sql](database/consultas.sql) lista o cardápio e demonstra consultas com `INNER JOIN`, `LEFT JOIN` e `GROUP BY`. A consulta de pedidos passa a retornar linhas quando houver pedidos registrados.

A carga dá ao Cheese Cake o ID 12 para preservar o ID 11 do Grand Gateau. A Soda Italiana aguarda revisão, pois a descrição, a foto e os adicionais no catálogo atual são de pizza.

O site usa o cardápio em JavaScript. A conexão da página com o MySQL é uma etapa separada do projeto.
