<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once '../../lib/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $product_id = intval($_POST['product_id']);
    $user_id = intval($_SESSION['user_id']);

    // Verificar que el usuario existe
    $userCheckQuery = "SELECT id FROM users WHERE id = ?";
    $userStmt = $conn->prepare($userCheckQuery);
    $userStmt->bind_param("i", $user_id);
    $userStmt->execute();
    $userResult = $userStmt->get_result();

    if ($userResult->num_rows === 0) {
        echo "El usuario no existe.";
        exit;
    }

    // Verify that the product exists
    $productCheckQuery = "SELECT id FROM products WHERE id = ?";
    $productStmt = $conn->prepare($productCheckQuery);
    $productStmt->bind_param("i", $product_id);
    $productStmt->execute();
    $productResult = $productStmt->get_result();

    if ($productResult->num_rows === 0) {
        echo "El producto no existe.";
        exit;
    }

    // Insert the product into the cart
    $query = "INSERT INTO carts (user_id, product_id) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $user_id, $product_id);

    if ($stmt->execute()) {
        echo "Producto añadido al carrito correctamente.";
    } else {
        echo "Error al añadir el producto al carrito: " . $stmt->error;
    }
}
