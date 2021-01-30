<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Assis</title>
</head>
<body>
    <form method="post">
        <label for="nome">Nome</label>
        <input type="text" name="nome" id="nome">
        <br/>
        <label for="nome_id">ID Nome</label>
        <input type="text" name="nome_id" id="nome_id">
        <br/>
        <label for="imagem">Imagem</label>
        <input type="text" name="imagem" id="imagem">
        <br/>
        <label for="ep_atual">Episódio Atual</label>
        <input type="text" value="0" name="ep_atual" id="ep_atual">
        <br/>
        <label for="ep_tot">Episódios Totais</label>
        <input type="text" name="ep_tot" id="ep_tot">
        <br/>
        <input type="submit" value="Enviar">
    </form>
</body>
</html>

<?php
require_once "conexao.php";
if (count($_POST) > 0) {
    $nome = $_POST['nome'];
    $nome_id = $_POST['nome_id'];
    $imagem = $_POST['imagem'];
    $ep_atual = $_POST['ep_atual'];
    $ep_tot = $_POST['ep_tot'];

    $sql = "INSERT INTO assis (nome, nome_id, imagem, ep_atual, ep_tot) values ('$nome', '$nome_id', '$imagem', $ep_atual, $ep_tot)";

    if ($connection->query($sql) === TRUE) {
        echo "Sucesso";
    } else {
        echo "Error: " . $connection->error;
    }
}