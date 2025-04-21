<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "Debes iniciar sesión para realizar el pago.";
    exit;
}

if (isset($_SESSION['cart']) && count($_SESSION['cart']) > 0) {
    $user_email = "usuario@example.com"; // Recuperar el correo del usuario desde la base de datos
    echo "Gracias por tu compra. Los detalles se enviarán a tu correo: $user_email.";
    // Aquí puedes procesar el pedido y limpiar el carrito
    $_SESSION['cart'] = [];
} else {
    echo "Tu carrito está vacío.";
}
