$conn = new mysqli('localhost', 'root', '', 'mi_base_de_datos_usuarios');
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}