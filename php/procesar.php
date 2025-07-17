<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $responsable = $_POST["responsable"];
    $colegio = $_POST["colegio"];
    $curso = $_POST["curso"];
    $cantidad = $_POST["cantidad"];
    $horario = $_POST["horario"];
    $edad = $_POST["edad"];

    if ($edad < 16) {
        echo "menor";
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
