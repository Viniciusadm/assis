<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$user = $_POST['user'];
$sql = "SELECT name from users where user = '$user'";
$result = $connection->query($sql);
$name = '';

if ($result->num_rows > 0) {
    $name = $result->fetch_assoc()['name'];
} else {
    $name = 'not_user';
}

echo json_encode($name);