<?php
session_start();
require_once '../../lib/config.php'; 

// Verify if the request method is POST
if (!isset($_SESSION['user_id'])) {
    die("Debes iniciar sesión para añadir productos al carrito.");
}

// Obtain the product ID from the POST request
$user_id = $_SESSION['user_id'];
$product_id = $_POST['product_id'];

// Verify if the product ID is valid
$queryCheck = "SELECT id FROM carts WHERE user_id = ? AND product_id = ?";
$stmtCheck = $conn->prepare($queryCheck);
$stmtCheck->bind_param("ii", $user_id, $product_id);
$stmtCheck->execute();
$stmtCheck->store_result();

if ($stmtCheck->num_rows > 0) {
    echo "El producto ya está en el carrito.";
    exit;
}

// Insert the product into the cart
$query = "INSERT INTO carts (user_id, product_id) VALUES (?, ?)";
$stmt = $conn->prepare($query);

if ($stmt) {
    $stmt->bind_param("ii", $user_id, $product_id);
    if ($stmt->execute()) {
        //Update the session cart
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }
        $_SESSION['cart'][] = $product_id;

        echo "Producto añadido al carrito correctamente.";
    } else {
        echo "Error al añadir el producto al carrito: " . $stmt->error;
    }
    $stmt->close();
} else {
    echo "Error en la preparación de la consulta: " . $conn->error;
}

$conn->close();
