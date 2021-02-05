<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$pasta_imagem = realpath(dirname(__DIR__) . "/images/");

if (isset($_POST['nome'])) {
    $id = $_POST['id'];
    $sql = "SELECT nome_id from assis where id = $id;";
    $nome = $_POST['nome'];
    $nome_id = $_POST['nome_id'];

    $nome_id_original = $connection->query($sql)->fetch_assoc()['nome_id'];
    $nome_original = $pasta_imagem . '/' . $nome_id_original . '.jpg';
    $nome_novo = $pasta_imagem . '/' . $nome_id . '.jpg';
    
    rename($nome_original, $nome_novo);

    $sql = "UPDATE assis SET nome = '$nome' WHERE id = $id;";
    $connection->query($sql);

    $sql = "UPDATE assis SET nome_id = '$nome_id' WHERE id = $id;";
    $connection->query($sql);
}

if (isset($_POST['episode'])) {
    $id = $_POST['id'];
    $type = $_POST['type'];
    $episode = $_POST['episode'];

    $sql = "UPDATE assis SET ep_$type = $episode WHERE id = $id;";
    $connection->query($sql);
}