document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.querySelector("#form-registro");

    if (formRegistro) {
        const inputs = formRegistro.querySelectorAll("input[required]");


        inputs.forEach(input => {
            input.addEventListener("blur", () => validarCampo(input));
            input.addEventListener("input", () => {
                if (input.classList.contains("error")) {
                    validarCampo(input);
                }
            });
        });

        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();
            let esValido = true;

            inputs.forEach(input => {
                if (!validarCampo(input)) {
                    esValido = false;
                }
            });

            if (esValido) {
                alert("¡Registro exitoso! Bienvenido a Sabor & Aroma.");
                formRegistro.reset();
            }
        });
    }
});

function validarCampo(input) {
    const errorContainer = obtenerOCrearContenedorError(input);
    let mensajeError = "";


    if (input.value.trim() === "") {
        mensajeError = "Este campo es obligatorio.";
    } 

    else if (input.type === "email") {
        const correo = input.value.trim().toLowerCase();
        const dominiosPermitidos = ["@gmail.com", "@duoc.cl", "@profesor.duoc.cl"];

        const esDominioValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

        if (!esDominioValido) {
            mensajeError = "Solo se permiten correos @gmail.com, @duocuc.cl o @profesor.duoc.cl";
        }
    } 

    else if (input.type === "password" && input.value.length < 6) {
        mensajeError = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (mensajeError) {
        input.classList.add("error");
        errorContainer.textContent = mensajeError;
        errorContainer.style.display = "block";
        return false;
    } else {
        input.classList.remove("error");
        errorContainer.textContent = "";
        errorContainer.style.display = "none";
        return true;
    }
}

function obtenerOCrearContenedorError(input) {
    let errorSpan = input.parentElement.querySelector(".error-message");
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.className = "error-message";
        input.parentElement.appendChild(errorSpan);
    }
    return errorSpan;
}