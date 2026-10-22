
import { useState } from "react";
import ProductoCard from "../../components/ProductoCard";
import { obtenerProductos } from "../../services/productosService";
import { useCarrito } from "../../context/CarritoContext";

function Home() {
  const [productos] = useState(obtenerProductos);

  const { agregarAlCarrito } = useCarrito();

  return (
    <main>
      <section id="catalogo" className="productos-section">
        <h2 className="section-title">
          LOS MÁS VENDEDORES
        </h2>

        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onAgregar={agregarAlCarrito}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
