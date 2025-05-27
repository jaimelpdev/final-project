<?php
session_start();

$host = '127.0.0.1:3308';
$db = 'my_database';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
