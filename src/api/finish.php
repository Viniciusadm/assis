<?php
header("Access-Control-Allow-Origin: *");
require_once realpath(dirname(__FILE__) . "/../config/connection.php");

$id = $_POST['id'];
$type = $_POST['type'];
$type_number = 1;

if ($type === 'finish') {
    $type_number = 3;
}

$sql = "UPDATE assis SET status = $type_number WHERE id = $id";

$connection->query($sql);