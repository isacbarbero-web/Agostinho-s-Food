<?php

require __DIR__ . '/../config/conexao.php';
require __DIR__ . '/../includes/resposta-json.php';

const LIMITE_CENTAVOS = 9999999999;

function textoDoPedido($dados, $campo, $limite)
{
    $valor = $dados[$campo] ?? '';
    if (!is_string($valor) || preg_match('/^.{0,' . $limite . '}$/usD', $valor) !== 1) {
        throw new InvalidArgumentException('Revise os dados de entrega e as observações.');
    }
    return trim($valor);
}

function buscarPedido($banco, $chave)
{
    $consulta = $banco->prepare('SELECT id_pedido FROM pedidos WHERE chave_requisicao = ?');
    $consulta->execute([$chave]);
    return $consulta->fetchColumn();
}

function respostaPedido($id, $telefone)
{
    return ['id_pedido' => (int) $id, 'whatsapp' => $telefone];
}

function registrarPedido($banco, $dados, $chave)
{
    $nome = textoDoPedido($dados, 'nome', 150);
    $endereco = textoDoPedido($dados, 'endereco', 255);
    $pagamento = $dados['pagamento'] ?? '';
    $troco = $dados['troco'] ?? null;
    $codigo = textoDoPedido($dados, 'cupom', 30);
    $totalExibido = $dados['total_centavos'] ?? null;

    if ($nome === '' || $endereco === '') {
        throw new InvalidArgumentException('Preencha nome e endereço de entrega.');
    }
    if (!in_array($pagamento, ['Pix', 'Cartão de Crédito/Débito', 'Dinheiro'], true)) {
        throw new InvalidArgumentException('Escolha uma forma de pagamento válida.');
    }
    if ($troco !== null && ($pagamento !== 'Dinheiro' || !is_int($troco) || $troco < 0 || $troco > LIMITE_CENTAVOS)) {
        throw new InvalidArgumentException('Informe um valor válido para troco.');
    }
    if (!is_int($totalExibido) || $totalExibido < 0 || $totalExibido > LIMITE_CENTAVOS) {
        throw new InvalidArgumentException('O valor do pedido não é válido.');
    }
    if (empty($dados['itens']) || !is_array($dados['itens'])) {
        throw new InvalidArgumentException('Adicione pelo menos um item ao pedido.');
    }

    $buscarProduto = $banco->prepare('SELECT preco_atual FROM produtos WHERE id_produto = ?');
    $buscarAdicional = $banco->prepare(
        'SELECT preco_atual FROM adicionais WHERE id_adicional = ? AND id_produto = ?'
    );
    $subtotal = 0;
    $itens = [];

    foreach ($dados['itens'] as $item) {
        $produto = $item['id_produto'] ?? null;
        $quantidade = $item['quantidade'] ?? null;
        $adicionais = $item['adicionais'] ?? null;
        if (!is_int($produto) || !is_int($quantidade) || $quantidade < 1 || $quantidade > 2147483647 || !is_array($adicionais)) {
            throw new InvalidArgumentException('Revise os produtos e quantidades do pedido.');
        }

        $buscarProduto->execute([$produto]);
        $precoProduto = $buscarProduto->fetchColumn();
        if ($precoProduto === false) {
            throw new InvalidArgumentException('Um produto não está disponível. Atualize o cardápio.');
        }

        $precoUnitario = (int) round($precoProduto * 100);
        $precosAdicionais = [];
        foreach ($adicionais as $adicional) {
            if (!is_int($adicional) || isset($precosAdicionais[$adicional])) {
                throw new InvalidArgumentException('Revise os adicionais escolhidos.');
            }
            $buscarAdicional->execute([$adicional, $produto]);
            $preco = $buscarAdicional->fetchColumn();
            if ($preco === false) {
                throw new InvalidArgumentException('Um adicional não está disponível para o produto.');
            }
            $precosAdicionais[$adicional] = $preco;
            $precoUnitario += (int) round($preco * 100);
        }

        if (($item['preco_unitario_centavos'] ?? null) !== $precoUnitario) {
            throw new InvalidArgumentException('O preço de um item mudou. Atualize o cardápio.');
        }
        $subtotal += $precoUnitario * $quantidade;
        if ($subtotal > LIMITE_CENTAVOS) {
            throw new InvalidArgumentException('O valor do pedido ultrapassa o permitido.');
        }
        $itens[] = [
            'produto' => $produto,
            'quantidade' => $quantidade,
            'observacao' => textoDoPedido($item, 'observacao', 1000),
            'preco' => $precoProduto,
            'adicionais' => $precosAdicionais,
        ];
    }

    $desconto = 0;
    if ($codigo !== '') {
        $consulta = $banco->prepare('SELECT percentual_desconto FROM cupons WHERE codigo_cupom = ?');
        $consulta->execute([$codigo]);
        $percentual = $consulta->fetchColumn();
        if ($percentual === false) {
            throw new InvalidArgumentException('O cupom não está disponível.');
        }
        $desconto = (int) round($subtotal * $percentual / 100);
    }

    $frete = $subtotal >= META_FRETE_GRATIS ? 0 : TAXA_ENTREGA;
    if ($subtotal - $desconto + $frete !== $totalExibido) {
        throw new InvalidArgumentException('O total mudou. Atualize o cardápio antes de concluir.');
    }

    $inserirPedido = $banco->prepare(
        'INSERT INTO pedidos
             (chave_requisicao, codigo_cupom, nome_cliente, endereco_entrega, forma_pagamento,
              troco_para, valor_frete, valor_desconto)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $inserirPedido->execute([
        $chave, $codigo === '' ? null : $codigo, $nome, $endereco, $pagamento,
        $troco === null ? null : $troco / 100, $frete / 100, $desconto / 100,
    ]);
    $idPedido = $banco->lastInsertId();

    $inserirItem = $banco->prepare(
        'INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, observacao, preco_unitario_produto)
         VALUES (?, ?, ?, ?, ?)'
    );
    $inserirAdicional = $banco->prepare(
        'INSERT INTO itens_adicionais (id_item, id_adicional, preco_unitario_aplicado) VALUES (?, ?, ?)'
    );
    foreach ($itens as $item) {
        $inserirItem->execute([
            $idPedido, $item['produto'], $item['quantidade'],
            $item['observacao'] === '' ? null : $item['observacao'], $item['preco'],
        ]);
        $idItem = $banco->lastInsertId();
        foreach ($item['adicionais'] as $id => $preco) {
            $inserirAdicional->execute([$idItem, $id, $preco]);
        }
    }

    return $idPedido;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    responderJson(['erro' => 'Use POST para registrar o pedido.'], 405);
}
$tipo = explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0];
if (strtolower(trim($tipo)) !== 'application/json') {
    responderJson(['erro' => 'Envie o pedido em JSON.'], 415);
}

$corpo = file_get_contents('php://input', false, null, 0, 65537);
$dados = is_string($corpo) && strlen($corpo) <= 65536 ? json_decode($corpo, true, 8) : null;
if (!is_array($dados) || !is_string($dados['referencia'] ?? null) || $dados['referencia'] === '') {
    responderJson(['erro' => 'Os dados do pedido não são válidos.'], 400);
}

// O mesmo envio usa a mesma chave. O banco impede dois registros em caso de reenvio.
$chave = hash('sha256', $corpo);
$banco = null;

try {
    $config = configuracaoLocal();
    $telefone = $config['whatsapp'];
    if (!is_string($telefone) || preg_match('/^[1-9][0-9]{9,14}$/D', $telefone) !== 1) {
        throw new RuntimeException('Configure o WhatsApp do restaurante.');
    }

    $banco = conectarBanco($config);
    $anterior = buscarPedido($banco, $chave);
    if ($anterior !== false) {
        responderJson(respostaPedido($anterior, $telefone));
    }

    $banco->beginTransaction();
    $id = registrarPedido($banco, $dados, $chave);
    $banco->commit();
    responderJson(respostaPedido($id, $telefone), 201);
} catch (InvalidArgumentException $erro) {
    if ($banco !== null && $banco->inTransaction()) {
        $banco->rollBack();
    }
    responderJson(['erro' => $erro->getMessage()], 422);
} catch (Exception $erro) {
    if ($banco !== null && $banco->inTransaction()) {
        $banco->rollBack();
    }
    if ($banco !== null && $erro instanceof PDOException && $erro->getCode() === '23000') {
        $anterior = buscarPedido($banco, $chave);
        if ($anterior !== false) {
            responderJson(respostaPedido($anterior, $telefone));
        }
    }
    responderJson(['erro' => 'Não foi possível registrar o pedido. Tente novamente.'], 503);
}
