<?php
session_start();
require_once '../../lib/config.php'; // Asegúrate de que este archivo contiene la conexión a la base de datos

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user_id'])) {
    die("Debes iniciar sesión para añadir productos al carrito.");
}

// Obtener el ID del usuario y el producto
$user_id = $_SESSION['user_id'];
$product_id = $_POST['product_id']; // Asegúrate de que este dato se envíe desde el formulario

// Verificar si el producto ya está en el carrito
$queryCheck = "SELECT id FROM carts WHERE user_id = ? AND product_id = ?";
$stmtCheck = $conn->prepare($queryCheck);
$stmtCheck->bind_param("ii", $user_id, $product_id);
$stmtCheck->execute();
$stmtCheck->store_result();

if ($stmtCheck->num_rows > 0) {
    echo "El producto ya está en el carrito.";
    exit;
}

// Insertar el producto en la tabla carts
$query = "INSERT INTO carts (user_id, product_id) VALUES (?, ?)";
$stmt = $conn->prepare($query);

if ($stmt) {
    $stmt->bind_param("ii", $user_id, $product_id);
    if ($stmt->execute()) {
        // Actualizar el carrito en la sesión
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
