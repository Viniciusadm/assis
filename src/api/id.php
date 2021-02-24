<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$user = $_POST['user'];
$nav_id = $_POST['nav_id'];

$sql = "SELECT id from users where user = '$user';";

$result = $connection->query($sql);

$id_array = $result->fetch_assoc();

$id = $id_array['id'];

$sql = "INSERT INTO sessions (user_id, nav_id) values ($id, $nav_id)";
$connection->query($sql);

echo json_encode($id_array);

