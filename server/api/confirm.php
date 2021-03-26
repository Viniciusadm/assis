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

if (isset($_POST['episode'])) {
    $episode = $_POST['episode'];
} elseif (!isset($_POST['episode'])) {
    $episode = $ep_atual + 1;
}

$sql = "UPDATE assis SET ep_atual = $episode WHERE nome_id = '$nomeAssis';";

$connection->query($sql);
$ocorrencia = "Episódio $episode de $nome confirmado";

if ($assis['link'] != null) {
    $episode_link = strval($episode);
    if (strlen($episode_link) === 1) $episode_link = "0" . $episode_link;
    $link = str_replace('$episodio', $episode_link, $assis['link']);
    $sql = "UPDATE links SET link = '$link' WHERE id = 1;";
    $connection->query($sql);
}

newlog($id_user, $ocorrencia, 'assis', 1);