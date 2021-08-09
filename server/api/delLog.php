<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$id = $_POST['id'];

$sql = "DELETE FROM log WHERE id = $id";
$connection->query($sql);