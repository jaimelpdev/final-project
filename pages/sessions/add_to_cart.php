<?php
session_start();
require_once '../../lib/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $product_id = intval($_POST['product_id']);
    $user_id = intval($_SESSION['user_id']); // Asegúrate de que el usuario esté autenticado

    // Verify if the product exists in the database
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
