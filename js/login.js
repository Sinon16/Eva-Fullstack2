document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("form-login");

    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            // 1. Obtener los valores ingresados
            const emailIngresado = document.getElementById("email-login").value.trim().toLowerCase();
            const passwordIngresada = document.getElementById("pass-login").value;

            // 2. Cuentas de prueba predefinidas
            const usuariosPredefinidos = [
                { nombre: "Usuario Gmail", email: "estudiante@gmail.com", password: "1234", esAdmin: false },
                { nombre: "Alumno Duoc", email: "alumno@duoc.cl", password: "1234", esAdmin: false },
                { nombre: "Profesor Duoc (Admin)", email: "profe@profesor.duoc.cl", password: "1234", esAdmin: true }
            ];

            // 3. Buscar si hay un usuario guardado dinámicamente en el registro
            const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

            // 4. Validar campos vacíos
            if (emailIngresado === "") {
                alert("Por favor ingrese su correo electrónico.");
                return;
            }

            if (passwordIngresada === "") {
                alert("Por favor ingrese su contraseña.");
                return;
            }

            // 5. Buscar coincidencias en las cuentas de prueba
            let usuarioEncontrado = usuariosPredefinidos.find(u => u.email === emailIngresado && u.password === passwordIngresada);

            // 6. Si no está en las de prueba, buscar en el usuario registrado previamente
            if (!usuarioEncontrado && usuarioRegistrado) {
                if (usuarioRegistrado.email === emailIngresado && usuarioRegistrado.password === passwordIngresada) {
                    usuarioEncontrado = usuarioRegistrado;
                }
            }

           // Evaluar resultado del inicio de sesión
            if (usuarioEncontrado) {
                //usuario activo
                localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
                if (usuarioEncontrado.esAdmin) {
                    alert(`¡Bienvenido Panel de Administración, ${usuarioEncontrado.nombre}!`);
                    window.location.href = "admin/index.html"; // Redirige a la carpeta admin
                } else {
                    alert(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre}!`);
                    window.location.href = "Index.html"; // Redirige al cliente normal
                }
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }
});