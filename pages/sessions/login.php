<?php
require_once '../../lib/config.php'; // Conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Preparar la consulta para verificar el usuario
  $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();
  $stmt->bind_result($id, $name, $hashed_password);

  // Verificar si el usuario existe y la contraseña es correcta
  if ($stmt->fetch() && password_verify($password, $hashed_password)) {
    // Guardar los datos del usuario en la sesión
    session_start();
    $_SESSION['user_id'] = $id;
    $_SESSION['user_name'] = $name;
    $_SESSION['user_email'] = $email;

    // Crear una cookie con el nombre del usuario
    setcookie("user_name", $name, time() + 3600, "/", "", false, true); // 1 hora de duración, HttpOnly

    // Recuperar los artículos del carrito desde la base de datos
    $cartQuery = "SELECT product_id FROM carts WHERE user_id = ?";
    $cartStmt = $conn->prepare($cartQuery);
    $cartStmt->bind_param("i", $id);
    $cartStmt->execute();
    $result = $cartStmt->get_result();

    // Guardar los artículos del carrito en la sesión
    $_SESSION['cart'] = [];
    while ($row = $result->fetch_assoc()) {
      $_SESSION['cart'][] = $row['product_id'];
    }

    // Redirigir al usuario a la página principal
    header("Location: http://localhost:3000");
    exit;
  } else {
    // Mostrar un mensaje de error si las credenciales son incorrectas
    echo "Correo o contraseña incorrectos.";
  }

  $stmt->close();
}
