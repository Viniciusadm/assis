<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$id = $_POST['id'];

$sql = "DELETE FROM assis WHERE id = $id";

$connection->query($sql);