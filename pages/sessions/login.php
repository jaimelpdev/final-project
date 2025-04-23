<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = $_POST['password'];
  $name = isset($_POST['name']) ? $_POST['name'] : null;

  $conn = new mysqli('localhost', 'root', '', 'mi_base_de_datos_usuarios');

  if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
  }

  $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();
  $stmt->bind_result($id, $name, $hashed_password);

  if ($stmt->fetch()) {
    if (password_verify($password, $hashed_password)) {
      $_SESSION['user_id'] = $id;
      $_SESSION['user_name'] = $name;

      if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
      }

      setcookie("user_name", $name, time() + 3600, "/"); // Expires in 1 hour

      echo "<script>
      window.location.href = 'http://localhost:3000';
      </script>";
      exit;
    } else {
      echo "The password is incorrect.";
    }
  } else {
    echo "The email does not exist.";
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
  <title>Log in</title>
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