
import { useParams, Link } from "react-router-dom";
import { obtenerProductosPorCategoria } from "../../services/productosService";
import { useCarrito } from "../../context/CarritoContext";
import ProductoCard from "../../components/ProductoCard";

function Categorias() {
  const { categoria } = useParams();
  const { agregarAlCarrito } = useCarrito();

  const productos = obtenerProductosPorCategoria(categoria);

  return (
    <main>
      <section className="productos-section">
        <h2 className="section-title">
          Categoría: {categoria}
        </h2>

        {productos.length === 0 ? (
          <div className="text-center py-5">
            <p>No hay libros disponibles en esta categoría.</p>

            <Link to="/productos" className="btn btn-success">
              Volver al catálogo
            </Link>
          </div>
        ) : (
          <div className="productos-grid">
            {productos.map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                onAgregar={agregarAlCarrito}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Categorias;
