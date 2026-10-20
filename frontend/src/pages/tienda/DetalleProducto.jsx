
import { Link, useParams } from "react-router-dom";
import { obtenerProductos } from "../../services/productosService";
import { useCarrito } from "../../context/CarritoContext";

function DetalleProducto() {
  // Obtiene el ID del producto desde la URL
  const { id } = useParams();

  const { agregarAlCarrito } = useCarrito();

  // Busca el libro correspondiente
  const productos = obtenerProductos();

  const producto = productos.find(
    (libro) => String(libro.id) === id
  );

  // Si el libro no existe
  if (!producto) {
    return (
      <main className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>El libro solicitado no existe.</p>
        <Link to="/" className="btn btn-secondary">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const precioFormateado =
    producto.precio.toLocaleString("es-CL");

  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">

        {/* Imagen del libro */}
        <div className="col-md-5 text-center">
          <img
            src={producto.imagen}
            alt={producto.titulo}
            className="img-fluid rounded"
            style={{
              maxHeight: "450px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* Información del libro */}
        <div className="col-md-7">
          <h1 className="mb-3">{producto.titulo}</h1>

          <h3 className="text-danger mb-4">
            ${precioFormateado}
          </h3>

          <h5>Descripción</h5>
          <p>{producto.descripcion}</p>

          <div className="d-flex gap-3 mt-4 flex-wrap">
            <button
                type="button"
                className="btn btn-success"
                onClick={() => agregarAlCarrito(producto)}
            >
                Agregar al carrito
            </button>

            <Link to="/" className="btn btn-outline-secondary">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
