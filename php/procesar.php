<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);//mostrara cualquier error relacionado con la base de datos, consulta s


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    asdasdasdasdasd
    include("conexion.php");
    
    $responsable = $_POST["responsable"];
    $colegio = $_POST["colegio"];
    $curso = $_POST["curso"];
    $cantidad = $_POST["cantidad"];
    $horario = $_POST["horario"];
    $edad = $_POST["edad"];

    if ($edad < 16) {
        echo "menor"; // Devuelve "menor" si la edad no cumple el requisito
        exit;
    }

    // Conexión a base de datos
    $conn = new mysqli("localhost", "root", "", "educacion_vial");

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO inscripciones (responsable, colegio, curso, cantidad, horario, edad) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssisi", $responsable, $colegio, $curso, $cantidad, $horario, $edad);

    if ($stmt->execute()) {
        echo "ok";
    } else {
        echo "error";
    }

    $stmt->close();
    $conn->close();
}

?>