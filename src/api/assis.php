<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = "SELECT * FROM assis where id = $id";
    $result = $connection->query($sql);
    $assis = $result->fetch_assoc();
}

if (isset($_POST['id_user'])) {
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