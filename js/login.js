document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

           
            const emailIngresado = document.getElementById("email-login").value.trim().toLowerCase();
            const passwordIngresada = document.getElementById("pass-login").value;

  
            const usuariosPredefinidos = [
                { nombre: "Usuario Gmail", email: "estudiante@gmail.com", password: "1234", esAdmin: false },
                { nombre: "Alumno Duoc", email: "alumno@duoc.cl", password: "1234", esAdmin: false },
                { nombre: "Profesor Duoc (Admin)", email: "profe@profesor.duoc.cl", password: "1234", esAdmin: true }
            ];


            const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

   
            if (emailIngresado === "") {
                alert("Por favor ingrese su correo electrónico.");
                return;
            }

            if (passwordIngresada === "") {
                alert("Por favor ingrese su contraseña.");
                return;
            }

 
            let usuarioEncontrado = usuariosPredefinidos.find(u => u.email === emailIngresado && u.password === passwordIngresada);

            //Si no está en las de prueba, buscar en el usuario registrado previamente
            if (!usuarioEncontrado && usuarioRegistrado) {
                if (usuarioRegistrado.email === emailIngresado && usuarioRegistrado.password === passwordIngresada) {
                    usuarioEncontrado = usuarioRegistrado;
                }
            }

  
            if (usuarioEncontrado) {
                
                localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
                if (usuarioEncontrado.esAdmin) {
                    alert(`¡Bienvenido Panel de Administración, ${usuarioEncontrado.nombre}!`);
                    window.location.href = "admin/index.html"; 
                } else {
                    alert(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre}!`);
                    window.location.href = "Index.html"; 
                }
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }
});