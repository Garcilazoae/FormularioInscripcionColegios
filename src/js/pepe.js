console.log("pepe.js cargado correctamente");
//para asegurarn que cargue el pepe.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario");
    const edadInputInicial = document.getElementById("edad-alumno-inicial"); // Correcto ID
    const edadInputVerificada = document.getElementById("edad");
    const mensajeErrorEdadInicial = document.getElementById("error-edad-inicial");
    const mensajeErrorEnvio = document.getElementById("mensajeError"); 
    const mensajeExito = document.getElementById("mensajeExito");

    // Obtener todos los elementos del formulario que no son la edad inicial
    const formElements = form.querySelectorAll('input:not(#edad-alumno-inicial), select, button, #terminos');

    function habilitarFormulario() {
        formElements.forEach(element => {
            element.disabled = false;
        });
        mensajeErrorEdadInicial.classList.add("d-none");
    }

    function deshabilitarFormulario() {
        formElements.forEach(element => {
            element.disabled = true;
        });
        mensajeErrorEdadInicial.classList.remove("d-none");
        mensajeExito.classList.add("d-none"); 
    }

    // Deshabilitar el formulario al cargar la página
    deshabilitarFormulario();

    edadInputInicial.addEventListener("input", function() { // Evento 'input' para capturar cambios en tiempo real
        const edad = parseInt(edadInputInicial.value);
        if (edad >= 16) {
            habilitarFormulario();
            edadInputVerificada.value = edad; 
            edadInputVerificada.classList.remove("is-invalid"); 
        } else {
            deshabilitarFormulario();
            edadInputVerificada.value = ''; 
            mensajeErrorEnvio.classList.add("d-none"); 
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const edadInicial = parseInt(edadInputInicial.value);
        if (edadInicial < 16) {
            mensajeErrorEdadInicial.classList.remove("d-none");
            mensajeExito.classList.add("d-none");
            deshabilitarFormulario(); 
            return;
        }
        
        const formData = new FormData(form);
        fetch("./php/procesar.php", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.text())
            .then((data) => {
                console.log("Respuesta del servidor:", data);

                if (data === "ok") {
                    mensajeErrorEnvio.classList.add("d-none"); 
                    mensajeExito.classList.remove("d-none");
                    form.reset();
                    deshabilitarFormulario(); 
                    edadInputInicial.value = ''; 
                    edadInputVerificada.value = ''; 
                } else if (data === "menor") { 
                    mensajeErrorEdadInicial.classList.remove("d-none");
                    mensajeExito.classList.add("d-none");
                    alert("Error: La edad del alumno debe ser al menos 16 años (validación del servidor).");
                } else {
                    alert("Error al enviar inscripción: " + data);
                    mensajeExito.classList.add("d-none");
                    mensajeErrorEnvio.classList.remove("d-none"); 
                }
            })
            .catch((err) => {
                alert("Error de conexión al servidor.");
                mensajeExito.classList.add("d-none");
                mensajeErrorEnvio.classList.remove("d-none"); 
            });
    });
});