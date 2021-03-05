<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM assis where id = $id";
    $result = $connection->query($sql);
    $assis = $result->fetch_assoc();
}

if (isset($_POST['nome_id'])) {
    $id_user = $_POST['id_user'];
    $nome_id = $_POST['nome_id'];
    $sql = "SELECT * FROM assis where nome_id = '$nome_id' and id_user = $id_user";
    $result = $connection->query($sql);
    if ($result->num_rows > 0) {
        $assis = $result->fetch_assoc();
    } else {
        $assis = 'not_exists';
    }
}

if (isset($_POST['id_user']) && !isset($_POST['nome_id'])) {
    $id_user = $_POST['id_user'];
    $sql = "SELECT * FROM assis where id_user = $id_user order by nome";
    $result = $connection->query($sql);
    
    if ($result->num_rows > 0) {
        while($resultado = $result->fetch_assoc()) {
            $assis[] = $resultado;
        }
    } else {
        $assis = 'not_assis';
    }
} 

echo json_encode($assis);