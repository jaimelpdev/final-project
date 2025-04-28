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

    setcookie("user_name", $name, time() + 3600, "/", "", false, true); // 1 hour of duration, HttpOnly

    echo json_encode(["message" => "Login successful", "user_name" => $name]);
    header("Location: http://localhost:3000");
    exit();
  } else {
    http_response_code(401);
    echo json_encode(["message" => "Invalid credentials"]);
  }

  $stmt->close();
}
