<?php
// filepath: d:\ProyectoClase\final-project\pages\sessions\login.php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Conexión a la base de datos
  $conn = new mysqli('localhost', 'root', '', 'mi_base_de_datos');

  if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
  }

  $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();
  $stmt->bind_result($id, $name, $hashed_password);

  if ($stmt->fetch() && password_verify($password, $hashed_password)) {
    $_SESSION['user_id'] = $id;
    $_SESSION['user_name'] = $name;

    // Recuperar el carrito del usuario
    if (!isset($_SESSION['cart'])) {
      $_SESSION['cart'] = [];
    }

    echo "Inicio de sesión exitoso. Bienvenido, $name.";
  } else {
    echo "Correo o contraseña incorrectos.";
  }

  $stmt->close();
  $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión</title>
</head>

<body>
  <form method="POST" action="login.php">
    <label for="email">Correo:</label>
    <input type="email" id="email" name="email" required>
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" required>
    <button type="submit">Iniciar Sesión</button>
  </form>
</body>

</html>