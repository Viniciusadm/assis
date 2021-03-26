<?php
header("Access-Control-Allow-Origin: *");
require_once realpath(dirname(__FILE__) . "/../config/connection.php");

$id_user = $_POST['id_user'];
$nav_id = $_POST['nav_id'];

$sql = "DELETE FROM sessions WHERE user_id = $id_user and nav_id = $nav_id";
$connection->query($sql);