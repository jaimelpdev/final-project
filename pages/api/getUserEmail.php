<?php
session_start();
header("Content-Type: application/json");

if (isset($_SESSION['user_email'])) {
    echo json_encode(['email' => $_SESSION['user_email']]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'User not logged in']);
}