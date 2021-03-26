<?php
header("Access-Control-Allow-Origin: *");
require_once realpath(dirname(__FILE__) . "/../config/connection.php");

$sql = "SELECT link from links where id = 1";
$result = $connection->query($sql);
$link = $result->fetch_assoc()['link'];
echo json_encode($link);

if (isset($_POST['link'])) {
    $link = $_POST['link'];
    $sql = "UPDATE links SET link = '$link' WHERE id = 1;";
    $connection->query($sql);
}