<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

if (isset($_POST['date'])) {
    $date = $_POST['date'];
    $id_user = $_POST['id_user'];
    $sql = "SELECT count(id) as count_today FROM log where id_user = $id_user and date = '$date';";
    $assis[] = $connection->query($sql)->fetch_assoc();
    $sql = "SELECT count(id) as count FROM log where id_user = $id_user;";
    $assis[] = $connection->query($sql)->fetch_assoc();
    $sql = "SELECT * FROM log where id_user = $id_user and date = '$date';";
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