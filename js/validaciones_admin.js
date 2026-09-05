document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Capturamos el formulario usando su ID
    let formNuevoUsuario = document.getElementById("form-nuevo-usuario");

    // Verificamos si estamos en la página correcta (si el formulario existe)
    if (formNuevoUsuario) {
        
        // 2. Escuchamos el evento 'submit' (cuando se presiona el botón guardar)
        formNuevoUsuario.addEventListener("submit", function(evento) {
            
            // Evitamos que la página se recargue de golpe
            evento.preventDefault();
            
            // Creamos una variable para saber si todo está correcto
            let formularioValido = true;

            // VALIDACIÓN 1: RUN
            let inputRun = document.getElementById("run");
            let errorRun = document.getElementById("error-run");
            let valorRun = inputRun.value.trim(); // .trim() quita espacios en blanco

            // Regla: No puede estar vacío, ni tener puntos, ni guiones
            if (valorRun === "") {
                errorRun.textContent = "El campo RUN no puede estar vacío.";
                errorRun.style.display = "block";
                formularioValido = false;
            } else if (valorRun.includes(".") || valorRun.includes("-")) {
                errorRun.textContent = "El RUN debe ingresarse sin puntos ni guion.";
                errorRun.style.display = "block";
                formularioValido = false;
            } else {
                errorRun.style.display = "none"; // Si está bien, ocultamos el error
            }

            // VALIDACIÓN 2: CORREO (Regla Duoc)
            let inputCorreo = document.getElementById("correo");
            let errorCorreo = document.getElementById("error-correo");
            let valorCorreo = inputCorreo.value.trim().toLowerCase();

            if (valorCorreo === "") {
                errorCorreo.textContent = "El correo es obligatorio.";
                errorCorreo.style.display = "block";
                formularioValido = false;
            } else if (
                !valorCorreo.endsWith("@gmail.com") && 
                !valorCorreo.endsWith("@duoc.cl") && 
                !valorCorreo.endsWith("@profesor.duoc.cl")
            ) {
                // Si NO termina en ninguna de esas 3 opciones, mostramos error
                errorCorreo.textContent = "Use un correo @gmail.com, @duoc.cl o @profesor.duoc.cl";
                errorCorreo.style.display = "block";
                formularioValido = false;
            } else {
                errorCorreo.style.display = "none";
            }

            // RESULTADO FINAL
            // Si después de revisar todo, formularioValido sigue siendo true...
            if (formularioValido === true) {
                alert("¡Usuario guardado correctamente!");
                formNuevoUsuario.reset(); // Limpiamos las cajas de texto
            }

        });
    }
});