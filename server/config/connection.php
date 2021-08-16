<?php
date_default_timezone_set('America/Sao_Paulo');

$database = "heroku_480de7965b5bd46";
$user = "b961593cc26c66";
$password = "b4783bf6";
$hostname = "us-cdbr-east-04.cleardb.com";

$connection = new mysqli($hostname, $user, $password, $database);

function newlog($id_user, $ocorrencia) {
    $database = "heroku_480de7965b5bd46";
    $user = "b961593cc26c66";
    $password = "b4783bf6";
    $hostname = "us-cdbr-east-04.cleardb.com";
    $date = date('Y-m-d');
    $time = date('H:i:s');
    $sql = "INSERT INTO log (id_user, occurrence, date, time) values ($id_user, '$ocorrencia', '$date', '$time');";
    $conn = new mysqli($hostname, $user, $password, $database);
    $conn->query($sql);
    echo json_encode($conn->error);
    unset($conn);
}