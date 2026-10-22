
const CLAVE_SESION = "sesionLibreria";

//Credenciales simuladas
const ADMIN_DEMO = {
  email: "be.cons@duocuc.cl",
  password: "Duoc.2026",
  nombre: "Administrador",
  rol: "administrador"
};

export function iniciarSesion(email, password) {
  const correoNormalizado = email.trim().toLowerCase();

  if (
    correoNormalizado !== ADMIN_DEMO.email ||
    password !== ADMIN_DEMO.password
  ) {
    throw new Error("Correo o contraseña incorrectos.");
  }

  const usuario = {
    email: ADMIN_DEMO.email,
    nombre: ADMIN_DEMO.nombre,
    rol: ADMIN_DEMO.rol
  };

  localStorage.setItem(
    CLAVE_SESION,
    JSON.stringify(usuario)
  );

  return usuario;
}

export function obtenerSesion() {
  try {
    const datos = localStorage.getItem(CLAVE_SESION);

    if (!datos) return null;

    const usuario = JSON.parse(datos);

    if (
      usuario &&
      usuario.email === ADMIN_DEMO.email &&
      usuario.rol === "administrador"
    ) {
      return usuario;
    }

    return null;
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}
