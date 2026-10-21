import React, { useState, useEffect } from 'react';
import { obtenerProductos, guardarProductos } from '../../services/productosService';

export const AdminPage = () => {
  const [productos, setProductos] = useState([]);
  const [tabActiva, setTabActiva] = useState('productos');
  const [error, setError] = useState(''); // <-- Esta línea faltaba o estaba mal nombrada
  const [editandoId, setEditandoId] = useState(null);

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('10');
  const [categoria, setCategoria] = useState('Ropa');

  const [categorias, setCategorias] = useState(['Ropa', 'Calzado', 'Accesorios', 'Electrónica']);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [usuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Cliente' },
    { id: 2, nombre: 'María Gómez', email: 'maria@example.com', rol: 'Administrador' }
  ]);
  const [ordenes] = useState([
    { id: 'ORD-001', cliente: 'Juan Pérez', total: 30000, fecha: '2025-05-10', estado: 'Completada' },
    { id: 'ORD-002', cliente: 'Ana Silva', total: 45000, fecha: '2025-05-11', estado: 'Pendiente' }
  ]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const handleGuardarProducto = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !precio) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setError('');
    let nuevosProd;

    if (editandoId) {
      nuevosProd = productos.map((p) =>
        p.id === editandoId ? { ...p, nombre, precio: Number(precio), stock: Number(stock), categoria } : p
      );
      setEditandoId(null);
    } else {
      const nuevo = {
        id: Date.now(),
        nombre,
        precio: Number(precio),
        stock: Number(stock),
        categoria
      };
      nuevosProd = [...productos, nuevo];
    }

    setProductos(nuevosProd);
    guardarProductos(nuevosProd);
    setNombre('');
    setPrecio('');
    setStock('10');
  };

  const handleEditar = (p) => {
    setEditandoId(p.id);
    setNombre(p.nombre);
    setPrecio(p.precio);
    setStock(p.stock);
    setCategoria(p.categoria || 'Ropa');
    setError('');
  };

  const handleEliminar = (id) => {
    const nuevosProd = productos.filter((p) => p.id !== id);
    setProductos(nuevosProd);
    guardarProductos(nuevosProd);
  };

  const handleAgregarCategoria = (e) => {
    e.preventDefault();
    if (nuevaCategoria.trim() && !categorias.includes(nuevaCategoria.trim())) {
      setCategorias([...categorias, nuevaCategoria.trim()]);
      setNuevaCategoria('');
    }
  };

  const productosStockCritico = productos.filter((p) => p.stock <= 5);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Panel de Administración</h1>
    
      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        <button onClick={() => setTabActiva('dashboard')} style={{ padding: '8px 16px', fontWeight: tabActiva === 'dashboard' ? 'bold' : 'normal' }}>Dashboard</button>
        <button onClick={() => setTabActiva('productos')} style={{ padding: '8px 16px', fontWeight: tabActiva === 'productos' ? 'bold' : 'normal' }}>Productos</button>
        <button onClick={() => setTabActiva('categorias')} style={{ padding: '8px 16px', fontWeight: tabActiva === 'categorias' ? 'bold' : 'normal' }}>Categorías</button>
        <button onClick={() => setTabActiva('usuarios')} style={{ padding: '8px 16px', fontWeight: tabActiva === 'usuarios' ? 'bold' : 'normal' }}>Usuarios</button>
        <button onClick={() => setTabActiva('ordenes')} style={{ padding: '8px 16px', fontWeight: tabActiva === 'ordenes' ? 'bold' : 'normal' }}>Órdenes y Boletas</button>
        <button onClick={() => setTabActiva('reportes')} style={{ padding: '8px 16px', fontWeight: tabActiva === 'reportes' ? 'bold' : 'normal' }}>Reportes ({productosStockCritico.length})</button>
      </nav>

      {tabActiva === 'dashboard' && (
        <div>
          <h2>Métricas Principales</h2>
          <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '150px' }}>
              <h3>Total Productos</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{productos.length}</p>
            </div>
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '150px' }}>
              <h3>Total Órdenes</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{ordenes.length}</p>
            </div>
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', minWidth: '150px' }}>
              <h3>Usuarios Registrados</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{usuarios.length}</p>
            </div>
            <div style={{ padding: '20px', border: '1px solid #e74c3c', color: '#c0392b', borderRadius: '8px', minWidth: '150px' }}>
              <h3>Stock Crítico</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{productosStockCritico.length}</p>
            </div>
          </div>
        </div>
      )}

      {tabActiva === 'productos' && (
        <div>
          <h2>Gestión de Productos</h2>

          {error && (
            <div role="alert" style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleGuardarProducto} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button type="submit">{editandoId ? 'Guardar Cambios' : 'Crear Producto'}</button>
          </form>

          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} data-testid="fila-producto">
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>{p.categoria || 'Sin categoría'}</td>
                  <td>
                    <button onClick={() => handleEditar(p)} style={{ marginRight: '5px' }}>Editar</button>
                    <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabActiva === 'categorias' && (
        <div>
          <h2>Gestión de Categorías</h2>
          <form onSubmit={handleAgregarCategoria} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Nueva categoría"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
            />
            <button type="submit">Agregar Categoría</button>
          </form>
          <ul>
            {categorias.map((cat) => (
              <li key={cat} style={{ marginBottom: '5px' }}>{cat}</li>
            ))}
          </ul>
        </div>
      )}

      {tabActiva === 'usuarios' && (
        <div>
          <h2>Gestión de Usuarios y Perfiles</h2>
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabActiva === 'ordenes' && (
        <div>
          <h2>Órdenes, Boletas e Historial de Compras</h2>
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Nº Orden</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.cliente}</td>
                  <td>{o.fecha}</td>
                  <td>${o.total}</td>
                  <td>{o.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tabActiva === 'reportes' && (
        <div>
          <h2>Reporte de Productos con Stock Crítico (≤ 5 unidades)</h2>
          {productosStockCritico.length === 0 ? (
            <p>No hay productos con stock crítico en este momento.</p>
          ) : (
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Stock Actual</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>
                {productosStockCritico.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td style={{ color: 'red', fontWeight: 'bold' }}>{p.stock}</td>
                    <td>{p.categoria || 'Sin categoría'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};