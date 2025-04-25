<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to manage the cart.";
    exit;
}

$user_id = $_SESSION['user_id'];

// Conect to the database
$conn = new mysqli('localhost', 'root', '', 'my_database');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Add product to the cart
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $product_id = $_POST['product_id'];

    // Save product to the database
    $query = "INSERT INTO carts (user_id, product_id) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $user_id, $product_id);
    if ($stmt->execute()) {
        // Update session cart
        $_SESSION['cart'][] = $product_id;
        echo "Producto añadido al carrito correctamente.";
    } else {
        error_log("Error al añadir producto al carrito: " . $stmt->error);
        echo "Error al añadir producto al carrito.";
    }
}

// Recupate cart items
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT product_id FROM carts WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $cart_items = [];
    while ($row = $result->fetch_assoc()) {
        $cart_items[] = $row['product_id'];
    }

    $_SESSION['cart'] = $cart_items;
    echo json_encode($cart_items);
}
