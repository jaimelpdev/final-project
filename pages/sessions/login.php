<?php
require_once '../../lib/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = $_POST['password'];

  $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();
  $stmt->bind_result($id, $name, $hashed_password);

  if ($stmt->fetch() && password_verify($password, $hashed_password)) {
    $_SESSION['user_id'] = $id;
    $_SESSION['user_name'] = $name;
    $_SESSION['user_email'] = $email; // Save email in session

    setcookie("user_name", $name, time() + 3600, "/", "", false, true); // 1 hour of duration, HttpOnly

    // Recuperate the cart items for the user
    $cartQuery = "SELECT product_id FROM carts WHERE user_id = ?";
    $cartStmt = $conn->prepare($cartQuery);
    $cartStmt->bind_param("i", $id);
    $cartStmt->execute();
    $cartResult = $cartStmt->get_result();

    $_SESSION['cart'] = [];
    while ($row = $cartResult->fetch_assoc()) {
        $_SESSION['cart'][] = $row['product_id'];
    }

    echo json_encode(["message" => "Login successful", "user_name" => $name]);
    header("Location: http://localhost:3000");
    exit();
  } else {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
  }

  $stmt->close();
}
