<?php
session_start();
require_once '../../lib/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $product_id = intval($_POST['product_id']);
    $user_id = intval($_SESSION['user_id']);

    // Verify if the product exists in the database
    $productCheckQuery = "SELECT id FROM products WHERE id = ?";
    $productStmt = $conn->prepare($productCheckQuery);
    $productStmt->bind_param("i", $product_id);
    $productStmt->execute();
    $productResult = $productStmt->get_result();

    if ($productResult->num_rows === 0) {
        echo "The product doesn't exists.";
        exit;
    }

    // Insert the product into the cart
    $query = "INSERT INTO carts (user_id, product_id) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $user_id, $product_id);

    if ($stmt->execute()) {
        // Update the session cart array
        $_SESSION['cart'][] = $product_id;
        echo "Product added to cart successfully.";
    } else {
        echo "Error to add the product to cart: " . $stmt->error;
    }
}
