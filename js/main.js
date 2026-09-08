document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    // Escuchar el evento de envío (submit)
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            // Detener el envío automático del formulario
            event.preventDefault();

            // Limpiar errores previos
            limpiarErrores();

            // Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            let esValido = true;

            // 1. Validar Nombre (Mínimo 3 caracteres)
            if (nombre === '' || nombre.length < 3) {
                mostrarError('errorNombre', 'Por favor, ingresa tu nombre (mínimo 3 caracteres).');
                esValido = false;
            }

            // 2. Validar Correo Electrónico mediante Expresión Regular (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarError('errorEmail', 'Ingresa un correo electrónico válido (ejemplo@dominio.com).');
                esValido = false;
            }

            // 3. Validar Selección de Asunto
            if (asunto === '') {
                mostrarError('errorAsunto', 'Debes seleccionar un asunto.');
                esValido = false;
            }

            // 4. Validar Mensaje (Mínimo 10 caracteres)
            if (mensaje.length < 10) {
                mostrarError('errorMensaje', 'El mensaje debe contener al menos 10 caracteres.');
                esValido = false;
            }

            // Si todo está correcto, simular envío exitoso
            if (esValido) {
                alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado con éxito.');
                contactForm.reset(); // Limpiar el formulario
            }
        });
    }
});

// Función auxiliar para mostrar mensajes de error en pantalla
function mostrarError(elementId, mensaje) {
    const errorSpan = document.getElementById(elementId);
    if (errorSpan) {
        errorSpan.textContent = mensaje;
        errorSpan.style.color = '#d9534f';
        errorSpan.style.fontSize = '0.85rem';
        errorSpan.style.marginTop = '4px';
        errorSpan.style.display = 'block';
    }
}

// Función auxiliar para limpiar mensajes de error
function limpiarErrores() {
    const errores = document.querySelectorAll('.error-message');
    errores.forEach(span => {
        span.textContent = '';
    });
}


// Validación del Formulario de Registro
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        limpiarErrores();

        const nombre = document.getElementById('regNombre').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const pass = document.getElementById('regPassword').value;
        const confirmPass = document.getElementById('regConfirm').value;

        let esValido = true;

        if (nombre.length < 3) {
            mostrarError('errorRegNombre', 'Ingresa tu nombre completo.');
            esValido = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarError('errorRegEmail', 'Correo no válido.');
            esValido = false;
        }

        if (pass.length < 6) {
            mostrarError('errorRegPassword', 'La contraseña debe tener al menos 6 caracteres.');
            esValido = false;
        }

        if (pass !== confirmPass) {
            mostrarError('errorRegConfirm', 'Las contraseñas no coinciden.');
            esValido = false;
        }

        if (esValido) {
            alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
            registerForm.reset();
        }
    });
}