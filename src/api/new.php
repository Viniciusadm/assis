<?php
header("Access-Control-Allow-Origin: *");
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
require_once "../vendor/autoload.php";
use Gregwar\Image\Image;

$nome = $_POST['nome'];
$nome_id = $_POST['nome_id'];
$ep_atual = $_POST['ep_atual'];
$ep_tot = $_POST['ep_tot'];
$id_user = $_POST['id_user'];
$user_actual = $_POST['user_actual'];

if (isset($_FILES) && isset($_FILES['capa'])) {
    $pastaUpload = dirname(__DIR__) . "/images/$user_actual/";
    $tmp = $_FILES['capa']['tmp_name'];
    $tipo = exif_imagetype($tmp);

    if ($tipo === 2 || $tipo === 3) {
        Image::open($tmp) -> resize(361, 512) -> save($pastaUpload . $nome_id . '.jpg');
    }
} else {
    $pastaUpload = dirname(__DIR__) . "/images/$user_actual/";
    copy($pastaUpload . "other.jpg", $pastaUpload . $nome_id . ".jpg");
}

$sql = "INSERT INTO assis (nome, nome_id, ep_atual, ep_tot, id_user) values ('$nome', '$nome_id', $ep_atual, $ep_tot, $id_user);";

$connection->query($sql);
