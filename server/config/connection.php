<?php
date_default_timezone_set('America/Sao_Paulo');

$connection = new mysqli('127.0.0.1', 'vinicius', '123', 'assis');
// $connection = new mysqli('localhost', 'id14280894_vinicius', 'mKZqT>c$Gw]75d}&', 'id14280894_meubanco');

function newlog($id_user, $ocorrencia, $tabela, $type) {
    $date = date('Y-m-d');
    $time = date('H:i:s');
    $sql = "INSERT INTO log (id_user, occurrence, table_affected, date, time, type) values ($id_user, '$ocorrencia', '$tabela', '$date', '$time', $type);";
    $conn = new mysqli('127.0.0.1', 'vinicius', '123', 'assis');
    // $conn = new mysqli('localhost', 'id14280894_vinicius', 'mKZqT>c$Gw]75d}&', 'id14280894_meubanco');
    $conn->query($sql);
    echo json_encode($conn->error);
    unset($conn);
}