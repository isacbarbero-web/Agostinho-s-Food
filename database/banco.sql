-- Modelo físico do Agostinho's Food.
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
