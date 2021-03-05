<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$nomeAssis = $_POST['assis'];
$id_user = $_POST['id_user'];

$sql = "SELECT ep_atual, nome, link FROM assis WHERE nome_id = '$nomeAssis' and id_user = $id_user";
$result = $connection->query($sql);

$assis = $result->fetch_assoc();
$ep_atual = $assis['ep_atual'];
$nome = $assis['nome'];

$sql = "UPDATE assis SET ep_atual = $ep_atual + 1 WHERE nome_id = '$nomeAssis';";

$episodio = $ep_atual + 1;

$connection->query($sql);
$ocorrencia = "Episódio $episodio de $nome confirmado";

if ($assis['link'] != null) {
    $episode = strval($episodio);
    if (strlen($episode) === 1) $episode = "0" . $episode;
    $link = str_replace('$episodio', $episode, $assis['link']);
    $sql = "UPDATE links SET link = '$link' WHERE id = 1;";
    $connection->query($sql);
}

newlog($id_user, $ocorrencia, 'assis', 1);