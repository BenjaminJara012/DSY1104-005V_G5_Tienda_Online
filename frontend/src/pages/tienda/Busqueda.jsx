
import { useSearchParams, Link } from "react-router-dom";
import { buscarProductos } from "../../services/productosService";
import { useCarrito } from "../../context/CarritoContext";
import ProductoCard from "../../components/ProductoCard";

function Busqueda() {
  const [searchParams] = useSearchParams();
  const texto = searchParams.get("q") || "";

  const productos = texto.trim()
    ? buscarProductos(texto)
    : [];

  const { agregarAlCarrito } = useCarrito();

  return (
    <main>
      <section className="productos-section">
        <h2 className="section-title">
          RESULTADOS DE BÚSQUEDA
        </h2>

        <p className="text-center mb-4">
          Resultados para: <strong>{texto}</strong>
        </p>

        {productos.length === 0 ? (
          <div className="text-center py-5">
            <p>No encontramos libros con esa búsqueda.</p>
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

export default Busqueda;
