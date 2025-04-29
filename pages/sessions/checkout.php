<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to proceed to checkout.";
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

    echo "Thank you for your purchase. Check your email " . $_SESSION['user_email'] . " for further instructions soon.";
} else {
    echo "Your cart is empty.";
}
