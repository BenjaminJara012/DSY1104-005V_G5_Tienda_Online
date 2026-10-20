
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

  const formatearPrecio = (precio) =>
    precio.toLocaleString("es-CL");

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
                      <input
                        type="number"
                        min="1"
                        step="1"
                        className="form-control"
                        style={{ width: "85px" }}
                        value={producto.cantidad}
                        onChange={(e) =>
                          cambiarCantidad(
                            producto.id,
                            e.target.value
                          )
                        }
                      />
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

              <Link to="/checkout" className="btn btn-success mt-2">
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
