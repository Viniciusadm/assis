<?php
session_start();
require_once realpath(dirname(__FILE__) . '/../../config/connection.php');

$user = mysqli_real_escape_string($connection, $_POST['user']);
$password = mysqli_real_escape_string($connection, $_POST['password']);
$sql = "SELECT user, password, name FROM users WHERE user = '$user'";

$result = $connection->query($sql);

if ($result->num_rows === 0) {
    $_SESSION['error'] = 'Usuário inexistente';
    header('Location: /pages/login/');
}

if ($result->num_rows > 0) {
    $array = $result->fetch_assoc();
    $bd_password = $array['password'];
    $bd_name = $array['name'];

    if ($bd_password === $password) {
        $_SESSION['logged'] = true;
        $_SESSION['name'] = $bd_name;
        header('Location: /index.php');
    } else {
        $_SESSION['error'] = 'Senha incorreta';
        header('Location: /pages/login/');
    }
}