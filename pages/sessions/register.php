<?php
session_start();
require_once '../../lib/translations.php';
require_once 'db_connection.php';

$lang = 'es';
$translations = loadTranslations($lang);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "<script>alert('" . t('The email is already registered. Please use a different one.', $translations) . "');</script>";
    } else {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $password);

        if ($stmt->execute()) {
            echo "<script>alert('" . t('Registration successful', $translations) . "');</script>";
            header("Location: login.php");
        } else {
            echo "<script>alert('" . t('Error registering the user', $translations) . "');</script>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo t('Sign up', $translations); ?></title>
    <link rel="stylesheet" href="../../styles/auth.css">
</head>

<body>
    <div class="register-container">
        <h1 style="color: white;"><?php echo t('Sign up', $translations); ?></h1>
        <form action="register.php" method="POST">
            <label for="name"><?php echo t('Name', $translations); ?>:</label>
            <input type="text" name="name" id="name" required>
            <label for="email"><?php echo t('Email', $translations); ?>:</label>
            <input type="email" name="email" id="email" required>
            <label for="password"><?php echo t('Password', $translations); ?>:</label>
            <input type="password" name="password" id="password" required>
            <button type="submit"><?php echo t('Sign up', $translations); ?></button>
        </form>
    </div>
</body>

</html>