<?php
// Required files for configuration, translations, and database connection
require_once '../../lib/config.php';
require_once '../../lib/translations.php';
require_once 'db_connection.php';

// Set default language and load translations
$lang = 'es';
$translations = loadTranslations($lang);

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user input from form
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
        // Initialize session and store user data
        session_start();
        $_SESSION['user_id'] = $id;
        $_SESSION['user_name'] = $name;
        $_SESSION['user_email'] = $email;

        // Set secure cookie with user's name (1 hour expiration)
        setcookie("user_name", $name, time() + 3600, "/", "", false, true);

        // Retrieve user's cart items from database
        $cartQuery = "SELECT ci.product_id, ci.quantity 
                     FROM carts c 
                     JOIN cart_items ci ON c.id = ci.cart_id 
                     WHERE c.user_id = ?";
        $cartStmt = $conn->prepare($cartQuery);
        $cartStmt->bind_param("i", $id);
        $cartStmt->execute();
        $result = $cartStmt->get_result();

        // Initialize cart in session and populate with user's items
        $_SESSION['cart'] = [];
        while ($row = $result->fetch_assoc()) {
            // Añadir el producto tantas veces como su cantidad
            for ($i = 0; $i < $row['quantity']; $i++) {
                $_SESSION['cart'][] = $row['product_id'];
            }
        }

        // Redirect to main page after successful login
        header("Location: http://localhost:3000");
        exit;
    } else {
        // Display error message for invalid credentials
        echo "<script>alert('" . t('Credentials incorrect. Please try again.', $translations) . "');</script>";
    }

    $stmt->close();
}
?>

<!-- Login form HTML structure -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?php echo t('Log in', $translations); ?></title>
  <link rel="stylesheet" href="../../styles/auth.css" />
</head>

<body>
  <div class="login-container">
    <h1 style="color: white;"><?php echo t('Log in', $translations); ?></h1>
    <form action="login.php" method="POST">
      <label for="email"><?php echo t('Email', $translations); ?>:</label>
      <input type="email" name="email" id="email" required />
      <label for="password"><?php echo t('Password', $translations); ?>:</label>
      <input type="password" name="password" id="password" required />
      <button type="submit"><?php echo t('Log in', $translations); ?></button>
    </form>
  </div>
</body>

</html>