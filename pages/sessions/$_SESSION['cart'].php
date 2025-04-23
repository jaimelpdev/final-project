<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to manage the cart.";
    exit;
}

$user_id = $_SESSION['user_id'];

// Conect to to the database
$conn = new mysqli('localhost', 'root', '', 'mi_base_de_datos_usuarios');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Add product to the cart
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $product_id = $_POST['product_id'];

    // Add product to the database
    $query = "INSERT INTO carts (user_id, product_id) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $user_id, $product_id);
    if ($stmt->execute()) {
        // Update the session cart
        $_SESSION['cart'][] = $product_id;
        echo "Producto añadido al carrito correctamente.";
    } else {
        error_log("Error to add a product into cart: " . $stmt->error);
        echo "Error to add a product into cart.";
    }
}

// Show cart items
$query = "SELECT product_id FROM carts WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$cart_items = [];
while ($row = $result->fetch_assoc()) {
    $cart_items[] = $row['product_id'];

    echo "Products in the cart: " . implode(", ", $cart_items);
}
