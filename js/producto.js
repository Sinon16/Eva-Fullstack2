// 1. Verificamos si es la primera vez que se carga la tienda en este navegador
let inicializado = localStorage.getItem("tiendaInicializada");
let productos = JSON.parse(localStorage.getItem("productosTienda")) || [];

// 2. Si no está inicializado, cargamos los 12 productos base obligatoriamente
if (!inicializado || productos.length === 0) {
    productos = [
        { id: 1, codigo: "P001", nombre: "Hamburguesa Artesanal", categoria: "pizzas-hamburguesas", descripcion: "Carne de res de 200g, queso cheddar fundido y tocino.", precio: 11990, imagen: "img/hamburguesa-index.webp" },
        { id: 2, codigo: "P002", nombre: "Pizza Pepperoni Especial", categoria: "pizzas-hamburguesas", descripcion: "Masa madre, queso mozzarella y abundante pepperoni.", precio: 14990, imagen: "img/pizza-pepperoni.jpg" },
        { id: 3, codigo: "P003", nombre: "Ensalada César con Pollo", categoria: "saludable", descripcion: "Lechuga fresca, pollo a la parrilla y aderezo césar.", precio: 8990, imagen: "img/ceasar-index.jpg" },
        { id: 4, codigo: "P004", nombre: "Brownie con Helado", categoria: "postres", descripcion: "Brownie de chocolate servido con helado de vainilla.", precio: 5990, imagen: "img/brownie-helado.jpg" },
        { id: 5, codigo: "P005", nombre: "Batido Tropical", categoria: "bebidas", descripcion: "Mezcla natural de mango, maracuyá y fresas.", precio: 4290, imagen: "img/batido-tropical.jpg" },
        { id: 6, codigo: "P006", nombre: "Tacos al Pastor", categoria: "ofertas", descripcion: "Tortillas de maíz con carne adobada y piña.", precio: 9490, imagen: "img/Tacos-Al-Pastor.jpg" },
        { id: 7, codigo: "P007", nombre: "Lasaña Bolognesa", categoria: "pizzas-hamburguesas", descripcion: "Capas de pasta con boloñesa y queso gratinado.", precio: 12990, imagen: "img/lasaña-boloñesa.jpg" },
        { id: 8, codigo: "P008", nombre: "Sushi Roll California", categoria: "saludable", descripcion: "Rollos de cangrejo o salmon, palta, pepino y ajonjolí.", precio: 13490, imagen: "img/sushi-index.jpg" },
        { id: 9, codigo: "P009", nombre: "Club Sándwich Doble", categoria: "ofertas", descripcion: "Pan tostado con pavo, queso y papas fritas.", precio: 7990, imagen: "img/club-sandwich-doble.png" },
        { id: 10, codigo: "P010", nombre: "Alitas BBQ (8 Piezas)", categoria: "ofertas", descripcion: "Alitas crujientes bañadas en salsa BBQ.", precio: 10490, imagen: "img/alitas-bbq.webp" },
        { id: 11, codigo: "P011", nombre: "Cheesecake de Frutos Rojos", categoria: "postres", descripcion: "Pastel de queso cremoso con mermelada.", precio: 5290, imagen: "img/Cheesecake de Frutos Rojos.jpg" },
        { id: 12, codigo: "P012", nombre: "Café Cappuccino Frappé", categoria: "bebidas", descripcion: "Café licuado con hielo, leche y crema.", precio: 3890, imagen: "img/Café Cappuccino Frappé.jpg" }
    ];
    localStorage.setItem("productosTienda", JSON.stringify(productos));
    localStorage.setItem("tiendaInicializada", "true"); 
}


function mostrarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;
    
    contenedor.innerHTML = ""; 

    lista.forEach(p => {
        const precioFormateado = p.precio.toLocaleString('es-CL', { 
            style: 'currency', 
            currency: 'CLP' 
        });

        contenedor.innerHTML += `
            <article class="hero-banner">
                <a href="detalleproducto.html?id=${p.id}">
                    <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'" style="cursor: pointer;">
                </a>
                <h3>${p.nombre}</h3>
                <p class="precio">${precioFormateado}</p>
                <button class="btn-primary" onclick="agregarAlCarrito(${p.id})">Agregar al Pedido</button>
            </article>
        `;
    });
}


function filtrar(cat) {
    if (cat === "todas") {
        mostrarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === cat);
        mostrarProductos(filtrados);
    }
}


function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];
    let productoEncontrado = carrito.find(item => item.id === idProducto);

    if (productoEncontrado) {
        productoEncontrado.cantidad++;
    } else {
        let prodOriginal = productos.find(p => p.id === idProducto);
        if (prodOriginal) {
            carrito.push({
                id: prodOriginal.id,
                nombre: prodOriginal.nombre,
                descripcion: prodOriginal.descripcion,
                precio: prodOriginal.precio,
                imagen: prodOriginal.imagen,
                cantidad: 1
            });
        }
    }

    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    actualizarContadorCabecera();
    alert("¡Producto agregado al pedido!");
}


function actualizarContadorCabecera() {
    let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];
    let totalUnidades = 0;

    carrito.forEach(prod => {
        totalUnidades += prod.cantidad;
    });

    const btnCarrito = document.querySelector(".cart-btn");
    if (btnCarrito) {
        btnCarrito.textContent = `🛒 Mi Pedido (${totalUnidades})`;
    }
}


function cargarProductosAleatorios(idActual) {
    const contenedorRelacionados = document.getElementById("contenedor-relacionados");
    if (!contenedorRelacionados) return;


    let disponibles = productos.filter(p => p.id !== idActual);


    disponibles.sort(() => 0.5 - Math.random());


    let seleccionados = disponibles.slice(0, 3);

    contenedorRelacionados.innerHTML = "";

    seleccionados.forEach(p => {
        const precioFormateado = p.precio.toLocaleString('es-CL', { 
            style: 'currency', 
            currency: 'CLP' 
        });

        contenedorRelacionados.innerHTML += `
            <article class="hero-banner">
                <a href="detalleproducto.html?id=${p.id}">
                    <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'" style="cursor: pointer;">
                </a>
                <h3>${p.nombre}</h3>
                <p class="precio">${precioFormateado}</p>
                <button class="btn-primary" onclick="agregarAlCarrito(${p.id})">Agregar al Pedido</button>
            </article>
        `;
    });
}


document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorCabecera();

    const contenedorDetalle = document.getElementById("contenedor-detalle");

    if (contenedorDetalle) {
        const params = new URLSearchParams(window.location.search);
        const idURL = parseInt(params.get("id"));
        const prod = productos.find(p => p.id === idURL);

        if (prod) {
            const precioFormateado = prod.precio.toLocaleString('es-CL', { 
                style: 'currency', 
                currency: 'CLP' 
            });

            contenedorDetalle.innerHTML = `
                <div class="detalle-container">
                    <div class="detalle-imagen">
                        <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/400x300?text=Sin+Imagen'">
                    </div>
                    <div class="detalle-info">
                        <h2>${prod.nombre}</h2>
                        <span class="precio">${precioFormateado}</span>
                        <p>${prod.descripcion}</p>
                        <div>
                            <button class="btn-primary" onclick="agregarAlCarrito(${prod.id})">Agregar al Pedido</button>
                        </div>
                    </div>
                </div>
            `;


            cargarProductosAleatorios(prod.id);
        } else {
            contenedorDetalle.innerHTML = "<p>El producto no existe o fue removido.</p>";
        }
        return;
    }


    const contenedorProductos = document.getElementById("contenedor-productos");
    if (contenedorProductos) {
        const params = new URLSearchParams(window.location.search);
        const categoriaURL = params.get("cat");

        if (categoriaURL) {
            filtrar(categoriaURL);
        } else {
            mostrarProductos(productos);
        }
    }
});