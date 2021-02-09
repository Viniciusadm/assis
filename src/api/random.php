<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$id_user = $_POST['id_user'];

$sql = "SELECT nome FROM assis where ep_atual < ep_tot and status = 1 and id_user = $id_user;";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    while($resultado = $result->fetch_assoc()) {
        $nomes[] = $resultado['nome'];
    }
    
    $indice = array_rand($nomes, 1);
    $nome =  $nomes[$indice];
    $sql = "SELECT nome, nome_id, ep_atual, ep_tot FROM assis where nome = '$nome' and id_user = $id_user;";
    $result = $connection->query($sql);
    $assis = $result->fetch_assoc();
} else {
    $assis = 'not_assis';
}

echo json_encode($assis);