
export function validarCheckout(formulario) {
  const errores = {};

  if (formulario.nombre.trim().length < 3) {
    errores.nombre =
      "Ingresa un nombre de al menos 3 caracteres.";
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formulario.email.trim()
    )
  ) {
    errores.email =
      "Ingresa un correo electrónico válido.";
  }

  if (
    !/^\+?[\d\s-]{8,15}$/.test(
      formulario.telefono.trim()
    )
  ) {
    errores.telefono =
      "Ingresa un teléfono válido.";
  }

  if (formulario.direccion.trim().length < 5) {
    errores.direccion =
      "Ingresa una dirección válida.";
  }

  if (!formulario.comuna.trim()) {
    errores.comuna = "La comuna es obligatoria.";
  }

  if (!formulario.region.trim()) {
    errores.region = "La región es obligatoria.";
  }

  return errores;
}
