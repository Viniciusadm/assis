<?php
require_once "conexao.php";

$nomeAssis = $_GET['assis'];

$sql = "SELECT ep_atual FROM assis WHERE nome_id = '$nomeAssis'";
$result = $connection->query($sql);

$assis = $result->fetch_assoc();
$ep_atual = $assis['ep_atual'];

$sql = "UPDATE assis SET ep_atual = $ep_atual + 1 WHERE nome_id = '$nomeAssis';";

if ($connection->query($sql) === true) {
    $episodio = $ep_atual + 1;
    $ocorrencia = "Episódio $episodio do $nomeAssis assistido";
    newlog($ocorrencia, 'assis');
    $texto = 'Assis confirmado com sucesso';
} else {
    $texto = 'Erro' . $connection->error;
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação</title>
</head>
<body>
    <h1><?=$texto?></h1>    
</body>
</html>