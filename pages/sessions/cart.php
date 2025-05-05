<?php
session_start();
require_once '../../lib/config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtain the cart items for the logged-in user
    $query = "SELECT product_id, name, price, category, quantity FROM carts WHERE user_id = ?";
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
    // Add a product to the cart
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $price = $data['price'];
    $category = $data['category'];

    $query = "INSERT INTO carts (user_id, name, price, category, quantity) VALUES (?, ?, ?, ?, 1)
              ON DUPLICATE KEY UPDATE quantity = quantity + 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("isss", $user_id, $name, $price, $category);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product added to cart"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to add product"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Delete a product from the cart
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['name']) && isset($data['category'])) {
        $name = $data['name'];
        $category = $data['category'];

        $query = "DELETE FROM carts WHERE user_id = ? AND name = ? AND category = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("iss", $user_id, $name, $category);
    } else {
        $query = "DELETE FROM carts WHERE user_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $user_id);
    }

    if ($stmt->execute()) {
        echo json_encode(["message" => "Cart updated"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update cart"]);
    }
}
