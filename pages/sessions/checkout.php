<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to proceed to checkout.";
    exit;
}

if (isset($_SESSION['cart']) && count($_SESSION['cart']) > 0) {
    $user_email = "usuario@example.com";
    echo "Thank you for your purchase. Your order will be processed shortly and sent to your email.";
    $_SESSION['cart'] = [];
} else {
    echo "Your cart is empty.";
}
