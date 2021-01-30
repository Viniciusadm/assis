<?php
require_once "conexao.php";

$assis = array_keys($_POST)[0];
$valor = $_POST[$assis] + 1;
$id = $_POST['assis'];
$tipo = $_POST['tipo'];

$sql = "UPDATE assis SET ep_$tipo = $valor WHERE nome_id = '$assis';";
if ($connection->query($sql) === TRUE) {
    header("Location: editar.php#assis" . $id);
} else {
    echo "Error: " . $sql . "<br>" . $connection->error;
}
