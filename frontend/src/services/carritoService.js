
import {
  calcularPrecioFinal,
  obtenerProductos
} from "./productosService";

// Consultar el stock actualizado del catálogo
export function obtenerStockDisponible(id) {
  const producto = obtenerProductos().find(
    (item) => item.id === id
  );

  if (!producto) return 0;

  const stock = Number(producto.stock);

  return Number.isInteger(stock) && stock >= 0
    ? stock
    : 0;
}

// Agregar un producto al carrito
export function agregarProducto(carrito, producto) {
  const productoActual = obtenerProductos().find(
    (item) => item.id === producto.id
  );

  if (!productoActual) return carrito;

  const stockDisponible = obtenerStockDisponible(producto.id);

  const existe = carrito.find(
    (item) => item.id === producto.id
  );

  const cantidadActual = existe ? existe.cantidad : 0;

  if (cantidadActual >= stockDisponible) {
    return carrito;
  }

  const productoConPrecioFinal = {
    ...productoActual,
    precioOriginal: productoActual.precio,
    precio: calcularPrecioFinal(productoActual)
  };

  if (existe) {
    return carrito.map((item) =>
      item.id === producto.id
        ? {
            ...productoConPrecioFinal,
            cantidad: item.cantidad + 1
          }
        : item
    );
  }

  return [
    ...carrito,
    { ...productoConPrecioFinal, cantidad: 1 }
  ];
}

// Eliminar un producto del carrito
export function eliminarProducto(carrito, id) {
  return carrito.filter((item) => item.id !== id);
}

// Modificar cantidad respetando el stock
export function modificarCantidad(carrito, id, cantidad) {
  const nuevaCantidad = Number(cantidad);

  if (
    !Number.isInteger(nuevaCantidad) ||
    nuevaCantidad < 1
  ) {
    return carrito;
  }

  const stockDisponible = obtenerStockDisponible(id);

  if (nuevaCantidad > stockDisponible) {
    return carrito;
  }

  return carrito.map((item) =>
    item.id === id
      ? { ...item, cantidad: nuevaCantidad }
      : item
  );
}

// Vaciar carrito
export function vaciarProductos() {
  return [];
}

// Calcular cantidad total
export function calcularCantidadTotal(carrito) {
  return carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );
}

// Calcular total del carrito
export function calcularTotalCarrito(carrito) {
  return carrito.reduce(
    (total, item) =>
      total + item.precio * item.cantidad,
    0
  );
}
