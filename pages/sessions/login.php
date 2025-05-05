<?php
require_once '../../lib/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Prepare the SQL statement to prevent SQL injection
  $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();
  $stmt->bind_result($id, $name, $hashed_password);

  // Verify if the user exists and the password is correct
  if ($stmt->fetch() && password_verify($password, $hashed_password)) {
    // Save user data in session variables
    session_start();
    $_SESSION['user_id'] = $id;
    $_SESSION['user_name'] = $name;
    $_SESSION['user_email'] = $email;

    // Create a cookie with the user's name
    setcookie("user_name", $name, time() + 3600, "/", "", false, true); // 1 hour expiration

    // Recuperate the user's cart items from the database
    $cartQuery = "SELECT product_id FROM carts WHERE user_id = ?";
    $cartStmt = $conn->prepare($cartQuery);
    $cartStmt->bind_param("i", $id);
    $cartStmt->execute();
    $result = $cartStmt->get_result();

    // Save the cart items in the session
    $_SESSION['cart'] = [];
    while ($row = $result->fetch_assoc()) {
      $_SESSION['cart'][] = $row['product_id'];
    }

    // Redirect to the main page or dashboard
    header("Location: http://localhost:3000");
    exit;
  } else {
    echo "<script>alert('Credentials incorrects. Please try again.');</script>";
  }

  $stmt->close();
}
?>

<!-- Log in form -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    <link rel="stylesheet" href="../../styles/auth.css" />
  </head>
  <body>
    <form action="login.php" method="POST">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
  </body>
</html>
