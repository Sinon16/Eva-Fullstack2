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

            let inputRun = document.getElementById("run");
            let errorRun = document.getElementById("error-run");
            let valorRun = inputRun ? inputRun.value.trim() : "";

            if (valorRun === "") {
                if(errorRun) { errorRun.textContent = "El campo RUN no puede estar vacío."; errorRun.style.display = "block"; }
                formularioValido = false;
            } else if (valorRun.includes(".") || valorRun.includes("-")) {
                if(errorRun) { errorRun.textContent = "El RUN debe ingresarse sin puntos ni guion."; errorRun.style.display = "block"; }
                formularioValido = false;
            } else {
                if(errorRun) errorRun.style.display = "none";
            }

            let inputCorreo = document.getElementById("correo");
            let errorCorreo = document.getElementById("error-correo");
            let valorCorreo = inputCorreo ? inputCorreo.value.trim().toLowerCase() : "";

            if (valorCorreo === "") {
                if(errorCorreo) { errorCorreo.textContent = "El correo es obligatorio."; errorCorreo.style.display = "block"; }
                formularioValido = false;
            } else if (!valorCorreo.endsWith("@gmail.com") && !valorCorreo.endsWith("@duoc.cl") && !valorCorreo.endsWith("@profesor.duoc.cl")) {
                if(errorCorreo) { errorCorreo.textContent = "Use un correo válido."; errorCorreo.style.display = "block"; }
                formularioValido = false;
            } else {
                if(errorCorreo) errorCorreo.style.display = "none";
            }

            if (formularioValido === true) {
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

            let inputCodigo = document.getElementById("codigo");
            let errorCodigo = document.getElementById("error-codigo");
            let valorCodigo = inputCodigo ? inputCodigo.value.trim() : "";

            if (valorCodigo === "") {
                if(errorCodigo) { errorCodigo.textContent = "El código no puede estar vacío."; errorCodigo.style.display = "block"; }
                formularioValido = false;
            } else if (valorCodigo.length < 3) {
                if(errorCodigo) { errorCodigo.textContent = "Mínimo 3 caracteres."; errorCodigo.style.display = "block"; }
                formularioValido = false;
            } else {
                if(errorCodigo) errorCodigo.style.display = "none";
            }

            let inputPrecio = document.getElementById("precio");
            let errorPrecio = document.getElementById("error-precio");
            let valorPrecio = inputPrecio ? inputPrecio.value : "";

            if (valorPrecio === "") {
                if(errorPrecio) { errorPrecio.textContent = "El precio es obligatorio."; errorPrecio.style.display = "block"; }
                formularioValido = false;
            } else if (Number(valorPrecio) < 0) {
                if(errorPrecio) { errorPrecio.textContent = "El precio no puede ser negativo."; errorPrecio.style.display = "block"; }
                formularioValido = false;
            } else {
                if(errorPrecio) errorPrecio.style.display = "none";
            }

            let inputStock = document.getElementById("stock");
            let errorStock = document.getElementById("error-stock");
            let valorStock = inputStock ? inputStock.value : "";

            if (valorStock === "") {
                if(errorStock) { errorStock.textContent = "El stock es obligatorio."; errorStock.style.display = "block"; }
                formularioValido = false;
            } else if (Number(valorStock) < 0) {
                if(errorStock) { errorStock.textContent = "El stock no puede ser negativo."; errorStock.style.display = "block"; }
                formularioValido = false;
            } else {
                if(errorStock) errorStock.style.display = "none";
            }

            if (formularioValido === true) {
                let inputImagen = document.getElementById("imagen");
                let archivo = inputImagen ? inputImagen.files[0] : null;

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
                            if (!archivo && listaProductos[index].imagen) {
                                datosProducto.imagen = listaProductos[index].imagen;
                            }
                            listaProductos[index] = datosProducto;
                        }
                    } else {
                        listaProductos.push(datosProducto);
                    }

                    // ESCUDO CONTRA IMÁGENES PESADAS (Memoria Llena)
                    try {
                        localStorage.setItem("productosTienda", JSON.stringify(listaProductos));
                        if (esEdicion) {
                            alert("¡Producto modificado y actualizado en la tienda!");
                        } else {
                            alert("¡Producto nuevo guardado y enviado a la tienda!");
                            formNuevoProducto.reset(); 
                        }
                    } catch (error) {
                        alert("⚠️ ERROR: La imagen es muy pesada y la memoria (localStorage) se llenó. Intenta usar un archivo .jpg o .png más pequeño (menos de 1MB).");
                    }
                };

                if (archivo) {
                    let lector = new FileReader();
                    lector.onload = function(eventoLectura) {
                        let imagenBase64 = eventoLectura.target.result;
                        guardarDatos(imagenBase64); 
                    };
                    lector.readAsDataURL(archivo);
                } else {
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