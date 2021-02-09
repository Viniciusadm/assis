<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$user = $_POST['user'];

$sql = "SELECT id from users where user = '$user';";

$result = $connection->query($sql);

echo json_encode($result->fetch_assoc());