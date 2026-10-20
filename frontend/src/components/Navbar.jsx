
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
  const { cantidadTotal } = useCarrito();
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

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Busca por Título, Autor, ISBN..."
            aria-label="Buscar libros"
          />
          <button type="button" aria-label="Buscar">
            🔍
          </button>
        </div>

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
              AUTORES CHILENOS HASTA 45% OFF
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
