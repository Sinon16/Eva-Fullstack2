document.addEventListener("DOMContentLoaded", function() {
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
            
            let nuevoUsuario = {
                nombre: document.getElementById("nombreUsuario").value + " " + document.getElementById("apellidos").value,
                email: document.getElementById("correo").value,
                password: "1234",
                esAdmin: false
            };
            
            let rolElegido = document.getElementById("rol").value;
            if (rolElegido === "Administrador") {
                nuevoUsuario.esAdmin = true;
            }
            
            let textoUsuario = JSON.stringify(nuevoUsuario);
            localStorage.setItem("usuarioRegistrado", textoUsuario);
            
            alert("¡Usuario guardado!");
            formUsuario.reset();
        });
    }

    let formNuevoProducto = document.getElementById("form-nuevo-producto");
    let formEditarProducto = document.getElementById("form-editar-producto");
    let formProducto = null;

    if (formNuevoProducto != null) {
        formProducto = formNuevoProducto;
    } else if (formEditarProducto != null) {
        formProducto = formEditarProducto;
    }

    if (formProducto != null) {
        formProducto.addEventListener("submit", function(evento) {
            evento.preventDefault();

            function guardarDatos(imagenBase64) {
                let memoria = localStorage.getItem("productosTienda");
                let listaProductos = [];
                
                if (memoria != null) {
                    listaProductos = JSON.parse(memoria);
                }
                
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
                            if (imagenBase64 === "mantener") {
                                nuevoProducto.imagen = listaProductos[i].imagen;
                            }
                            listaProductos[i] = nuevoProducto;
                        }
                    }
                    alert("¡Producto modificado!");
                } else {
                    listaProductos.push(nuevoProducto);
                    alert("¡Producto creado!");
                }

                try {
                    let textoParaGuardar = JSON.stringify(listaProductos);
                    localStorage.setItem("productosTienda", textoParaGuardar);
                } catch (error) {
                    alert("Error: Imagen muy pesada.");
                }
            }

            let inputImagen = document.getElementById("imagen");
            let archivoFoto = null;
            
            if (inputImagen != null) {
                archivoFoto = inputImagen.files[0];
            }

            if (archivoFoto != null) {
                let lector = new FileReader();
                lector.onload = function(eventoLectura) {
                    let textoDeLaImagen = eventoLectura.target.result;
                    guardarDatos(textoDeLaImagen);
                };
                lector.readAsDataURL(archivoFoto);
            } else {
                let inputCodigo = document.getElementById("codigo");
                if (inputCodigo.hasAttribute("readonly") === true) {
                    guardarDatos("mantener");
                } else {
                    guardarDatos("../img/hamburguesa-index.webp");
                }
            }
        });
    }

    let btnMenu = document.getElementById("btn-menu");
    let sidebar = document.querySelector(".admin-sidebar");
    
    if (btnMenu != null && sidebar != null) {
        btnMenu.addEventListener("click", function() {
            if (sidebar.classList.contains("mostrar")) {
                sidebar.classList.remove("mostrar");
            } else {
                sidebar.classList.add("mostrar");
            }
        });
    }
});