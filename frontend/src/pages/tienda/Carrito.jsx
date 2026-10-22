
import { useState } from "react";
import { Link } from "react-router-dom";

import { useCarrito } from "../../context/CarritoContext";
import {
  obtenerStockDisponible
} from "../../services/carritoService";

function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    totalCarrito,
    mensajeStock,
    limpiarMensajeStock
  } = useCarrito();

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

  const limpiarEdicion = (id) => {
    setCantidadesEditadas((actual) => {
      const nuevas = { ...actual };
      delete nuevas[id];
      return nuevas;
    });
  };

  const editarCantidad = (id, valor) => {
    if (valor === "") {
      setCantidadesEditadas((actual) => ({
        ...actual,
        [id]: ""
      }));
      return;
    }

    if (!/^\d+$/.test(valor)) {
      return;
    }

    const cantidad = Number(valor);

    if (!Number.isSafeInteger(cantidad)) {
      return;
    }

    setCantidadesEditadas((actual) => ({
      ...actual,
      [id]: valor
    }));

    if (cantidad >= 1) {
      const aceptado = cambiarCantidad(id, cantidad);

      if (!aceptado) {
        limpiarEdicion(id);
      }
    }
  };

  const finalizarEdicion = (producto) => {
    const valor = obtenerCantidadMostrada(producto);
    const cantidad = Number(valor);

    if (
      valor !== "" &&
      Number.isSafeInteger(cantidad) &&
      cantidad >= 1
    ) {
      cambiarCantidad(producto.id, cantidad);
    }

    limpiarEdicion(producto.id);
  };

  const ajustarCantidad = (producto, diferencia) => {
    const nuevaCantidad = Math.max(
      1,
      producto.cantidad + diferencia
    );

    cambiarCantidad(producto.id, nuevaCantidad);
    limpiarEdicion(producto.id);
  };

  const eliminarProducto = (id) => {
    eliminarDelCarrito(id);
    limpiarEdicion(id);
  };

  return (
    <main className="container py-5">
      <h1 className="mb-4">Mi carrito de compras</h1>

      {mensajeStock && (
        <div
          className="alert alert-warning alert-dismissible"
          role="alert"
        >
          {mensajeStock}

          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar mensaje"
            onClick={limpiarMensajeStock}
          />
        </div>
      )}

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
                  <th>Stock</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((producto) => {
                  const stockDisponible =
                    obtenerStockDisponible(producto.id);

                  const limiteAlcanzado =
                    producto.cantidad >= stockDisponible;

                  return (
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
                            disabled={limiteAlcanzado}
                            aria-label={`Aumentar cantidad de ${producto.titulo}`}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td>
                        {stockDisponible}
                        {producto.cantidad > stockDisponible && (
                          <small className="text-danger d-block">
                            Stock insuficiente
                          </small>
                        )}
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
                            eliminarProducto(producto.id)
                          }
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                vaciarCarrito();
                setCantidadesEditadas({});
              }}
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
