<?php
require_once "conexao.php";

$sql = "SELECT nome FROM assis where ep_atual < ep_tot";
$result = $connection->query($sql);

while($resultado = $result->fetch_assoc()) {
    $nomes[] = $resultado['nome'];
}

$indice = array_rand($nomes, 1);
$nome =  $nomes[$indice];

$sql = "SELECT ep_atual, ep_tot, nome_id FROM assis where nome = '$nome'";
$result = $connection->query($sql);

$assis = $result->fetch_assoc();