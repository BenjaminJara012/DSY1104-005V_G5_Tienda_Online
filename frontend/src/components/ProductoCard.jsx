
import { Link } from "react-router-dom";

function ProductoCard({ producto, onAgregar }) {
  const precioFormateado = producto.precio.toLocaleString("es-CL");

  return (
    <article className="product-card">
      <Link
        to={`/producto/${producto.id}`}
        className="product-link"
      >
        <img src={producto.imagen} alt={producto.titulo} />
      </Link>

      <h3>
        <Link
          to={`/producto/${producto.id}`}
          className="product-title-link"
        >
          {producto.titulo}
        </Link>
      </h3>

      <p className="price">${precioFormateado}</p>

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
