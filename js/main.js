document.addEventListener("DOMContentLoaded", function () {
    const userSubbar = document.getElementById("user-subbar");
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo && userSubbar) {
  
        userSubbar.innerHTML = `
            <div class="user-links">
                <span>Hola, <strong>${usuarioActivo.nombre}</strong></span>
                <span class="separator">|</span>
                <a href="#" id="btn-logout" style="color: #d9534f; font-weight: bold;">Cerrar sesión</a>
            </div>
        `;


        document.getElementById("btn-logout").addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo"); 
            alert("Has cerrado sesión correctamente.");
            window.location.reload(); 
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];
    let contadorUnidades = 0;

    for (let i = 0; i < carrito.length; i++) {
        contadorUnidades += carrito[i].cantidad;
    }

    const botonCarrito = document.querySelector(".cart-btn");
    if (botonCarrito) {
        botonCarrito.textContent = `🛒 Mi Pedido (${contadorUnidades})`;
    }
});