document.addEventListener("DOMContentLoaded", function () {
    let porcentajeDescuento = 0;

    // 1. Cargar productos desde el localStorage
    let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];

    // 2. Función para pintar el carrito y actualizar totales
    function actualizarVista() {
        const contenedor = document.getElementById("cart-items-container");
        contenedor.innerHTML = "";

        let total = 0;
        let cantidadTotal = 0;

        if (carrito.length === 0) {
            contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        } else {
            carrito.forEach((prod, index) => {
                total += prod.precio * prod.cantidad;
                cantidadTotal += prod.cantidad;

                contenedor.innerHTML += `
                    <div class="cart-item">
                        <img src="${prod.imagen}" alt="${prod.nombre}">
                        <div class="cart-item-info">
                            <h3>${prod.nombre}</h3>
                            <p>${prod.descripcion || ''}</p>
                        </div>
                        <div style="text-align: right;">
                            <span>$${prod.precio.toLocaleString("es-CL")}</span>
                            <div class="cart-item-controls">
                                <button onclick="restar(${index})">-</button>
                                <input type="text" class="qty-input" value="${prod.cantidad}" readonly>
                                <button onclick="sumar(${index})">+</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Aplicar descuento y mostrar total
        let totalConDescuento = total * (1 - porcentajeDescuento);
        document.getElementById("cart-total").textContent = `$${Math.round(totalConDescuento).toLocaleString("es-CL")}`;

        // Actualizar botón de la cabecera
        const btnCarrito = document.getElementById("cart-counter");
        if (btnCarrito) btnCarrito.textContent = `🛒 Mi Pedido (${cantidadTotal})`;

        // Guardar cambios
        localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    }

    // 3. Funciones para sumar y restar productos
    window.sumar = function (i) {
        carrito[i].cantidad++;
        actualizarVista();
    };

    window.restar = function (i) {
        carrito[i].cantidad--;
        if (carrito[i].cantidad <= 0) {
            carrito.splice(i, 1); // Elimina el producto si llega a 0
        }
        actualizarVista();
    };

    // 4. Aplicar cupón
    document.getElementById("btn-apply-coupon").addEventListener("click", function () {
        const cupon = document.getElementById("coupon-code").value.trim().toUpperCase();
        if (cupon === "SABOR10") {
            porcentajeDescuento = 0.10;
            alert("¡Descuento del 10% aplicado!");
            actualizarVista();
        } else {
            alert("Cupón no válido.");
        }
    });

    // 5. Botón Pagar
    document.getElementById("btn-checkout").addEventListener("click", function () {
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        alert("¡Gracias por tu compra!");
        carrito = [];
        actualizarVista();
    });

    // Cargar la vista al entrar
    actualizarVista();
});