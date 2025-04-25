<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$conn = new mysqli('localhost', 'root', '', 'my_database');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Recuperar productos del carrito
    $query = "SELECT product_id FROM carts WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $cart = [];
    while ($row = $result->fetch_assoc()) {
        $cart[] = $row;
    }

    echo json_encode($cart);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Añadir producto al carrito
    $data = json_decode(file_get_contents("php://input"), true);
    $product_id = $data['product_id'];

    $query = "INSERT INTO carts (user_id, product_id) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();

    echo json_encode(["success" => true]);
}