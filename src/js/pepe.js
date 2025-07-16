document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario");
    const edadInput = document.getElementById("edad");
    const mensajeError = document.getElementById("mensajeError");
    const mensajeExito = document.getElementById("mensajeExito");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const edad = parseInt(edadInput.value);
        if (edad < 16) {
        mensajeError.classList.remove("d-none");
        mensajeExito.classList.add("d-none");
        return;
    }

      // Enviar con fetch a PHP
    const formData = new FormData(form);
    fetch("./php/procesar.php", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.text())
        .then((data) => {
            if (data === "ok") {
            mensajeError.classList.add("d-none");
            mensajeExito.classList.remove("d-none");
            form.reset();
        } else {
            alert("Error al enviar inscripción: " + data);
        }
        })
        .catch((err) => {
            alert("Error de conexión");
        });
    });
});