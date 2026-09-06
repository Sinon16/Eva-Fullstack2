const productos = [
    { id: 1, nombre: "Hamburguesa Artesanal", categoria: "pizzas-hamburguesas", descripcion: "Carne de res de 200g, queso cheddar fundido y tocino.", precio: 11990, imagen: "img/hamburguesa-index.webp" },
    { id: 2, nombre: "Pizza Pepperoni Especial", categoria: "pizzas-hamburguesas", descripcion: "Masa madre, queso mozzarella y abundante pepperoni.", precio: 14990, imagen: "img/pizza-pepperoni.jpg" },
    { id: 3, nombre: "Ensalada César con Pollo", categoria: "saludable", descripcion: "Lechuga fresca, pollo a la parrilla y aderezo césar.", precio: 8990, imagen: "img/ceasar-index.jpg" },
    { id: 4, nombre: "Brownie con Helado", categoria: "postres", descripcion: "Brownie de chocolate servido con helado de vainilla.", precio: 5990, imagen: "img/brownie-helado.jpg" },
    { id: 5, nombre: "Batido Tropical", categoria: "bebidas", descripcion: "Mezcla natural de mango, maracuyá y fresas.", precio: 4290, imagen: "img/batido-tropical.jpg" },
    { id: 6, nombre: "Tacos al Pastor", categoria: "ofertas", descripcion: "Tortillas de maíz con carne adobada y piña.", precio: 9490, imagen: "img/Tacos-Al-Pastor.jpg" },
    { id: 7, nombre: "Lasaña Bolognesa", categoria: "pizzas-hamburguesas", descripcion: "Capas de pasta con boloñesa y queso gratinado.", precio: 12990, imagen: "img/lasaña-boloñesa.jpg" },
    { id: 8, nombre: "Sushi Roll California", categoria: "saludable", descripcion: "Rollos de cangrejo o salmon, palta, pepino y ajonjolí.", precio: 13490, imagen: "img/sushi-index.jpg" },
    { id: 9, nombre: "Club Sándwich Doble", categoria: "ofertas", descripcion: "Pan tostado con pavo, queso y papas fritas.", precio: 7990, imagen: "img/club-sandwich-doble.png" },
    { id: 10, nombre: "Alitas BBQ (8 Piezas)", categoria: "ofertas", descripcion: "Alitas crujientes bañadas en salsa BBQ.", precio: 10490, imagen: "img/alitas-bbq.webp" },
    { id: 11, nombre: "Cheesecake de Frutos Rojos", categoria: "postres", descripcion: "Pastel de queso cremoso con mermelada.", precio: 5290, imagen: "img/Cheesecake de Frutos Rojos.jpg" },
    { id: 12, nombre: "Café Cappuccino Frappé", categoria: "bebidas", descripcion: "Café licuado con hielo, leche y crema.", precio: 3890, imagen: "img/Café Cappuccino Frappé.jpg" }
];

function mostrarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = ""; 

    lista.forEach(p => {
        // Formato para Peso Chileno ($11.990)
        const precioFormateado = p.precio.toLocaleString('es-CL', { 
            style: 'currency', 
            currency: 'CLP' 
        });

        contenedor.innerHTML += `
            <article class="hero-banner">
                <!-- Carga la imagen mediante p.imagen -->
                <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
                <h3>${p.nombre}</h3>
                <p class="precio">${precioFormateado}</p>
                <button class="btn-primary">Agregar al Pedido</button>
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


window.onload = () => mostrarProductos(productos);