<?php
$connection = new mysqli('127.0.0.1', 'vinicius', '123', 'animes');
// $connection = new mysqli('localhost', 'id14280894_vinicius', 'mKZqT>c$Gw]75d}&', 'id14280894_meubanco');

function newlog($ocorrencia, $tabela) {
    $now = date('Y-m-d H:i:s');
    $sql = "INSERT INTO log (ocorrencia, tabela, data) values ('$ocorrencia', '$tabela', '$now')";
    $conn = new mysqli('127.0.0.1', 'vinicius', '123', 'animes');
    // $conn = new mysqli('localhost', 'id14280894_vinicius', 'mKZqT>c$Gw]75d}&', 'id14280894_meubanco');
    $conn->query($sql);
    unset($conn);
}