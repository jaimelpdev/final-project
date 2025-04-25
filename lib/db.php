<?php

declare(strict_types=1);

// Configuration of the database connection
$conn = new mysqli('localhost', 'root', '', 'my_database');

// Verify the connection
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
