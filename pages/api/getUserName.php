<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if (isset($_SESSION['user_name'])) {
    echo json_encode(['user_name' => $_SESSION['user_name']]);
} else {
    echo json_encode(['user_name' => null]);
}
exit;