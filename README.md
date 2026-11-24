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
│   └── banco.sql
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

Para instalar do zero, importe [banco.sql](database/banco.sql) uma vez no MySQL 8.0.16 ou posterior. Ele cria o banco `agostinho_food`, as sete tabelas e carrega o cardápio e os cupons. Use o MySQL Workbench ou o phpMyAdmin conectado ao MySQL.

A carga dá ao Cheese Cake o ID 12 para preservar o ID 11 do Grand Gateau. A Soda Italiana aguarda revisão, pois a descrição, a foto e os adicionais no catálogo atual são de pizza.

Se o banco já existe e a tabela `pedidos` ainda precisa da coluna `chave_requisicao`, execute este comando uma vez para atualizar a estrutura e preservar os dados cadastrados.

```sql
USE agostinho_food;

ALTER TABLE pedidos ADD COLUMN chave_requisicao CHAR(64) UNIQUE;
```

Os pedidos são registrados em uma transação com itens, adicionais e valores calculados pelo servidor. O número gerado aparece na mensagem. O cliente ainda precisa conferir e enviar a mensagem no WhatsApp.

### Consultas de exemplo

<details>
<summary>Ver consultas de cardápio e pedidos</summary>

```sql
USE agostinho_food;

-- Cardápio ordenado por categoria e produto.
SELECT c.nome AS categoria, p.nome AS produto, p.preco_atual, p.nota_exibida
FROM produtos AS p
INNER JOIN categorias AS c ON p.id_categoria = c.id_categoria
ORDER BY c.nome, p.nome;

-- O LEFT JOIN mantém na lista os produtos sem adicionais.
SELECT p.nome AS produto, a.nome AS adicional, a.preco_atual AS preco_adicional
FROM produtos AS p
LEFT JOIN adicionais AS a ON p.id_produto = a.id_produto
ORDER BY p.nome, a.nome;

-- Quantidade de produtos cadastrados em cada categoria, inclusive as vazias.
SELECT c.nome AS categoria, COUNT(p.id_produto) AS quantidade_produtos
FROM categorias AS c
LEFT JOIN produtos AS p ON c.id_categoria = p.id_categoria
GROUP BY c.id_categoria, c.nome
ORDER BY c.nome;

-- Itens dos pedidos, com o código do cupom quando houver.
SELECT pe.id_pedido, pe.data_pedido, pe.nome_cliente, c.codigo_cupom,
       pr.nome AS produto, i.quantidade, i.preco_unitario_produto
FROM pedidos AS pe
INNER JOIN itens_pedido AS i ON pe.id_pedido = i.id_pedido
INNER JOIN produtos AS pr ON i.id_produto = pr.id_produto
LEFT JOIN cupons AS c ON pe.codigo_cupom = c.codigo_cupom
ORDER BY pe.id_pedido, i.id_item;
```

</details>
