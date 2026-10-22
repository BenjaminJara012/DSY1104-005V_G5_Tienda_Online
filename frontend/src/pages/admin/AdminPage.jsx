
import { useEffect, useState } from 'react';
import {
  obtenerProductos,
  guardarProductos
} from '../../services/productosService';

const USUARIOS_DEMO = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    rol: 'Cliente'
  },
  {
    id: 2,
    nombre: 'María Gómez',
    email: 'maria@example.com',
    rol: 'Administrador'
  }
];

const CATEGORIAS_INICIALES = [
  'Fantasía',
  'Romance',
  'Terror'
];

const FORMULARIO_INICIAL = {
  titulo: '',
  precio: '',
  stock: '10',
  categoria: 'Fantasía',
  imagen: '',
  descripcion: '',
  oferta: false,
  descuento: '0'
};

const formatoPrecio = (valor) =>
  `$${Number(valor || 0).toLocaleString('es-CL')}`;

function leerOrdenes() {
  try {
    const datos = JSON.parse(
      localStorage.getItem('ordenesLibreria') || '[]'
    );

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function obtenerNombreCliente(cliente) {
  if (typeof cliente === 'string') return cliente;

  if (cliente && typeof cliente === 'object') {
    const nombre = [
      cliente.nombre,
      cliente.apellido
    ].filter(Boolean).join(' ');

    return nombre || cliente.email || 'Sin identificar';
  }

  return 'Sin identificar';
}

export const AdminPage = () => {
  const [productos, setProductos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [tabActiva, setTabActiva] = useState('dashboard');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const [formulario, setFormulario] = useState({
    ...FORMULARIO_INICIAL
  });

  const [categorias, setCategorias] = useState(
    CATEGORIAS_INICIALES
  );
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  useEffect(() => {
    const catalogo = obtenerProductos();

    setProductos(catalogo);
    setOrdenes(leerOrdenes());

    setCategorias((actuales) => [
      ...new Set([
        ...actuales,
        ...catalogo.map((p) => p.categoria).filter(Boolean)
      ])
    ]);
  }, []);

  const actualizarCampo = (campo, valor) => {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  };

  const limpiarFormulario = () => {
    setFormulario({ ...FORMULARIO_INICIAL });
    setEditandoId(null);
    setError('');
  };

  const cambiarPestana = (pestana) => {
    setTabActiva(pestana);
    setError('');
    setMensaje('');

    if (pestana === 'ordenes' || pestana === 'dashboard') {
      setOrdenes(leerOrdenes());
    }
  };

  const handleGuardarProducto = (e) => {
    e.preventDefault();

    const {
      titulo,
      precio,
      stock,
      categoria,
      imagen,
      descripcion,
      oferta,
      descuento
    } = formulario;

    const precioNumero = Number(precio);
    const stockNumero = Number(stock);
    const descuentoNumero = Number(descuento);

    if (!titulo.trim() || !categoria.trim()) {
      setError('El título y la categoría son obligatorios.');
      return;
    }

    if (
      precio.trim() === '' ||
      !Number.isFinite(precioNumero) ||
      precioNumero <= 0
    ) {
      setError('El precio debe ser mayor que cero.');
      return;
    }

    if (
      stock.trim() === '' ||
      !Number.isInteger(stockNumero) ||
      stockNumero < 0
    ) {
      setError('El stock debe ser un entero mayor o igual a cero.');
      return;
    }

    if (
      oferta &&
      (
        descuento.trim() === '' ||
        !Number.isFinite(descuentoNumero) ||
        descuentoNumero < 0 ||
        descuentoNumero > 100
      )
    ) {
      setError('El descuento debe estar entre 0 y 100.');
      return;
    }

    const datosProducto = {
      titulo: titulo.trim(),
      precio: precioNumero,
      stock: stockNumero,
      categoria: categoria.trim(),
      imagen: imagen.trim(),
      descripcion: descripcion.trim(),
      oferta,
      descuento: oferta ? descuentoNumero : 0
    };

    let nuevosProductos;

    if (editandoId !== null) {
      nuevosProductos = productos.map((producto) =>
        producto.id === editandoId
          ? { ...producto, ...datosProducto }
          : producto
      );
    } else {
      const nuevoId = productos.reduce(
        (maximo, producto) =>
          Math.max(maximo, Number(producto.id) || 0),
        0
      ) + 1;

      nuevosProductos = [
        ...productos,
        { id: nuevoId, ...datosProducto }
      ];
    }

    guardarProductos(nuevosProductos);
    setProductos(nuevosProductos);

    setMensaje(
      editandoId !== null
        ? 'Libro actualizado correctamente.'
        : 'Libro creado correctamente.'
    );

    limpiarFormulario();
  };

  const handleEditar = (producto) => {
    setEditandoId(producto.id);

    setFormulario({
      titulo: producto.titulo ?? '',
      precio: String(producto.precio ?? ''),
      stock: String(producto.stock ?? 10),
      categoria: producto.categoria || 'Fantasía',
      imagen: producto.imagen ?? '',
      descripcion: producto.descripcion ?? '',
      oferta: Boolean(producto.oferta),
      descuento: String(producto.descuento ?? 0)
    });

    setError('');
    setMensaje('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = (id) => {
    if (!window.confirm('¿Deseas eliminar este libro?')) {
      return;
    }

    const nuevosProductos = productos.filter(
      (producto) => producto.id !== id
    );

    guardarProductos(nuevosProductos);
    setProductos(nuevosProductos);

    if (editandoId === id) {
      limpiarFormulario();
    }

    setMensaje('Libro eliminado correctamente.');
  };

  const handleAgregarCategoria = (e) => {
    e.preventDefault();

    const nombre = nuevaCategoria.trim();

    if (!nombre) {
      setError('Ingresa un nombre de categoría.');
      return;
    }

    const existe = categorias.some(
      (categoria) =>
        categoria.toLowerCase() === nombre.toLowerCase()
    );

    if (existe) {
      setError('Esta categoría ya existe.');
      return;
    }

    setCategorias((actuales) => [...actuales, nombre]);
    setNuevaCategoria('');
    setError('');
    setMensaje('Categoría agregada al panel.');
  };

  const productosStockCritico = productos.filter(
    (producto) =>
      Number.isFinite(Number(producto.stock)) &&
      Number(producto.stock) <= 5
  );

  const pestañas = [
    ['dashboard', 'Dashboard'],
    ['productos', 'Productos'],
    ['categorias', 'Categorías'],
    ['usuarios', 'Usuarios'],
    ['ordenes', 'Órdenes y Boletas'],
    ['reportes', `Reportes (${productosStockCritico.length})`]
  ];

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1>Panel de Administración</h1>
        <p className="text-muted">
          Gestión de la librería Relatos & Páginas
        </p>
      </header>

      <nav
        className="d-flex flex-wrap gap-2 mb-4"
        aria-label="Secciones de administración"
      >
        {pestañas.map(([clave, etiqueta]) => (
          <button
            key={clave}
            type="button"
            className={
              tabActiva === clave
                ? 'btn btn-primary'
                : 'btn btn-outline-primary'
            }
            onClick={() => cambiarPestana(clave)}
          >
            {etiqueta}
          </button>
        ))}
      </nav>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {mensaje && (
        <div className="alert alert-success" role="status">
          {mensaje}
        </div>
      )}

      {tabActiva === 'dashboard' && (
        <section>
          <h2 className="h4 mb-3">Métricas principales</h2>

          <div className="row g-3">
            {[
              ['Total de libros', productos.length],
              ['Total de órdenes', ordenes.length],
              ['Usuarios de demostración', USUARIOS_DEMO.length],
              ['Stock crítico', productosStockCritico.length]
            ].map(([etiqueta, valor]) => (
              <div className="col-12 col-sm-6 col-lg-3" key={etiqueta}>
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="h6">{etiqueta}</h3>
                    <p className="fs-3 fw-bold mb-0">
                      {valor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tabActiva === 'productos' && (
        <section>
          <h2 className="h4 mb-3">Gestión de libros</h2>

          <form
            onSubmit={handleGuardarProducto}
            className="card card-body mb-4"
          >
            <h3 className="h5">
              {editandoId !== null
                ? 'Editar libro'
                : 'Agregar nuevo libro'}
            </h3>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="admin-titulo">
                  Título
                </label>
                <input
                  id="admin-titulo"
                  className="form-control"
                  placeholder="Título del libro"
                  value={formulario.titulo}
                  onChange={(e) =>
                    actualizarCampo('titulo', e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label" htmlFor="admin-precio">
                  Precio
                </label>
                <input
                  id="admin-precio"
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Precio"
                  value={formulario.precio}
                  onChange={(e) =>
                    actualizarCampo('precio', e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label" htmlFor="admin-stock">
                  Stock
                </label>
                <input
                  id="admin-stock"
                  type="number"
                  min="0"
                  step="1"
                  className="form-control"
                  placeholder="Stock"
                  value={formulario.stock}
                  onChange={(e) =>
                    actualizarCampo('stock', e.target.value)
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label" htmlFor="admin-categoria">
                  Categoría
                </label>
                <select
                  id="admin-categoria"
                  className="form-select"
                  value={formulario.categoria}
                  onChange={(e) =>
                    actualizarCampo('categoria', e.target.value)
                  }
                >
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-8">
                <label className="form-label" htmlFor="admin-imagen">
                  Ruta de imagen
                </label>
                <input
                  id="admin-imagen"
                  className="form-control"
                  placeholder="/img/libro.jpg"
                  value={formulario.imagen}
                  onChange={(e) =>
                    actualizarCampo('imagen', e.target.value)
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label" htmlFor="admin-descripcion">
                  Descripción
                </label>
                <textarea
                  id="admin-descripcion"
                  className="form-control"
                  rows="3"
                  placeholder="Descripción del libro"
                  value={formulario.descripcion}
                  onChange={(e) =>
                    actualizarCampo('descripcion', e.target.value)
                  }
                />
              </div>

              <div className="col-md-4">
                <div className="form-check mt-2">
                  <input
                    id="admin-oferta"
                    type="checkbox"
                    className="form-check-input"
                    checked={formulario.oferta}
                    onChange={(e) =>
                      actualizarCampo('oferta', e.target.checked)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="admin-oferta"
                  >
                    Libro en oferta
                  </label>
                </div>
              </div>

              {formulario.oferta && (
                <div className="col-md-4">
                  <label
                    className="form-label"
                    htmlFor="admin-descuento"
                  >
                    Descuento (%)
                  </label>
                  <input
                    id="admin-descuento"
                    type="number"
                    min="0"
                    max="100"
                    className="form-control"
                    placeholder="Descuento (%)"
                    value={formulario.descuento}
                    onChange={(e) =>
                      actualizarCampo('descuento', e.target.value)
                    }
                  />
                </div>
              )}
            </div>

            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-success">
                {editandoId !== null
                  ? 'Guardar Cambios'
                  : 'Crear Producto'}
              </button>

              {editandoId !== null && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr
                    key={producto.id}
                    data-testid="fila-producto"
                  >
                    <td>{producto.titulo}</td>
                    <td>{formatoPrecio(producto.precio)}</td>
                    <td>{producto.stock ?? 10}</td>
                    <td>{producto.categoria || 'Sin categoría'}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-warning"
                          onClick={() => handleEditar(producto)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(producto.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {productos.length === 0 && (
            <p>No hay libros registrados.</p>
          )}
        </section>
      )}

      {tabActiva === 'categorias' && (
        <section>
          <h2 className="h4 mb-3">Gestión de categorías</h2>

          <form
            onSubmit={handleAgregarCategoria}
            className="d-flex flex-wrap gap-2 mb-3"
          >
            <input
              className="form-control"
              style={{ maxWidth: '320px' }}
              placeholder="Nueva categoría"
              aria-label="Nueva categoría"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
            />

            <button type="submit" className="btn btn-success">
              Agregar Categoría
            </button>
          </form>

          <ul className="list-group">
            {categorias.map((categoria) => (
              <li className="list-group-item" key={categoria}>
                {categoria}
              </li>
            ))}
          </ul>

          <p className="text-muted mt-3">
            Las categorías nuevas se mantienen durante esta sesión
            del panel. Su persistencia se implementará después.
          </p>
        </section>
      )}

      {tabActiva === 'usuarios' && (
        <section>
          <h2 className="h4 mb-3">
            Usuarios y perfiles de demostración
          </h2>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {USUARIOS_DEMO.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tabActiva === 'ordenes' && (
        <section>
          <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
            <h2 className="h4 mb-0">
              Órdenes e historial de compras
            </h2>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setOrdenes(leerOrdenes())}
            >
              Actualizar órdenes
            </button>
          </div>

          {ordenes.length === 0 ? (
            <p>No hay compras registradas todavía.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Nº orden</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado de pago</th>
                    <th>Estado del pedido</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.map((orden) => (
                    <tr key={orden.id}>
                      <td>{orden.id}</td>
                      <td>
                        {obtenerNombreCliente(orden.cliente)}
                      </td>
                      <td>{orden.fecha || 'Sin fecha'}</td>
                      <td>{formatoPrecio(orden.total)}</td>
                      <td>{orden.estadoPago || 'Sin estado'}</td>
                      <td>{orden.estadoPedido || 'Sin estado'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {tabActiva === 'reportes' && (
        <section>
          <h2 className="h4 mb-3">
            Reporte de stock crítico (5 unidades o menos)
          </h2>

          {productosStockCritico.length === 0 ? (
            <p>No hay libros con stock crítico.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Stock actual</th>
                    <th>Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {productosStockCritico.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.titulo}</td>
                      <td className="text-danger fw-bold">
                        {producto.stock}
                      </td>
                      <td>{producto.categoria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
};
