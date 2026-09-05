// Esperamos a que todo el HTML cargue antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================================================
    // 1. LÓGICA PARA EL FORMULARIO DE NUEVO USUARIO
    // =========================================================================
    let formNuevoUsuario = document.getElementById("form-nuevo-usuario") || document.getElementById("form-editar-usuario");

    if (formNuevoUsuario) {
        formNuevoUsuario.addEventListener("submit", function(evento) {
            evento.preventDefault();
            let formularioValido = true;

            // VALIDACIÓN RUN
            let inputRun = document.getElementById("run");
            let errorRun = document.getElementById("error-run");
            let valorRun = inputRun.value.trim();

            if (valorRun === "") {
                errorRun.textContent = "El campo RUN no puede estar vacío.";
                errorRun.style.display = "block";
                formularioValido = false;
            } else if (valorRun.includes(".") || valorRun.includes("-")) {
                errorRun.textContent = "El RUN debe ingresarse sin puntos ni guion.";
                errorRun.style.display = "block";
                formularioValido = false;
            } else {
                errorRun.style.display = "none";
            }

            // VALIDACIÓN CORREO
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
                errorCorreo.textContent = "Use un correo @gmail.com, @duoc.cl o @profesor.duoc.cl";
                errorCorreo.style.display = "block";
                formularioValido = false;
            } else {
                errorCorreo.style.display = "none";
            }

            if (formularioValido === true) {
                alert("¡Usuario guardado correctamente!");
                formNuevoUsuario.reset();
            }
        });
    }

    // =========================================================================
    // 2. LÓGICA PARA EL FORMULARIO DE NUEVO PRODUCTO
    // =========================================================================
    let formNuevoProducto = document.getElementById("form-nuevo-producto") || document.getElementById("form-editar-producto");

    if (formNuevoProducto) {
        formNuevoProducto.addEventListener("submit", function(evento) {
            evento.preventDefault();
            let formularioValido = true;

            // VALIDACIÓN CÓDIGO
            let inputCodigo = document.getElementById("codigo");
            let errorCodigo = document.getElementById("error-codigo");
            let valorCodigo = inputCodigo.value.trim();

            if (valorCodigo === "") {
                errorCodigo.textContent = "El código no puede estar vacío.";
                errorCodigo.style.display = "block";
                formularioValido = false;
            } else if (valorCodigo.length < 3) {
                errorCodigo.textContent = "El código debe tener al menos 3 caracteres.";
                errorCodigo.style.display = "block";
                formularioValido = false;
            } else {
                errorCodigo.style.display = "none";
            }

            // VALIDACIÓN PRECIO
            let inputPrecio = document.getElementById("precio");
            let errorPrecio = document.getElementById("error-precio");
            let valorPrecio = inputPrecio.value;

            if (valorPrecio === "") {
                errorPrecio.textContent = "El precio es obligatorio.";
                errorPrecio.style.display = "block";
                formularioValido = false;
            } else if (Number(valorPrecio) < 0) {
                errorPrecio.textContent = "El precio no puede ser un número negativo.";
                errorPrecio.style.display = "block";
                formularioValido = false;
            } else {
                errorPrecio.style.display = "none";
            }

            // VALIDACIÓN STOCK
            let inputStock = document.getElementById("stock");
            let errorStock = document.getElementById("error-stock");
            let valorStock = inputStock.value;

            if (valorStock === "") {
                errorStock.textContent = "El stock es obligatorio.";
                errorStock.style.display = "block";
                formularioValido = false;
            } else if (Number(valorStock) < 0) {
                errorStock.textContent = "El stock no puede ser negativo.";
                errorStock.style.display = "block";
                formularioValido = false;
            } else {
                errorStock.style.display = "none";
            }

            if (formularioValido === true) {
                alert("¡Producto registrado exitosamente!");
                formNuevoProducto.reset();
            }
        });
    }

    // =========================================================================
    // 3. LÓGICA PARA EL MENÚ HAMBURGUESA (MÓVILES)
    // =========================================================================
    let btnMenu = document.getElementById("btn-menu");
    let sidebar = document.querySelector(".admin-sidebar");

    if (btnMenu && sidebar) {
        btnMenu.addEventListener("click", function() {
            // Activa o desactiva la clase "mostrar" para deslizar el menú
            sidebar.classList.toggle("mostrar");
        });
    }

});