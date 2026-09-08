document.addEventListener("DOMContentLoaded", function () {
    let porcentajeDescuento = 0;

    let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];


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


        let totalConDescuento = total * (1 - porcentajeDescuento);
        document.getElementById("cart-total").textContent = `$${Math.round(totalConDescuento).toLocaleString("es-CL")}`;

 
        const btnCarrito = document.getElementById("cart-counter");
        if (btnCarrito) btnCarrito.textContent = `🛒 Mi Pedido (${cantidadTotal})`;


        localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    }

 
    window.sumar = function (i) {
        carrito[i].cantidad++;
        actualizarVista();
    };

    window.restar = function (i) {
        carrito[i].cantidad--;
        if (carrito[i].cantidad <= 0) {
            carrito.splice(i, 1); 
        }
        actualizarVista();
    };


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

  
    document.getElementById("btn-checkout").addEventListener("click", function () {
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        alert("¡Gracias por tu compra!");
        carrito = [];
        actualizarVista();
    });

  
    actualizarVista();
});