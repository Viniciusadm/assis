<?php
date_default_timezone_set('America/Sao_Paulo');

$connection = new mysqli('127.0.0.1', 'vinicius', '123', 'animes');
// $connection = new mysqli('localhost', 'id14280894_vinicius', 'mKZqT>c$Gw]75d}&', 'id14280894_meubanco');

function newlog($id_user, $ocorrencia, $tabela) {
    $date = date('Y-m-d');
    $time = date('H:i:s');
    $sql = "INSERT INTO log (id_user, occurrence, table_affected, date, time) values ($id_user, '$ocorrencia', '$tabela', '$date', '$time');";
    $conn = new mysqli('127.0.0.1', 'vinicius', '123', 'animes');
    // $conn = new mysqli('localhost', 'id14280894_vinicius', 'mKZqT>c$Gw]75d}&', 'id14280894_meubanco');
    $conn->query($sql);
    unset($conn);
}