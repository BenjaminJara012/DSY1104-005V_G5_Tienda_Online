
import { calcularPrecioFinal } from "./productosService";

// Agregar un producto al carrito
export function agregarProducto(carrito, producto) {
  const productoConPrecioFinal = {
    ...producto,
    precioOriginal: producto.precio,
    precio: calcularPrecioFinal(producto)
  };

  const existe = carrito.find(
    (item) => item.id === producto.id
  );

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

// Eliminar un producto
export function eliminarProducto(carrito, id) {
  return carrito.filter((item) => item.id !== id);
}

// Modificar cantidad
export function modificarCantidad(carrito, id, cantidad) {
  const nuevaCantidad = Number(cantidad);

  if (
    !Number.isInteger(nuevaCantidad) ||
    nuevaCantidad < 1
  ) {
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
