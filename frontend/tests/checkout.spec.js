
import { validarCheckout } from "../src/services/checkoutService.js";

describe("Validaciones del checkout", () => {
  const formularioValido = {
    nombre: "Cliente Prueba",
    email: "cliente@ejemplo.cl",
    telefono: "912345678",
    direccion: "Calle Principal 123",
    comuna: "Santiago",
    region: "Metropolitana"
  };

  it("debe rechazar un nombre demasiado corto", () => {
    const errores = validarCheckout({
      ...formularioValido,
      nombre: "Al"
    });

    expect(errores.nombre).toBeDefined();
  });

  it("debe rechazar un correo inválido", () => {
    const errores = validarCheckout({
      ...formularioValido,
      email: "correo-invalido"
    });

    expect(errores.email).toBeDefined();
  });

  it("debe rechazar un teléfono inválido", () => {
    const errores = validarCheckout({
      ...formularioValido,
      telefono: "123"
    });

    expect(errores.telefono).toBeDefined();
  });

  it("debe rechazar una dirección demasiado corta", () => {
    const errores = validarCheckout({
      ...formularioValido,
      direccion: "A"
    });

    expect(errores.direccion).toBeDefined();
  });

  it("debe aceptar un formulario válido", () => {
    const errores = validarCheckout(formularioValido);

    expect(errores).toEqual({});
  });
});
