<?php
$host = "localhost";
$usuario = "root";
$contrasena = ""; // sin contraseña por defecto en XAMPP
$base = "educacion_vial";

$conn = new mysqli($host, $usuario, $contrasena, $bd);

// Verificamos la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
