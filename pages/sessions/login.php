<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
  $name = $_POST['name'];

  $conn = new mysqli('localhost', 'root', '', 'mi_base_de_datos_usuarios');

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

    if (!isset($_SESSION['cart'])) {
      $_SESSION['cart'] = [];
    }

    echo "<script>
    sessionStorage.setItem('user_name', '$name');
    window.location.href = '/index.js';
    </script>";

    echo "Log in succesful, $name. Redirecting to the main page...";
    header("Location: http://localhost:3000");
    exit;
  } else {
    echo "Email or password are wrong.";
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
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <button type="submit">Log in</button>
  </form>
</body>

</html>