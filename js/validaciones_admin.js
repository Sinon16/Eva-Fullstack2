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
                // GUARDADO DE USUARIO EN MEMORIA
                let nuevoUsuario = {
                    nombre: document.getElementById("nombreUsuario").value + " " + document.getElementById("apellidos").value,
                    email: valorCorreo,
                    password: "1234", 
                    esAdmin: document.getElementById("rol").value === "Administrador"
                };
                localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));
                
                alert("¡Usuario guardado correctamente en la memoria!");
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

            // SI TODO ESTÁ BIEN, GUARDAMOS EN LA MEMORIA CON EL TRUCO NINJA
            if (formularioValido === true) {
                // Capturamos el archivo de imagen si el usuario subió uno
                let inputImagen = document.getElementById("imagen");
                let archivo = inputImagen ? inputImagen.files[0] : null;

                // Función interna para guardar (se ejecutará con o sin imagen)
                const guardarDatos = (rutaImagen) => {
                    let listaProductos = JSON.parse(localStorage.getItem("productosTienda")) || [];
                    
                    let datosProducto = {
                        id: Date.now(),
                        codigo: valorCodigo,
                        nombre: document.getElementById("nombre").value,
                        precio: Number(valorPrecio),
                        categoria: document.getElementById("categoria").value,
                        imagen: rutaImagen
                    };

                    let esEdicion = document.getElementById("codigo").hasAttribute("readonly");

                    if (esEdicion) {
                        let index = listaProductos.findIndex(p => p.codigo === valorCodigo);
                        if (index !== -1) {
                            // Si editamos y NO subimos foto nueva, mantenemos la foto original
                            if (!archivo && listaProductos[index].imagen) {
                                datosProducto.imagen = listaProductos[index].imagen;
                            }
                            listaProductos[index] = datosProducto;
                        }
                        alert("¡Producto modificado y actualizado en la tienda!");
                    } else {
                        listaProductos.push(datosProducto);
                        alert("¡Producto nuevo guardado y enviado a la tienda!");
                        formNuevoProducto.reset(); 
                    }

                    localStorage.setItem("productosTienda", JSON.stringify(listaProductos));
                };

                // Magia Frontend: Si hay archivo, lo convertimos a texto (Base64) para el localStorage
                if (archivo) {
                    let lector = new FileReader();
                    lector.onload = function(eventoLectura) {
                        let imagenBase64 = eventoLectura.target.result;
                        guardarDatos(imagenBase64); // Guardamos con la imagen transformada
                    };
                    lector.readAsDataURL(archivo);
                } else {
                    // Si no subió foto, usamos la hamburguesa por defecto
                    guardarDatos("../img/hamburguesa-index.webp");
                }
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
            sidebar.classList.toggle("mostrar");
        });
    }

});