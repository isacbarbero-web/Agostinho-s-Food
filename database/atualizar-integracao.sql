-- Execute uma vez em um banco criado antes da integração com o site.
USE agostinho_food;

ALTER TABLE pedidos ADD COLUMN chave_requisicao CHAR(64) UNIQUE;
