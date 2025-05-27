<?php
// Database configuration
$servername = "127.0.0.1:3308";
$username = "root";
$password = "";
$database = "my_database";

// Create connection with additional options
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set to UTF-8 for proper encoding
$conn->set_charset("utf8");
?>