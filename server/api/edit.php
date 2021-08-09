<?php
header("Access-Control-Allow-Origin: *");
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
require_once "../vendor/autoload.php";
use Gregwar\Image\Image;


if (isset($_POST['nome'])) {
    $user_actual = $_POST['user_actual'];
    $pasta_imagem = realpath(dirname(__DIR__) . "/images/$user_actual/");
    $id = $_POST['id'];
    $sql = "SELECT nome_id from assis where id = $id;";
    $nome = $_POST['nome'];
    $nome_id = $_POST['nome_id'];

    $nome_id_original = $connection->query($sql)->fetch_assoc()['nome_id'];
    $nome_original = $pasta_imagem . '/' . $nome_id_original . '.jpg';
    $nome_novo = $pasta_imagem . '/' . $nome_id . '.jpg';
    
    rename($nome_original, $nome_novo);

    $sql = "UPDATE assis SET nome = '$nome' WHERE id = $id;";
    $connection->query($sql);

    $sql = "UPDATE assis SET nome_id = '$nome_id' WHERE id = $id;";
    $connection->query($sql);
}

if (isset($_POST['episode'])) {
    $id = $_POST['id'];
    $type = $_POST['type'];
    $episode = $_POST['episode'];
    $name = $_POST['name'];
    $id_user = $_POST['id_user'];
    $operation = $_POST['operation'];

    echo json_encode($name);

    $sql = "UPDATE assis SET ep_$type = $episode WHERE id = $id;";
    $connection->query($sql);

    if ($type === 'atual' and $operation === 'plus') {
        $ocorrencia = "Episódio $episode de $name confirmado";
        newlog($id_user, $ocorrencia);
    }
}

if (isset($_FILES['capa'])) {
    $nome_id = $_POST['nome_id'];
    $user_actual = $_POST['user_actual'];
    $pasta_upload = dirname(__DIR__) . "/images/$user_actual/";
    $tmp = $_FILES['capa']['tmp_name'];
    $tipo = exif_imagetype($tmp);

    if ($tipo === 2 || $tipo === 3) {
        Image::open($tmp) -> resize(361, 512) -> save($pasta_upload . $nome_id . '.jpg');
    }
}