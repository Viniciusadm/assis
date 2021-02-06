<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$id = $_POST['id'];
$nome_id = $_POST['nome_id'];

$sql = "DELETE FROM assis WHERE id = $id";
$connection->query($sql);

$dirImages = realpath(dirname(__DIR__) . '/images/');
unlink($dirImages . '/' . $nome_id . '.jpg');