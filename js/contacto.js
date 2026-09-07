document.addEventListener("DOMContentLoaded", function () {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuarioActivo) {
        const inputNombre = document.getElementById("nombre-contacto");
        const inputEmail = document.getElementById("email-contacto");

        if (usuarioActivo.nombre) {
            inputNombre.value = usuarioActivo.nombre;
        }
        if (usuarioActivo.email) {
            inputEmail.value = usuarioActivo.email;
        }
    }
});


document.getElementById("form-contacto").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre-contacto").value.trim();
    const email = document.getElementById("email-contacto").value.trim().toLowerCase();
    const comentario = document.getElementById("comentario-contacto").value.trim();


    if (nombre === "") {
        alert("El nombre completo es obligatorio.");
        return;
    }

    if (nombre.length > 100) {
        alert("El nombre no puede tener más de 100 caracteres.");
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


    if (comentario === "") {
        alert("El comentario es obligatorio.");
        return;
    }

    if (comentario.length > 500) {
        alert("El comentario no puede superar los 500 caracteres.");
        return;
    }


    alert("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
    document.getElementById("form-contacto").reset();


    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) {
        document.getElementById("nombre-contacto").value = usuarioActivo.nombre || "";
        document.getElementById("email-contacto").value = usuarioActivo.email || "";
    }
});