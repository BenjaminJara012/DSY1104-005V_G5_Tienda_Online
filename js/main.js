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

            // Expresión Regular para validar solo dominios permitidos: @duoc.cl, @profesor.duoc.cl o @gmail.com
            const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
            if (!emailRegex.test(email)) {
                mostrarError('errorEmail', 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com');    
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

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        if (!emailRegex.test(email)) {
            mostrarError('errorEmail', 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com');    
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

// --- VALIDACIÓN DEL FORMULARIO DE LOGIN ---
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        // 1. Detener el envío automático del formulario
        event.preventDefault();

        // 2. Limpiar errores de intentos anteriores
        limpiarErrores();

        // 3. Obtener los valores ingresados
        const email = document.getElementById('loginEmail').value.trim();
        const pass = document.getElementById('loginPassword').value;

        let esValido = true;

        // Validar formato de Correo Electrónico (Regex para verificar el @ y el dominio)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        if (!emailRegex.test(email)) {
            mostrarError('errorEmail', 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com');    
            esValido = false;
        }

        // Validar Contraseña (mínimo 6 caracteres)
        if (pass.length < 6) {
            mostrarError('errorLoginPassword', 'La contraseña debe tener al menos 6 caracteres.');
            esValido = false;
        }

        // Si todas las reglas se cumplen correctamente
        if (esValido) {
            alert('¡Inicio de sesión exitoso! Bienvenido/a a Relatos & Páginas.');
            loginForm.reset();
            // Redirigir al inicio tras iniciar sesión
            window.location.href = 'index.html';
        }
    });
}


// --- LÓGICA DEL CARRITO DE COMPRAS ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar productos guardados en LocalStorage (si existen)
    let carrito = JSON.parse(localStorage.getItem('carritoLibreria')) || [];
    actualizarContadorCarrito();

    // 2. Escuchar clics en los botones "AGREGAR"
    const botonesAgregar = document.querySelectorAll('.btn-add-cart');

    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            // Obtener datos del libro desde la tarjeta (article)
            const tarjeta = e.target.closest('.product-card');
            const titulo = tarjeta.querySelector('h3').textContent;
            const precio = tarjeta.querySelector('.price').childNodes[0].textContent.trim();
            const imagen = tarjeta.querySelector('img').src;

            // Crear objeto del libro
            const libro = { titulo, precio, imagen };

            // Agregar al arreglo del carrito
            carrito.push(libro);

            // Guardar en el navegador (LocalStorage) para que no se borre al cambiar de página
            localStorage.setItem('carritoLibreria', JSON.stringify(carrito));

            // Actualizar contador visual
            actualizarContadorCarrito();

            // Mensaje de confirmación
            alert(`¡"${titulo}" se agregó al carrito!`);
        });
    });

    // Función para actualizar el número sobre el icono del carrito
    function actualizarContadorCarrito() {
        const contadores = document.querySelectorAll('#cart-count');
        contadores.forEach(span => {
            span.textContent = carrito.length;
        });
    }
});
