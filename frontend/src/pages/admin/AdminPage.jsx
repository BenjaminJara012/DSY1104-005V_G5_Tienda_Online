import React, { useState, useEffect } from 'react';
import { obtenerProductos, guardarProductos } from '../../services/productosService';

export function AdminPage() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !precio) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setError('');

    if (editandoId) {

      const actualizados = productos.map((p) =>
        p.id === editandoId ? { ...p, nombre, precio: Number(precio) } : p
      );
      setProductos(actualizados);
      guardarProductos(actualizados);
      setEditandoId(null);
    } else {

      const nuevoProducto = {
        id: Date.now(),
        nombre,
        precio: Number(precio),
        stock: 10,
        categoria: 'General',
      };
      const actualizados = [...productos, nuevoProducto];
      setProductos(actualizados);
      guardarProductos(actualizados);
    }

    setNombre('');
    setPrecio('');
  };

  const handleEditar = (producto) => {
    setEditandoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  const handleEliminar = (id) => {
    const actualizados = productos.filter((p) => p.id !== id);
    setProductos(actualizados);
    guardarProductos(actualizados);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Panel de Administración - Gestión de Productos</h2>

      <form onSubmit={handleGuardar} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
        <h3>{editandoId ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
        
        {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

        <div style={{ marginBottom: '10px' }}>
          <label>Nombre: </label>
          <input
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Precio: </label>
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <button type="submit">{editandoId ? 'Guardar Cambios' : 'Crear Producto'}</button>
      </form>

      <h3>Lista de Productos</h3>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id} data-testid="fila-producto">
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>${prod.precio}</td>
              <td>
                <button onClick={() => handleEditar(prod)}>Editar</button>{' '}
                <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}