-- Estrutura e carga inicial do Agostinho's Food. Importe uma vez em um banco novo.
CREATE DATABASE IF NOT EXISTS agostinho_food
    DEFAULT CHARACTER SET utf8mb4;

USE agostinho_food;

CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    imagem_url VARCHAR(500) NOT NULL,
    preco_atual DECIMAL(10,2) NOT NULL CHECK (preco_atual >= 0),
    nota_exibida DECIMAL(2,1) NOT NULL CHECK (nota_exibida BETWEEN 0 AND 5),
    selo VARCHAR(80),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE IF NOT EXISTS adicionais (
    id_adicional INT PRIMARY KEY AUTO_INCREMENT,
    id_produto INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    preco_atual DECIMAL(10,2) NOT NULL CHECK (preco_atual >= 0),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

CREATE TABLE IF NOT EXISTS cupons (
    codigo_cupom VARCHAR(30) PRIMARY KEY,
    percentual_desconto DECIMAL(5,2) NOT NULL CHECK (percentual_desconto BETWEEN 0 AND 100)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    chave_requisicao CHAR(64) UNIQUE,
    codigo_cupom VARCHAR(30),
    data_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nome_cliente VARCHAR(150) NOT NULL,
    endereco_entrega VARCHAR(255) NOT NULL,
    forma_pagamento VARCHAR(40) NOT NULL,
    troco_para DECIMAL(10,2),
    valor_frete DECIMAL(10,2) NOT NULL CHECK (valor_frete >= 0),
    valor_desconto DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (valor_desconto >= 0),
    CHECK (forma_pagamento IN ('Pix', 'Cartão de Crédito/Débito', 'Dinheiro')),
    CHECK (troco_para IS NULL OR (forma_pagamento = 'Dinheiro' AND troco_para >= 0)),
    CHECK (codigo_cupom IS NOT NULL OR valor_desconto = 0.00),
    FOREIGN KEY (codigo_cupom) REFERENCES cupons(codigo_cupom)
);

CREATE TABLE IF NOT EXISTS itens_pedido (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    observacao TEXT,
    preco_unitario_produto DECIMAL(10,2) NOT NULL CHECK (preco_unitario_produto >= 0),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

CREATE TABLE IF NOT EXISTS itens_adicionais (
    id_item INT NOT NULL,
    id_adicional INT NOT NULL,
    preco_unitario_aplicado DECIMAL(10,2) NOT NULL CHECK (preco_unitario_aplicado >= 0),
    PRIMARY KEY (id_item, id_adicional),
    FOREIGN KEY (id_item) REFERENCES itens_pedido(id_item),
    FOREIGN KEY (id_adicional) REFERENCES adicionais(id_adicional)
);

-- Carga inicial do cardápio.
-- A Soda Italiana aguarda revisão da descrição, da imagem e dos adicionais.
-- O Cheese Cake recebe ID 12, pois o ID 11 já pertence a outra sobremesa.
INSERT INTO categorias (id_categoria, nome) VALUES
    (1, 'Hambúrgueres'),
    (2, 'Pizzas'),
    (3, 'Porções'),
    (4, 'Bebidas'),
    (5, 'Sobremesas');

INSERT INTO produtos
    (id_produto, id_categoria, nome, descricao, imagem_url, preco_atual, nota_exibida, selo)
VALUES
    (1, 1, 'Agostinho Smash Burguer',
     'Dois hambúrgueres smash 100g de fraldinha, cheddar duplo derretido, bacon crocante em cubos e maionese artesanal da casa.',
     'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
     32.90, 4.9, 'Mais Vendido'),
    (2, 1, 'X-Salada Tradicional Gourmet',
     'Hambúrguer artesanal 160g, queijo prato fatiado, alface americana fresca, tomate maduro e maionese temperada no pão brioche.',
     'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
     24.90, 4.8, 'Clássico'),
    (3, 1, 'Burguer Monster Bacon',
     'Triple burguer 300g de carne, muito bacon crisp, cebola empanada super crocante e molho barbecue defumado.',
     'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
     38.90, 5.0, 'Destaque'),
    (4, 2, 'Pizza Calabresa Especial',
     'Calabresa artesanal fatiada fina, cebola roxa caramelizada, azeitonas azapa, molho de tomate pelado e orégano fresco.',
     'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
     49.90, 4.9, 'Favorito'),
    (5, 2, 'Pizza 4 Queijos Premium',
     'Combinação perfeita de muçarela especial, gorgonzola suave, provolone defumado e o legítimo catupiry.',
     'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80',
     54.90, 4.8, 'Chef'),
    (6, 3, 'Batata Frita Suprema Cheddar & Bacon',
     'Porção generosa de 500g de batata frita bem crocante por fora e macia por dentro, coberta com creme de cheddar e bacon.',
     'https://www.receitasja.com.br/wp-content/uploads/2026/06/Batata-frita-com-cheddar-e-bacon-1024x576.jpg',
     29.90, 4.9, 'Mais Pedido'),
    (7, 3, 'Frango a Passarinho Crocante',
     'Cortes de frango marinados em ervas finas, fritos até dourarem perfeitamente, polvilhados com alho crocante e salsinha.',
     'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
     36.90, 4.7, 'Porção Família'),
    (8, 4, 'Coca-Cola Original 2L',
     'Garrafa de 2 Litros trincando de gelada para acompanhar seu pedido.',
     'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
     12.00, 5.0, 'Geladinha'),
    (9, 4, 'Suco Natural de Laranja 500ml',
     'Suco 100% fruta natural espremido na hora, sem adição de conservantes ou água.',
     'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
     9.00, 4.9, 'Natural'),
    (10, 5, 'Pudim Tradicional de Leite Condensado',
     'Fatia generosa de pudim super cremoso e sem furinhos, banhado em calda de caramelo dourado.',
     'https://tse2.mm.bing.net/th/id/OIP.psAaZtJ9_V6Py-SsmOqJBAHaEB?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
     12.90, 5.0, 'Delícia'),
    (11, 5, 'Grand Gateau com Sorvete',
     'Petit gateau quente com recheio cremoso que escorre ao cortar, servido com picolé e calda de chocolate.',
     'https://tse4.mm.bing.net/th/id/OIP.ksTg8JBuDXO4T0TSX5o8MAHaD4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
     22.90, 4.9, 'Sobremesa VIP'),
    (12, 5, 'Cheese Cake',
     'A melhor sobremesa que o agostinho ja comeu!',
     'https://cookedbymia.com/wp-content/uploads/2025/05/2-Classic-New-York-Cheesecake.webp',
     33.90, 4.9, 'Sobremesa VIP');

INSERT INTO adicionais (id_produto, nome, preco_atual) VALUES
    (1, 'Queijo Cheddar Extra', 4.50),
    (1, 'Bacon Crocante Extra', 5.00),
    (1, 'Molho Especial Agostinho', 3.50),
    (2, 'Hambúrguer Adicional 160g', 9.00),
    (2, 'Ovo Frito na Manteiga', 3.00),
    (3, 'Pequena porção de batata de acompanhamento', 8.00),
    (4, 'Borda Recheada de Catupiry Original', 10.00),
    (4, 'Borda Recheada de Cheddar', 10.00),
    (5, 'Borda Recheada de Catupiry', 10.00),
    (6, 'Molho de Alho Extra', 3.00),
    (7, 'Fatias de Limão Siciliano Extra', 2.00);

INSERT INTO cupons (codigo_cupom, percentual_desconto) VALUES
    ('AGOSTINHO10', 10.00),
    ('PRIMEIRA15', 15.00);
