
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/tienda/Home";
import DetalleProducto from "./pages/tienda/DetalleProducto";
import Carrito from "./pages/tienda/Carrito";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Home />} />
        <Route path="/producto/:id" element={<DetalleProducto />}/>
        <Route path="/carrito" element={<Carrito />} />
        
        <Route
          path="*"
          element={
            <main className="container py-5">
              <h2>Página en construcción</h2>
              <p>Próximamente estará disponible.</p>
            </main>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
