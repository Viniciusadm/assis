<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$nomeAssis = $_POST['assis'];
$id_user = $_POST['id_user'];

$sql = "SELECT ep_atual, nome FROM assis WHERE nome_id = '$nomeAssis' and id_user = $id_user";
$result = $connection->query($sql);

$assis = $result->fetch_assoc();
$ep_atual = $assis['ep_atual'];
$nome = $assis['nome'];

if (isset($_POST['episode'])) {
    $episode = $_POST['episode'];
} elseif (!isset($_POST['episode'])) {
    $episode = $ep_atual + 1;
}

$sql = "UPDATE assis SET ep_atual = $episode WHERE nome_id = '$nomeAssis';";

$connection->query($sql);
$ocorrencia = "Episódio $episode de $nome confirmado";

newlog($id_user, $ocorrencia);