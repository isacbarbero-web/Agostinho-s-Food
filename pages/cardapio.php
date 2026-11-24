<?php

require __DIR__ . '/../config/conexao.php';
require __DIR__ . '/../includes/resposta-json.php';

try {
    $banco = conectarBanco(configuracaoLocal());
    $categorias = $banco->query(
        'SELECT id_categoria AS id, nome FROM categorias ORDER BY id_categoria'
    )->fetchAll();

    $produtos = [];
    $consulta = $banco->query(
        'SELECT id_produto AS id, id_categoria AS categoria, nome, descricao, imagem_url AS imagem,
                preco_atual AS preco, nota_exibida AS rating, selo AS badge
         FROM produtos ORDER BY id_produto'
    );
    foreach ($consulta->fetchAll() as $produto) {
        $produto['preco'] = (float) $produto['preco'];
        $produto['rating'] = (float) $produto['rating'];
        $produto['opcionais'] = [];
        $produtos[$produto['id']] = $produto;
    }

    $consulta = $banco->query(
        'SELECT id_produto, id_adicional, nome, preco_atual FROM adicionais ORDER BY id_adicional'
    );
    foreach ($consulta->fetchAll() as $adicional) {
        $produtos[$adicional['id_produto']]['opcionais'][] = [
            'id' => $adicional['id_adicional'],
            'nome' => $adicional['nome'],
            'preco' => (float) $adicional['preco_atual'],
        ];
    }

    $cupons = $banco->query(
        'SELECT codigo_cupom AS codigo, percentual_desconto AS percentual FROM cupons ORDER BY codigo_cupom'
    )->fetchAll();
    foreach ($cupons as &$cupom) {
        $cupom['percentual'] = (float) $cupom['percentual'];
    }
    unset($cupom);

    responderJson([
        'categorias' => $categorias,
        'produtos' => array_values($produtos),
        'cupons' => $cupons,
        'taxa_entrega' => TAXA_ENTREGA,
        'meta_frete_gratis' => META_FRETE_GRATIS,
    ]);
} catch (Exception $erro) {
    responderJson(['erro' => 'O cardápio está indisponível. Tente novamente.'], 503);
}
