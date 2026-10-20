
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-principal">
      <div className="footer-container">

        {/* Servicio al cliente */}
        <div className="footer-column">
          <h4>SERVICIO AL CLIENTE</h4>
          <ul>
            <li><Link to="/contacto">Centro de Ayuda</Link></li>
            <li><span>Seguimiento de Envíos</span></li>
            <li><span>Términos y Condiciones</span></li>
          </ul>
        </div>

        {/* Categorías */}
        <div className="footer-column">
          <h4>COMPRA POR CATEGORÍA</h4>
          <ul>
            <li><Link to="/categorias/ficcion">Ficción</Link></li>
            <li><Link to="/categorias/no-ficcion">No Ficción</Link></li>
            <li><Link to="/categorias/infantil">Infantil y Juvenil</Link></li>
          </ul>
        </div>

        {/* Información de la librería */}
        <div className="footer-column">
          <h4>RELATOS & PÁGINAS</h4>
          <ul>
            <li><Link to="/nosotros">Sobre Nosotros</Link></li>
            <li><span>Nuestras Tiendas</span></li>
            <li><Link to="/blogs">Blog / Reseñas</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-column">
          <h4>CONTACTO</h4>
          <ul>
            <li><Link to="/contacto">Formulario de Contacto</Link></li>
            <li>
              <a href="mailto:contacto@relatosypaginas.cl">
                contacto@relatosypaginas.cl
              </a>
            </li>
            <li><span>Santiago, Chile</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Relatos & Páginas.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
