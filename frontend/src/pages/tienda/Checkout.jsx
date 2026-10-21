
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useCarrito } from "../../context/CarritoContext";
import { guardarOrden } from "../../services/ordenesService";
import { validarCheckout } from "../../services/checkoutService";

function Checkout() {
  const navigate = useNavigate();

  const {
    carrito,
    totalCarrito,
    vaciarCarrito
  } = useCarrito();

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    comuna: "",
    region: ""
  });

  const [errores, setErrores] = useState({});
  const [resultadoPago, setResultadoPago] = useState("aprobado");
  const [procesando, setProcesando] = useState(false);

  const formatearPrecio = (valor) =>
    valor.toLocaleString("es-CL");

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }));

    setErrores((anterior) => ({
      ...anterior,
      [name]: ""
    }));
  };

  const validarFormulario = () => {
  const nuevosErrores = validarCheckout(formulario);

  setErrores(nuevosErrores);

  return Object.keys(nuevosErrores).length === 0;
  };

  const finalizarCompra = (e) => {
    e.preventDefault();

    if (procesando || carrito.length === 0) return;

    if (!validarFormulario()) return;

    setProcesando(true);

    if (resultadoPago === "rechazado") {
      navigate("/pago-error");
      return;
    }

    const orden = {
      id: `ORD-${crypto.randomUUID()}`,
      fecha: new Date().toISOString(),

      cliente: {
        nombre: formulario.nombre.trim(),
        email: formulario.email.trim(),
        telefono: formulario.telefono.trim()
      },

      envio: {
        direccion: formulario.direccion.trim(),
        comuna: formulario.comuna.trim(),
        region: formulario.region.trim()
      },

      productos: carrito.map((producto) => ({
        id: producto.id,
        titulo: producto.titulo,
        precioOriginal:
          producto.precioOriginal ?? producto.precio,
        precio: producto.precio,
        cantidad: producto.cantidad,
        subtotal: producto.precio * producto.cantidad
      })),

      total: totalCarrito,
      metodoPago: "simulado",
      estadoPago: "aprobado",
      estadoPedido: "pendiente"
    };

    try {
      guardarOrden(orden);
      vaciarCarrito();

      navigate(`/pago-exitoso/${orden.id}`, {
        replace: true
      });
    } catch (error) {
      console.error("Error al guardar la orden:", error);
      setErrores({
        general:
          "No se pudo guardar la compra. Inténtalo nuevamente."
      });
      setProcesando(false);
    }
  };

  if (carrito.length === 0) {
    return (
      <main className="container py-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos antes de finalizar una compra.</p>

        <Link to="/productos" className="btn btn-success">
          Ver catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="mb-4">Finalizar compra</h1>

      <div className="row g-4">
        <div className="col-lg-7">
          <form onSubmit={finalizarCompra} noValidate>
            <div className="card p-4 shadow-sm">
              <h4 className="mb-3">
                Datos del cliente
              </h4>

              {[
                ["nombre", "Nombre completo"],
                ["email", "Correo electrónico"],
                ["telefono", "Teléfono"]
              ].map(([campo, etiqueta]) => (
                <div className="mb-3" key={campo}>
                  <label
                    htmlFor={campo}
                    className="form-label"
                  >
                    {etiqueta}
                  </label>

                  <input
                    id={campo}
                    name={campo}
                    type={
                      campo === "email"
                        ? "email"
                        : campo === "telefono"
                          ? "tel"
                          : "text"
                    }
                    className={`form-control ${
                      errores[campo] ? "is-invalid" : ""
                    }`}
                    value={formulario[campo]}
                    onChange={manejarCambio}
                    aria-invalid={Boolean(errores[campo])}
                    required
                  />

                  {errores[campo] && (
                    <div className="invalid-feedback">
                      {errores[campo]}
                    </div>
                  )}
                </div>
              ))}

              <h4 className="mt-3 mb-3">
                Dirección de entrega
              </h4>

              {[
                ["direccion", "Dirección"],
                ["comuna", "Comuna"],
                ["region", "Región"]
              ].map(([campo, etiqueta]) => (
                <div className="mb-3" key={campo}>
                  <label
                    htmlFor={campo}
                    className="form-label"
                  >
                    {etiqueta}
                  </label>

                  <input
                    id={campo}
                    name={campo}
                    type="text"
                    className={`form-control ${
                      errores[campo] ? "is-invalid" : ""
                    }`}
                    value={formulario[campo]}
                    onChange={manejarCambio}
                    aria-invalid={Boolean(errores[campo])}
                    required
                  />

                  {errores[campo] && (
                    <div className="invalid-feedback">
                      {errores[campo]}
                    </div>
                  )}
                </div>
              ))}

              <h4 className="mt-3 mb-3">
                Simulación de pago
              </h4>

              <p className="text-muted">
                Selecciona el resultado para probar
                ambos escenarios de la evaluación.
              </p>

              <select
                className="form-select mb-4"
                value={resultadoPago}
                onChange={(e) =>
                  setResultadoPago(e.target.value)
                }
              >
                <option value="aprobado">
                  Simular pago aprobado
                </option>

                <option value="rechazado">
                  Simular pago rechazado
                </option>
              </select>

              {errores.general && (
                <div className="alert alert-danger">
                  {errores.general}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={procesando}
              >
                {procesando
                  ? "Procesando..."
                  : "Confirmar compra"}
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-5">
          <div className="card p-4 shadow-sm">
            <h4>Resumen del pedido</h4>

            <hr />

            {carrito.map((producto) => (
              <div
                key={producto.id}
                className="d-flex justify-content-between mb-3"
              >
                <span>
                  {producto.titulo}
                  {" "}x{producto.cantidad}
                </span>

                <strong>
                  ${formatearPrecio(
                    producto.precio * producto.cantidad
                  )}
                </strong>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between">
              <h5>Total</h5>

              <h5 className="text-success">
                ${formatearPrecio(totalCarrito)}
              </h5>
            </div>

            <small className="text-muted mt-3">
              Compra simulada. No se realizará ningún
              cobro real.
            </small>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
