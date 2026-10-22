
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/tienda/Home";
import DetalleProducto from "./pages/tienda/DetalleProducto";
import Carrito from "./pages/tienda/Carrito";
import Categorias from "./pages/tienda/Categorias";
import Ofertas from "./pages/tienda/Ofertas";
import Busqueda from "./pages/tienda/Busqueda";
import Checkout from "./pages/tienda/Checkout";
import PagoExitoso from "./pages/tienda/PagoExitoso";
import PagoError from "./pages/tienda/PagoError";

import { AdminPage } from "./pages/admin/AdminPage";

import Login from "./pages/auth/Login";
import {
  AuthProvider,
  useAuth
} from "./context/AuthContext";

// Solo permite acceder al administrador autenticado.
function RutaAdmin({ children }) {
  const { esAdministrador } = useAuth();

  if (!esAdministrador) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function ContenidoApp() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Rutas públicas de la tienda */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Home />} />

        <Route
          path="/producto/:id"
          element={<DetalleProducto />}
        />

        <Route path="/carrito" element={<Carrito />} />

        <Route
          path="/categorias/:categoria"
          element={<Categorias />}
        />

        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/buscar" element={<Busqueda />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/pago-exitoso/:id"
          element={<PagoExitoso />}
        />

        <Route path="/pago-error" element={<PagoError />} />

        {/* Inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida del administrador */}
        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <AdminPage />
            </RutaAdmin>
          }
        />

        {/* Página no encontrada */}
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

function App() {
  return (
    <AuthProvider>
      <ContenidoApp />
    </AuthProvider>
  );
}

export default App;
