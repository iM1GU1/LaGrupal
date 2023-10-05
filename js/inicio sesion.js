<!-- JavaScript -->
<script>
    function toggleMenu() {
        var menu = document.getElementById('menu');
        menu.classList.toggle('show');
    }
</script>

<!-- Más código JavaScript -->
<script>
    // Función para registrar un usuario
    function registerUser() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Registro exitoso
                const user = userCredential.user;
                console.log("Usuario registrado:", user);

                // Puedes agregar aquí el código para guardar información adicional del usuario en tu base de datos, si es necesario.
                // Por ejemplo, puedes usar Firestore para almacenar datos de perfil del usuario.

                // Mostrar mensaje de éxito o redirigir al usuario a otra página.
                document.getElementById("user-welcome").textContent = `¡Bienvenido, ${username}!`;
                document.getElementById("user-welcome").style.display = "block";
                document.getElementById("user-logout").style.display = "block";
            })
            .catch((error) => {
                // Hubo un error en el registro
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error al registrar:", errorMessage);

                // Mostrar mensaje de error al usuario
                document.getElementById("error-message").textContent = errorMessage;
                document.getElementById("error-message").style.display = "block";
            });

        return false; // Para evitar que el formulario se envíe
    }

    // Función para iniciar sesión
    function loginUser() {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                const user = userCredential.user;
                console.log("Usuario inició sesión:", user);

                // Mostrar mensaje de éxito o redirigir al usuario a otra página.
                document.getElementById("user-welcome").textContent = `¡Bienvenido, ${user.displayName}!`;
                document.getElementById("user-welcome").style.display = "block";
                document.getElementById("user-logout").style.display = "block";
            })
            .catch((error) => {
                // Hubo un error en el inicio de sesión
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error al iniciar sesión:", errorMessage);

                // Mostrar mensaje de error al usuario
                document.getElementById("error-message").textContent = errorMessage;
                document.getElementById("error-message").style.display = "block";
            });

        return false; // Para evitar que el formulario se envíe
    }

    // Función para cerrar sesión
    function logoutUser() {
        firebase.auth().signOut().then(() => {
            // Sign-out exitoso
            console.log("Usuario cerró sesión");

            // Ocultar mensaje de bienvenida y botón de cierre de sesión
            document.getElementById("user-welcome").style.display = "none";
            document.getElementById("user-logout").style.display = "none";
        }).catch((error) => {
            // Hubo un error al cerrar sesión
            console.error("Error al cerrar sesión:", error);
        });
    }
</script>
