const KEY_PRODUCTOS = 'productos_tienda';

const productosIniciales = [
  { id: 1, nombre: 'Polera Manga Larga', precio: 15000, stock: 10, categoria: 'Ropa' },
  { id: 2, nombre: 'Zapatillas Urbanas', precio: 45000, stock: 5, categoria: 'Calzado' },
];

export const obtenerProductos = () => {
  const data = localStorage.getItem(KEY_PRODUCTOS);
  if (!data) {
    localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(productosIniciales));
    return productosIniciales;
  }
  return JSON.parse(data);
};

export const guardarProductos = (productos) => {
  localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(productos));
};