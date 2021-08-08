<?php
require_once realpath(dirname(__FILE__) . "/../config/connection.php");
header("Access-Control-Allow-Origin: *");

$user = $_POST['user'];
$sql = "SELECT name, user, id from users where user = '$user'";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    while ($results = $result->fetch_assoc()) {
        $name = $results['name'];
        $user = $results['user'];
        $id = $results['id'];
        echo json_encode(['user' => $user, 'name' => $name, 'id' => $id]);
    }
} else {
    $name = 'not_user';
    echo json_encode($name);
}