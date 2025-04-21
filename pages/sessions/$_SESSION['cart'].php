<?php
session_start();

// Agregar un producto al carrito
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $product_id = $_POST['product_id'];

    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }

    $_SESSION['cart'][] = $product_id;
    echo "Producto añadido al carrito.";
}

// Mostrar el carrito
if (isset($_SESSION['cart'])) {
    echo "Productos en el carrito: " . implode(", ", $_SESSION['cart']);
}
?>