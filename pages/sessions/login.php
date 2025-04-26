<?php
session_start();

require_once '../../lib/db.php';

$conn = new mysqli('localhost', 'root', '', 'my_database');

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = $_POST['password'];

  $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();
  $stmt->bind_result($id, $name, $hashed_password);

  if ($stmt->fetch()) {
    if (password_verify($password, $hashed_password)) {
      $_SESSION['user_id'] = $id;
      $_SESSION['user_name'] = $name;

      // Redirigir a la página inicial
      header("Location: http://localhost:3000");
      exit;
    } else {
      echo "Error: Contraseña incorrecta.";
      exit;
    }
  } else {
    echo "Error: Usuario no encontrado.";
    exit;
  }

  $stmt->close();
}

if (isset($_SESSION['user_id'])) {
  $user_id = $_SESSION['user_id'];

  // Recuperar los productos del carrito
  $query = "SELECT product_id FROM carts WHERE user_id = ?";
  $stmt = $conn->prepare($query);
  if (!$stmt) {
    die("Error en la preparación de la consulta: " . $conn->error);
  }
  $stmt->bind_param("i", $user_id);
  $stmt->execute();
  $result = $stmt->get_result();

  $_SESSION['cart'] = [];
  while ($row = $result->fetch_assoc()) {
    $_SESSION['cart'][] = $row['product_id'];
  }

  $stmt->close();
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Log in</title>
  <link rel="stylesheet" href="../../styles/auth.css">
</head>

<body>
  <form method="POST" action="login.php">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <button type="submit">Log in</button>
  </form>
</body>

</html>