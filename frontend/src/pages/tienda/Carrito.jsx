
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    totalCarrito
  } = useCarrito();

  // Guarda temporalmente el texto mientras se edita.
  const [cantidadesEditadas, setCantidadesEditadas] =
    useState({});

  const formatearPrecio = (precio) =>
    precio.toLocaleString("es-CL");

  const obtenerCantidadMostrada = (producto) => {
    return Object.prototype.hasOwnProperty.call(
      cantidadesEditadas,
      producto.id
    )
      ? cantidadesEditadas[producto.id]
      : String(producto.cantidad);
  };

  const editarCantidad = (id, valor) => {
    // Permitir borrar el contenido temporalmente.
    if (valor === "") {
      setCantidadesEditadas((actual) => ({
        ...actual,
        [id]: ""
      }));
      return;
    }

    // Solo permitir dígitos.
    if (!/^\d+$/.test(valor)) {
      return;
    }

    setCantidadesEditadas((actual) => ({
      ...actual,
      [id]: valor
    }));

    const cantidad = Number(valor);

    if (Number.isSafeInteger(cantidad) && cantidad >= 1) {
      cambiarCantidad(id, cantidad);
    }
  };

  const finalizarEdicion = (producto) => {
    setCantidadesEditadas((actual) => {
      const nuevas = { ...actual };
      delete nuevas[producto.id];
      return nuevas;
    });
  };

  const ajustarCantidad = (producto, diferencia) => {
    const nuevaCantidad = Math.max(
      1,
      producto.cantidad + diferencia
    );

    cambiarCantidad(producto.id, nuevaCantidad);

    setCantidadesEditadas((actual) => {
      const nuevas = { ...actual };
      delete nuevas[producto.id];
      return nuevas;
    });
  };

  return (
    <main className="container py-5">
      <h1 className="mb-4">Mi carrito de compras</h1>

      {carrito.length === 0 ? (
        <div className="text-center py-5">
          <h3>Tu carrito está vacío</h3>
          <p>Explora nuestro catálogo de libros.</p>

          <Link to="/productos" className="btn btn-success">
            Ver libros
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={producto.imagen}
                          alt={producto.titulo}
                          style={{
                            width: "65px",
                            height: "90px",
                            objectFit: "contain"
                          }}
                        />

                        <span>{producto.titulo}</span>
                      </div>
                    </td>

                    <td>
                      ${formatearPrecio(producto.precio)}
                    </td>

                    <td>
                      <div
                        className="d-flex align-items-center gap-1"
                        style={{ minWidth: "155px" }}
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            ajustarCantidad(producto, -1)
                          }
                          disabled={producto.cantidad <= 1}
                          aria-label={`Disminuir cantidad de ${producto.titulo}`}
                        >
                          −
                        </button>

                        <input
                          type="text"
                          inputMode="numeric"
                          className="form-control form-control-sm text-center"
                          style={{ width: "65px" }}
                          aria-label={`Cantidad de ${producto.titulo}`}
                          value={obtenerCantidadMostrada(producto)}
                          onChange={(e) =>
                            editarCantidad(
                              producto.id,
                              e.target.value
                            )
                          }
                          onBlur={() =>
                            finalizarEdicion(producto)
                          }
                        />

                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            ajustarCantidad(producto, 1)
                          }
                          aria-label={`Aumentar cantidad de ${producto.titulo}`}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>
                      ${formatearPrecio(
                        producto.precio * producto.cantidad
                      )}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          eliminarDelCarrito(producto.id)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>

            <div className="text-end">
              <h3>
                Total: ${formatearPrecio(totalCarrito)}
              </h3>

              <Link
                to="/checkout"
                className="btn btn-success mt-2"
              >
                Continuar al pago
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Carrito;
