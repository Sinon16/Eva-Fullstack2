document.addEventListener("DOMContentLoaded", function() {
    
    // 1. GUARDAR / EDITAR USUARIO
    let formNuevoUsuario = document.getElementById("form-nuevo-usuario");
    let formEditarUsuario = document.getElementById("form-editar-usuario");
    let formUsuario = null;

    if (formNuevoUsuario != null) {
        formUsuario = formNuevoUsuario;
    } else if (formEditarUsuario != null) {
        formUsuario = formEditarUsuario;
    }

    if (formUsuario != null) {
        formUsuario.addEventListener("submit", function(evento) {
            evento.preventDefault();
            
            let nombreInput = document.getElementById("nombreUsuario").value;
            let apellidosInput = document.getElementById("apellidos");
            let nombreFinal = nombreInput;
            
            if (apellidosInput != null) {
                nombreFinal = nombreInput + " " + apellidosInput.value;
            }

            let nuevoUsuario = {
                nombre: nombreFinal,
                email: document.getElementById("correo").value,
                password: "1234",
                esAdmin: false
            };
            
            let rolElegido = document.getElementById("rol").value;
            if (rolElegido === "Administrador") {
                nuevoUsuario.esAdmin = true;
            }

            let regionElegida = document.getElementById("region");
            if (regionElegida != null) { nuevoUsuario.region = regionElegida.value; }

            let comunaElegida = document.getElementById("comuna");
            if (comunaElegida != null) { nuevoUsuario.comuna = comunaElegida.value; }
            
            let textoUsuario = JSON.stringify(nuevoUsuario);
            localStorage.setItem("usuarioRegistrado", textoUsuario);
            
            if (formEditarUsuario != null) {
                alert("¡Usuario editado y actualizado correctamente!");
                window.location.href = "mostrar_usuarios.html"; 
            } else {
                alert("¡Usuario nuevo creado exitosamente!");
                formUsuario.reset();
            }
        });
    }

    // 2. GUARDAR PRODUCTO
    let formNuevoProducto = document.getElementById("form-nuevo-producto");
    let formEditarProducto = document.getElementById("form-editar-producto");
    let formProducto = null;

    if (formNuevoProducto != null) { formProducto = formNuevoProducto; } 
    else if (formEditarProducto != null) { formProducto = formEditarProducto; }

    if (formProducto != null) {
        formProducto.addEventListener("submit", function(evento) {
            evento.preventDefault();

            function guardarDatos(imagenBase64) {
                let memoria = localStorage.getItem("productosTienda");
                let listaProductos = [];
                
                if (memoria != null) { listaProductos = JSON.parse(memoria); }
                
                let inputCodigo = document.getElementById("codigo");
                let esEdicion = inputCodigo.hasAttribute("readonly");
                
                let nuevoProducto = {
                    id: Date.now(),
                    codigo: inputCodigo.value,
                    nombre: document.getElementById("nombre").value,
                    precio: Number(document.getElementById("precio").value),
                    categoria: document.getElementById("categoria").value,
                    imagen: imagenBase64
                };

                if (esEdicion === true) {
                    for (let i = 0; i < listaProductos.length; i++) {
                        if (listaProductos[i].codigo === nuevoProducto.codigo) {
                            if (imagenBase64 === "mantener") { nuevoProducto.imagen = listaProductos[i].imagen; }
                            listaProductos[i] = nuevoProducto;
                        }
                    }
                    alert("¡Producto modificado!");
                } else {
                    listaProductos.push(nuevoProducto);
                    alert("¡Producto creado!");
                }

                try {
                    localStorage.setItem("productosTienda", JSON.stringify(listaProductos));
                    if (esEdicion === true) { window.location.href = "mostrar_productos.html"; }
                } catch (error) {
                    alert("Error: Imagen muy pesada.");
                }
            }

            let inputImagen = document.getElementById("imagen");
            let archivoFoto = null;
            if (inputImagen != null) { archivoFoto = inputImagen.files[0]; }

            if (archivoFoto != null) {
                let lector = new FileReader();
                lector.onload = function(eventoLectura) { guardarDatos(eventoLectura.target.result); };
                lector.readAsDataURL(archivoFoto);
            } else {
                let inputCodigo = document.getElementById("codigo");
                if (inputCodigo.hasAttribute("readonly") === true) { guardarDatos("mantener"); } 
                else { guardarDatos("../img/hamburguesa-index.webp"); }
            }
        });
    }

    // 3. MENÚ HAMBURGUESA
    let btnMenu = document.getElementById("btn-menu");
    let sidebar = document.querySelector(".admin-sidebar");
    
    if (btnMenu != null && sidebar != null) {
        btnMenu.addEventListener("click", function() {
            if (sidebar.classList.contains("mostrar")) { sidebar.classList.remove("mostrar"); } 
            else { sidebar.classList.add("mostrar"); }
        });
    }

    // 4. CERRAR SESIÓN UNIVERSAL
    let btnSalir = document.getElementById("btn-salir");
    if (btnSalir != null) {
        btnSalir.addEventListener("click", function(evento) {
            evento.preventDefault();
            if (confirm("¿Estás seguro que deseas cerrar sesión?") === true) {
                localStorage.removeItem("usuarioActivo");
                window.location.href = "../login.html";
            }
        });
    }
});