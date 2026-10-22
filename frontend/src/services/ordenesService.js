
import {
  obtenerProductos,
  calcularPrecioFinal
} from "./productosService";

const CLAVE_ORDENES = "ordenesLibreria";
const CLAVE_PRODUCTOS = "productosLibreria";

export function obtenerOrdenes() {
  try {
    const datos = localStorage.getItem(CLAVE_ORDENES);

    if (!datos) return [];

    const ordenes = JSON.parse(datos);
    return Array.isArray(ordenes) ? ordenes : [];
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    return [];
  }
}

export function guardarOrden(orden) {
  const ordenes = obtenerOrdenes();
  const nuevasOrdenes = [...ordenes, orden];

  localStorage.setItem(
    CLAVE_ORDENES,
    JSON.stringify(nuevasOrdenes)
  );

  return orden;
}

// Validar stock, registrar compra y actualizar inventario.
export function confirmarCompra(orden, carrito) {
  if (!Array.isArray(carrito) || carrito.length === 0) {
    throw new Error("El carrito está vacío.");
  }

  const productosActuales = obtenerProductos();

  // Comprobar cada producto contra el catálogo actualizado.
  for (const item of carrito) {
    const producto = productosActuales.find(
      (p) => p.id === item.id
    );

    if (!producto) {
      throw new Error(
        `El libro "${item.titulo}" ya no está disponible.`
      );
    }

    const stock = Number(producto.stock);
    const cantidad = Number(item.cantidad);

    if (
      !Number.isInteger(cantidad) ||
      cantidad < 1 ||
      !Number.isInteger(stock) ||
      stock < cantidad
    ) {
      throw new Error(
        `Stock insuficiente para "${producto.titulo}". ` +
        `Disponibles: ${Math.max(0, stock || 0)}.`
      );
    }
  }

  // Construir el detalle usando los precios actuales.
  const productosOrden = carrito.map((item) => {
    const producto = productosActuales.find(
      (p) => p.id === item.id
    );

    const precioFinal = calcularPrecioFinal(producto);

    return {
      id: producto.id,
      titulo: producto.titulo,
      precioOriginal: producto.precio,
      precio: precioFinal,
      cantidad: item.cantidad,
      subtotal: precioFinal * item.cantidad
    };
  });

  const total = productosOrden.reduce(
    (suma, producto) => suma + producto.subtotal,
    0
  );

  const ordenFinal = {
    ...orden,
    productos: productosOrden,
    total
  };

  // Descontar las unidades vendidas.
  const productosActualizados = productosActuales.map(
    (producto) => {
      const comprado = carrito.find(
        (item) => item.id === producto.id
      );

      if (!comprado) return producto;

      return {
        ...producto,
        stock: Number(producto.stock) - comprado.cantidad
      };
    }
  );

  // Guardar el estado anterior para poder restaurarlo.
  const productosAnteriores = localStorage.getItem(
    CLAVE_PRODUCTOS
  );

  try {
    localStorage.setItem(
      CLAVE_PRODUCTOS,
      JSON.stringify(productosActualizados)
    );

    guardarOrden(ordenFinal);

    return ordenFinal;
  } catch (error) {
    // Si falla el registro, intentar restaurar el inventario.
    try {
      if (productosAnteriores === null) {
        localStorage.removeItem(CLAVE_PRODUCTOS);
      } else {
        localStorage.setItem(
          CLAVE_PRODUCTOS,
          productosAnteriores
        );
      }
    } catch (errorRestauracion) {
      console.error(
        "No se pudo restaurar el inventario:",
        errorRestauracion
      );
    }

    console.error("Error al confirmar compra:", error);
    throw error;
  }
}
