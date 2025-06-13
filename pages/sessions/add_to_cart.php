<?php
session_start();
require_once '../../lib/config.php'; // Include the database connection

// Verify if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Invalid request method. Please use POST to add products to the cart.");
}

if (!isset($_SESSION['user_id'])) {
    die("Debes iniciar sesión para añadir productos al carrito.");
}

// Obtain the product ID from the POST request
$user_id = $_SESSION['user_id'];
$product_id = $_POST['product_id'];

// First, get or create the user's cart
$cartQuery = "SELECT id FROM carts WHERE user_id = ?";
$cartStmt = $conn->prepare($cartQuery);
$cartStmt->bind_param("i", $user_id);
$cartStmt->execute();
$cartResult = $cartStmt->get_result();

if ($cartResult->num_rows === 0) {
    // Create a new cart for the user
    $createCartQuery = "INSERT INTO carts (user_id) VALUES (?)";
    $createCartStmt = $conn->prepare($createCartQuery);
    $createCartStmt->bind_param("i", $user_id);
    $createCartStmt->execute();
    $cart_id = $conn->insert_id;
} else {
    $cartRow = $cartResult->fetch_assoc();
    $cart_id = $cartRow['id'];
}

// Check if the product is already in the cart
$checkQuery = "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?";
$checkStmt = $conn->prepare($checkQuery);
$checkStmt->bind_param("ii", $cart_id, $product_id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    // If the product already exists, increment the quantity
    $item = $checkResult->fetch_assoc();
    $updateQuery = "UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("i", $item['id']);
    $updateStmt->execute();
    echo "Cantidad del producto actualizada en el carrito.";
} else {
        // If the product does not exist, add it to the cart
    $insertQuery = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, 1)";
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("ii", $cart_id, $product_id);
    
    if ($insertStmt->execute()) {
            // Update the cart in the session
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }
        $_SESSION['cart'][] = $product_id;
        echo "Producto añadido al carrito correctamente.";
    } else {
        echo "Error al añadir el producto al carrito: " . $insertStmt->error;
    }
    $insertStmt->close();
}

$conn->close();
