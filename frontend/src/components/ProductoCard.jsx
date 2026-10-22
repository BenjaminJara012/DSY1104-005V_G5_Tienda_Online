
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import {
  calcularPrecioFinal
} from "../services/productosService";

function ProductoCard({ producto, onAgregar }) {
  const { carrito, mensajeStock } = useCarrito();

  const precioFinal = calcularPrecioFinal(producto);

  const tieneOferta =
    producto.oferta === true &&
    Number(producto.descuento) > 0;

  const stockDisponible = Number(producto.stock ?? 10);

  const cantidadEnCarrito =
    carrito.find((item) => item.id === producto.id)
      ?.cantidad ?? 0;

  const agotado = stockDisponible <= 0;

  const limiteAlcanzado =
    cantidadEnCarrito >= stockDisponible;

  const formatearPrecio = (precio) =>
    precio.toLocaleString("es-CL");

  return (
    <article className="product-card">
      <Link
        to={`/producto/${producto.id}`}
        className="product-link"
      >
        <img
          src={producto.imagen}
          alt={producto.titulo}
        />
      </Link>

      <h3>
        <Link
          to={`/producto/${producto.id}`}
          className="product-title-link"
        >
          {producto.titulo}
        </Link>
      </h3>

      {tieneOferta && (
        <span className="badge bg-danger mb-2">
          {producto.descuento}% OFF
        </span>
      )}

      <div className="mb-2">
        {tieneOferta && (
          <div>
            <small className="text-muted text-decoration-line-through">
              ${formatearPrecio(producto.precio)}
            </small>
          </div>
        )}

        <p className="price mb-0">
          ${formatearPrecio(precioFinal)}
        </p>
      </div>

      <p className="small text-muted mb-2">
        {agotado
          ? "Producto agotado"
          : `Stock disponible: ${stockDisponible}`}
      </p>

      <div className="card-buttons">
        <Link
          to={`/producto/${producto.id}`}
          className="btn btn-outline-secondary mb-2"
        >
          Ver Detalle
        </Link>

        <button
          type="button"
          className="btn-add-cart"
          onClick={() => onAgregar(producto)}
          disabled={agotado}
        >
          {agotado ? "Agotado" : "Agregar"}
        </button>
      </div>

      {limiteAlcanzado && !agotado && (
        <small className="text-warning d-block mt-2">
          Ya tienes todas las unidades disponibles
          en tu carrito.
        </small>
      )}

      {mensajeStock &&
        mensajeStock.includes(`"${producto.titulo}"`) && (
          <div
            className="alert alert-warning mt-2 py-2"
            role="alert"
          >
            {mensajeStock}
          </div>
        )}
    </article>
  );
}

export default ProductoCard;
