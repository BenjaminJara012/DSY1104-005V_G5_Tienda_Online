
import { Link } from "react-router-dom";
import { calcularPrecioFinal } from "../services/productosService";

function ProductoCard({ producto, onAgregar }) {
  const precioFinal = calcularPrecioFinal(producto);

  const tieneOferta =
    producto.oferta === true &&
    Number(producto.descuento) > 0;

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
        >
          Agregar
        </button>
      </div>
    </article>
  );
}

export default ProductoCard;
