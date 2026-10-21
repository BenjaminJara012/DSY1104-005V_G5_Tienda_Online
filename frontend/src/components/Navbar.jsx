
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { cantidadTotal } = useCarrito();
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const manejarBusqueda = (e) => {
    e.preventDefault();

  const texto = busqueda.trim();

    if (!texto) return;

    navigate(`/buscar?q=${encodeURIComponent(texto)}`);
    setBusqueda("");
};
  return (
    <header className="header-principal">
      <div className="header-top">

        {/* Logo de la tienda */}
        <Link to="/" className="brand text-decoration-none">
          <span className="logo-icon"></span>
          <span className="brand-name">
            RELATOS & PÁGINAS
          </span>
        </Link>

        <form className="search-bar" onSubmit={manejarBusqueda}>
          <input
            type="text"
            placeholder="Busca por Título, Autor, ISBN..."
            aria-label="Buscar libros"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <button type="submit" aria-label="Buscar">
            🔍
          </button>
        </form>

        {/* Autenticación y carrito */}
        <div className="header-actions">
          <div className="auth-links">
            <Link to="/login">Iniciar sesión</Link>
            <span>|</span>
            <Link to="/registro">Registrarse</Link>
          </div>

          <span className="action-item icon-only" title="Favoritos">
            🤍
          </span>

          <Link to="/carrito" className="action-item cart-icon">
            🛒 <span id="cart-count">{cantidadTotal}</span>
          </Link>
        </div>
      </div>

      {/* Navegación de categorías */}
      <nav className="nav-categories">
        <ul>
          <li><Link to="/productos">LIBROS</Link></li>
          <li><Link to="/categorias/ebooks">EBOOKS</Link></li>
          <li><Link to="/categorias/preventas">PREVENTAS</Link></li>
          <li><Link to="/categorias/importados">LIBROS IMPORTADOS</Link></li>
          <li><Link to="/categorias/infantil">INFANTIL Y JUVENIL</Link></li>
          <li>
            <Link to="/ofertas" className="highlight-pink">
              LIBROS CON DESCUENTO%
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
