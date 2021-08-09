<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$nome = $_POST['nome'];
$type = $_POST['type'];
$episode = $_POST['episode'];
$id_user = $_POST['id_user'];

if ($type === 'filme') $ocorrencia = "$nome confirmado";
elseif ($type === 'serie') $ocorrencia = "Episódio $episode de $nome confirmado";

newlog($id_user, $ocorrencia);