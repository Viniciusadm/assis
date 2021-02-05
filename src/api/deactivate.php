<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$status = '';
$id = $_POST['id'];
$type = $_POST['type'];

if ($type === 'activate') {
    $status = 1;
} elseif ($type ===  'deactivate') {
    $status = 2;
}

$sql = "UPDATE assis set status = $status where id = $id;";

$connection->query($sql);