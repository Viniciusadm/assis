<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$sql = "SELECT * FROM assis";
$result = $connection->query($sql);

while($resultado = $result->fetch_assoc()) {
    $assis[] = $resultado;
}

if (isset($_GET['assis'])) {
    $nome_id = $_GET['assis'];
    foreach ($assis as $assi) {
        if ($assi['nome_id'] === $nome_id) {
            $assis = $assi;   
        }
    }
}

echo json_encode($assis);