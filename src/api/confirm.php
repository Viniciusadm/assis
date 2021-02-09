<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$nomeAssis = $_POST['assis'];
$id_user = $_POST['id_user'];

$sql = "SELECT ep_atual FROM assis WHERE nome_id = '$nomeAssis' and id_user = $id_user";
$result = $connection->query($sql);

$assis = $result->fetch_assoc();
$ep_atual = $assis['ep_atual'];

$sql = "UPDATE assis SET ep_atual = $ep_atual + 1 WHERE nome_id = '$nomeAssis';";

$connection->query($sql);
$ocorrencia = "Episódio $episodio do $nomeAssis assistido";
newlog($ocorrencia, 'assis');