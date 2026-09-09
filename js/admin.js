// --- 1. Control de Pestañas (Secciones) ---
function mostrarSeccion(idSeccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
    // Desactivar botones de navegación
    document.querySelectorAll('.admin-menu a').forEach(link => link.classList.remove('active'));

    // Mostrar la sección seleccionada y activar su botón
    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) seccionActiva.classList.add('active');

    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// --- 2. Carga Dinámica de Comunas según Región ---
const comunasPorRegion = {
    rm: ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
    valpo: ["Valparaíso", "Viña del Mar", "Concón", "Quilpué"]
};

function cargarComunas() {
    const regionSeleccionada = document.getElementById('selectRegion').value;
    const selectComuna = document.getElementById('selectComuna');

    selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';

    if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
        comunasPorRegion[regionSeleccionada].forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna.toLowerCase().replace(/ /g, '-');
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
    }
}

// --- 3. Validación de RUN / RUT Chileno ---
// Regla: 7 a 9 caracteres alfanuméricos, sin puntos ni guión (ej: 19123456K o 123456789)
function validarRUN(run) {
    const runRegex = /^[0-9]{7,8}[0-9kK]{1}$/;
    return runRegex.test(run);
}

// --- 4. Renderizar Tablas al Cargar ---
document.addEventListener('DOMContentLoaded', () => {
    renderizarTablaProductosAdmin();
    renderizarTablaUsuariosAdmin();

    // Evento Formulario Usuario
    const formUsuario = document.getElementById('formUsuarioAdmin');
    if (formUsuario) {
        formUsuario.addEventListener('submit', (e) => {
            e.preventDefault();
            const runInput = document.getElementById('userRun').value.trim();
            const errorRun = document.getElementById('errorRun');

            if (!validarRUN(runInput)) {
                errorRun.textContent = "RUN inválido. Debe tener entre 7 y 9 caracteres sin puntos ni guión.";
                return;
            }

            errorRun.textContent = "";
            alert("Usuario registrado con éxito en la vista de administración.");
            formUsuario.reset();
        });
    }
});

// Renderizar Productos en la Tabla
function renderizarTablaProductosAdmin() {
    const tbody = document.getElementById('tablaProductosBody');
    if (!tbody) return;

    // Lee los productos desde la variable 'productosBD' de main.js
    if (typeof productosBD !== 'undefined') {
        tbody.innerHTML = productosBD.map(prod => `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.titulo}</td>
                <td>$${prod.precio.toLocaleString('es-CL')}</td>
                <td>
                    <button class="btn-action btn-edit" onclick="alert('Editar ID ${prod.id}')">✏️ Editar</button>
                    <button class="btn-action btn-delete" onclick="alert('Eliminar ID ${prod.id}')">🗑️ Eliminar</button>
                </td>
            </tr>
        `).join('');
    }
}

// Renderizar Usuarios en la Tabla (Simulación)
function renderizarTablaUsuariosAdmin() {
    const tbody = document.getElementById('tablaUsuariosBody');
    if (!tbody) return;

    const usuariosSimulados = [
        { run: "19123456K", nombre: "Juan Pérez", email: "juan@duoc.cl" },
        { run: "187654321", nombre: "Maria Silva", email: "maria@gmail.com" }
    ];

    tbody.innerHTML = usuariosSimulados.map(user => `
        <tr>
            <td>${user.run}</td>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn-action btn-edit" onclick="alert('Editar RUN ${user.run}')">✏️ Editar</button>
                <button class="btn-action btn-delete" onclick="alert('Eliminar RUN ${user.run}')">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join('');
}