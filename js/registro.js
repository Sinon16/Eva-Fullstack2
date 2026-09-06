// Base de datos de Regiones y Comunas de Chile
const regionesYComunas = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Región Metropolitana de Santiago": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Santiago", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchigüe", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ranquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
    "Bío Bío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Graneros", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

document.addEventListener("DOMContentLoaded", function () {
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    // 1. Cargar Regiones
    for (let region in regionesYComunas) {
        let opcion = document.createElement("option");
        opcion.value = region;
        opcion.textContent = region;
        selectRegion.appendChild(opcion);
    }

    // 2. Cambiar Comunas
    selectRegion.addEventListener("change", function () {
        const regionSeleccionada = this.value;

        selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

        if (regionSeleccionada !== "") {
            selectComuna.disabled = false;
            const comunas = regionesYComunas[regionSeleccionada];

            comunas.forEach(function (comuna) {
                let opcion = document.createElement("option");
                opcion.value = comuna;
                opcion.textContent = comuna;
                selectComuna.appendChild(opcion);
            });
        } else {
            selectComuna.disabled = true;
        }
    });
});

// 3. Validaciones y Redirección al enviar
document.getElementById("form-registro").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const confirmarEmail = document.getElementById("confirmar-email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmarPassword = document.getElementById("confirmar-password").value;
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;

    if (nombre === "") {
        alert("El nombre completo es obligatorio.");
        return;
    }

    if (email === "") {
        alert("El correo electrónico es obligatorio.");
        return;
    }

    if (email.length > 100) {
        alert("El correo no puede tener más de 100 caracteres.");
        return;
    }

    const esGmail = email.endsWith("@gmail.com");
    const esDuoc = email.endsWith("@duoc.cl");
    const esProfesorDuoc = email.endsWith("@profesor.duoc.cl");

    if (!esGmail && !esDuoc && !esProfesorDuoc) {
        alert("Solo se permiten correos @gmail.com, @duoc.cl o @profesor.duoc.cl");
        return;
    }

    if (email !== confirmarEmail) {
        alert("Los correos electrónicos no coinciden.");
        return;
    }

    if (password === "") {
        alert("La contraseña es obligatoria.");
        return;
    }

    if (password.length < 4 || password.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
    }

    if (password !== confirmarPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (region === "") {
        alert("Por favor seleccione una región.");
        return;
    }

    if (comuna === "") {
        alert("Por favor seleccione una comuna.");
        return;
    }

    const nuevoUsuario = {
        nombre: nombre,
        email: email,
        password: password,
        region: region,
        comuna: comuna
    };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

    // Alerta interactiva y redirección tras presionar Aceptar
    alert("¡Registro exitoso! Bienvenido a Sabor & Aroma.");
    window.location.href = "login.html";
});