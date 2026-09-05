document.addEventListener("DOMContentLoaded", () => {
    
    // Capturamos el formulario de nuevo usuario
    const formNuevoUsuario = document.querySelector("#form-nuevo-usuario");

    if (formNuevoUsuario) {
        formNuevoUsuario.addEventListener("submit", (e) => {
            // Prevenimos que la página se recargue automáticamente
            e.preventDefault();
            let esValido = true;

            // --- 1. VALIDACIÓN DEL RUN ---
            const runInput = document.querySelector("#run");
            const errorRun = document.querySelector("#error-run");
            const runValue = runInput.value.trim();

            // Comprobamos si tiene puntos o guiones
            if (runValue.includes(".") || runValue.includes("-")) {
                errorRun.textContent = "El RUN debe ingresarse sin puntos ni guion.";
                errorRun.style.display = "block";
                runInput.classList.add("error");
                esValido = false;
            } else {
                errorRun.style.display = "none";
                runInput.classList.remove("error");
            }

            // --- 2. VALIDACIÓN DEL CORREO ---
            const correoInput = document.querySelector("#correo");
            const errorCorreo = document.querySelector("#error-correo");
            const correoValue = correoInput.value.trim().toLowerCase();
            
            // Dominios exigidos
            const dominiosPermitidos = ["@gmail.com", "@duoc.cl", "@profesor.duoc.cl"];
            const esDominioValido = dominiosPermitidos.some(dominio => correoValue.endsWith(dominio));

            if (!esDominioValido) {
                errorCorreo.textContent = "Solo se permiten correos @gmail.com, @duoc.cl o @profesor.duoc.cl";
                errorCorreo.style.display = "block";
                correoInput.classList.add("error");
                esValido = false;
            } else {
                errorCorreo.style.display = "none";
                correoInput.classList.remove("error");
            }

            // --- 3. MENSAJE FINAL SI TODO ESTÁ BIEN ---
            if (esValido) {
                alert("¡Usuario administrador registrado con éxito!");
                formNuevoUsuario.reset(); 
            }
        });
    }
    
});