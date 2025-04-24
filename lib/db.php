$conn = new mysqli('localhost', 'root', '', 'my_database');
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}