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
