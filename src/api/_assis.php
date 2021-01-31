<?php
require_once "../config/connection.php";

header("Access-Control-Allow-Origin: *");

$sql = "SELECT nome FROM assis where ep_atual < ep_tot";
$result = $connection->query($sql);

while($resultado = $result->fetch_assoc()) {
    $nomes[] = $resultado['nome'];
}

$indice = array_rand($nomes, 1);
$nome =  $nomes[$indice];
$sql = "SELECT nome, nome_id, ep_atual, ep_tot FROM assis where nome = '$nome'";
$result = $connection->query($sql);
$assis = $result->fetch_assoc();

echo json_encode($assis);

// if (isset($_GET['nomes'])) {
//     $sql = "SELECT nome_id FROM assis";
//     $result = $connection->query($sql);
    
//     while ($array = $result->fetch_assoc()) {
//         $nomes[] = $array['nome_id'];
//     }
    
//     shuffle($nomes);
    
//     echo json_encode($nomes);
// }
