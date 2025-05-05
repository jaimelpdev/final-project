<?php
session_start();
require_once '../../lib/config.php';

if (!isset($_SESSION['user_id'])) {
    echo "Debes iniciar sesión para proceder al checkout.";
    exit;
}

if (isset($_SESSION['cart']) && count($_SESSION['cart']) > 0) {
    $user_id = $_SESSION['user_id'];

    // Empty the cart in the database
    $query = "DELETE FROM carts WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    // Empty the session cart
    $_SESSION['cart'] = [];

    echo "Gracias por tu compra. Revisa tu correo " . $_SESSION['user_email'] . " para más instrucciones.";
} else {
    echo "Tu carrito está vacío.";
}
