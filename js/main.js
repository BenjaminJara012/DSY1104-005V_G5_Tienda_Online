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
// Función para añadir productos al LocalStorage
function agregarAlCarritoDirecto(idProducto) {
    // 1. Buscar el libro en el arreglo por su ID
    const libro = productosBD.find(p => p.id === idProducto);
    if (!libro) return;

    // 2. Obtener el carrito actual del LocalStorage o crear uno vacío
    let carrito = JSON.parse(localStorage.getItem('carritoLibreria')) || [];

    // 3. Revisar si el producto ya existe en el carrito
    const existeIndex = carrito.findIndex(p => p.id === idProducto);

    if (existeIndex !== -1) {
        // Si ya existe, aumentar la cantidad
        carrito[existeIndex].cantidad = (carrito[existeIndex].cantidad || 1) + 1;
    } else {
        // Si no existe, agregar con cantidad 1
        carrito.push({
            id: libro.id,
            titulo: libro.titulo,
            precio: libro.precio,
            imagen: libro.imagen,
            cantidad: 1
        });
    }

    // 4. Guardar en LocalStorage y actualizar la interfaz
    localStorage.setItem('carritoLibreria', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    alert(`¡"${libro.titulo}" se agregó al carrito!`);
}

// Función para actualizar el número del icono del carrito en el Header
function actualizarContadorCarrito() {
    const contadorElemento = document.getElementById('cart-count');
    if (!contadorElemento) return;

    const carrito = JSON.parse(localStorage.getItem('carritoLibreria')) || [];
    // Sumar el total de ítems considerando cantidades
    const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
    
    contadorElemento.textContent = totalItems;
}

// Arreglo de Productos de la Tienda
const productosBD = [
    { id: 1, titulo: "Harry Potter y la Piedra Filosofal", 
        precio: 16990, imagen: "img/hp1.jpg", 
        descripcion: "Novela de fantasía y aventuras escrita por J. K. Rowling que narra los inicios de un niño huérfano en el mundo de la magia." 
    },
    { id: 2, titulo: "Harry Potter y la Cámara Secreta", 
        precio: 17500, imagen: "img/hp2.jpg", 
        descripcion: "Segunda parte de la historia de Harry Potter escrito por J. K. Rowling." 
    },
    { id: 3, titulo: "Harry Potter y el Prisionero de Azkaban", 
        precio: 18990, imagen: "img/hp3.jpg", 
        descripcion: "Tercera entrega de la saga creada por J. K. Rowling, donde Harry cumple 13 años y enfrenta el regreso a Hogwarts en medio de una gran amenaza." 
    },
    { id: 4, titulo: "El Duque y Yo (Bridgerton 1)", 
        precio: 14390, imagen: "img/bridgerton1.jpg", 
        descripcion: "Historia ambientada en la época de la Regencia en Londres y combina romance, humor y los enredos de la alta sociedad." 
    },
    { id: 5, titulo: "El Vizconde que me Amó (Bridgerton 2)", 
        precio: 15990, imagen: "img/bridgerton2.jpg", 
        descripcion: "Segundo libro de la exitosa serie romántica histórica Los Bridgerton, escrita por Julia Quinn, donde Anthony Bridgerton decide buscar una esposa para cumplir con sus deberes nobiliarios." 
    },
    { id: 6, titulo: "Te Doy mi Corazón (Bridgerton 3)", 
        precio: 15990, imagen: "img/bridgerton3.jpg", 
        descripcion: "Es el tercer libro de la famosa saga Los Bridgerton, y cuenta una romántica historia inspirada en el cuento de la Cenicienta." 
    },
    { id: 7, titulo: "El Resplandor", 
        precio: 13290, imagen: "img/king1.jpg", 
        descripcion: "Novela de terror psicológico escrita por Stephen King." 
    },
    { id: 8, titulo: "It (Eso)", 
        precio: 22990, imagen: "img/king2.jpg", 
        descripcion: "Novela de terror y horror sobrenatural escrita por Stephen King." 
    },
    { id: 9, titulo: "Carrie", 
        precio: 11690, imagen: "img/king3.jpg", 
        descripcion: "Un clásico del género de terror escrito por Stephen king, que narra la atormentada adolescencia de una joven marginada con poderes telequinéticos." 
    },
    { id: 10, titulo: "Seduciendo a Mr. Bridgerton (Bridgerton 4)", 
        precio: 16500, imagen: "img/bridgerton4.jpg", 
        descripcion: "Cuarto libro de la exitosa serie romántica Bridgerton escrita por Julia Quinn." 
    }
];

function renderizarProductos() {
    const contenedor = document.getElementById('gridProductos');
    if (!contenedor) return;

    contenedor.innerHTML = productosBD.map(prod => `
        <article class="product-card">
            <!-- Enlace en la Imagen -->
            <a href="detalle-producto.html?id=${prod.id}" class="product-link">
                <img src="${prod.imagen}" alt="${prod.titulo}">
            </a>
            
            <!-- Enlace en el Título -->
            <h3>
                <a href="detalle-producto.html?id=${prod.id}" class="product-title-link">
                    ${prod.titulo}
                </a>
            </h3>

            <p class="price">$${prod.precio.toLocaleString('es-CL')}</p>

            <div class="card-buttons">
                <a href="detalle-producto.html?id=${prod.id}" class="btn-detail">Ver Detalle</a>
                <button class="btn-add-cart" onclick="agregarAlCarritoDirecto(${prod.id})">Agregar</button>
            </div>
        </article>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza la lista de productos si existe la grilla
    renderizarProductos();
    
    // Actualiza la burbuja/contador del carrito en la barra superior
    actualizarContadorCarrito();
});