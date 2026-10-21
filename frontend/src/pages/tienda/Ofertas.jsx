
import { useCarrito } from "../../context/CarritoContext";
import { obtenerProductosEnOferta } from "../../services/productosService";
import ProductoCard from "../../components/ProductoCard";
import { Link } from "react-router-dom";

function Ofertas() {
  const productos = obtenerProductosEnOferta();
  const { agregarAlCarrito } = useCarrito();

  return (
    <main>
      <section className="productos-section">
        <h2 className="section-title">
          OFERTAS ESPECIALES
        </h2>

        {productos.length === 0 ? (
          <div className="text-center py-5">
            <p>No hay ofertas disponibles actualmente.</p>
            <Link to="/productos" className="btn btn-success">
              Ver catálogo
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

export default Ofertas;
