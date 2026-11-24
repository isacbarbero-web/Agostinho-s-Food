<?php

const TAXA_ENTREGA = 700;
const META_FRETE_GRATIS = 6000;

function configuracaoLocal()
{
    $arquivo = __DIR__ . '/local.php';
    if (!is_file($arquivo)) {
        throw new RuntimeException('A configuração local do MySQL está ausente.');
    }

    return require $arquivo;
}

function conectarBanco($config)
{
    $dsn = "mysql:host={$config['host']};port={$config['porta']};dbname={$config['banco']};charset=utf8mb4";
    return new PDO($dsn, $config['usuario'], $config['senha'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}
