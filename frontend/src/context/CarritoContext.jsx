
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  agregarProducto,
  eliminarProducto,
  modificarCantidad,
  vaciarProductos,
  calcularCantidadTotal,
  calcularTotalCarrito,
  obtenerStockDisponible
} from "../services/carritoService";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carritoLibreria");
      const datos = guardado ? JSON.parse(guardado) : [];

      return Array.isArray(datos) ? datos : [];
    } catch {
      return [];
    }
  });

  const [mensajeStock, setMensajeStock] = useState("");

  // Persistir carrito
  useEffect(() => {
    localStorage.setItem(
      "carritoLibreria",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  // Agregar producto con validación
  const agregarAlCarrito = (producto) => {
    const stockDisponible = obtenerStockDisponible(producto.id);

    const productoExistente = carrito.find(
      (item) => item.id === producto.id
    );

    const cantidadActual = productoExistente
      ? productoExistente.cantidad
      : 0;

    if (cantidadActual >= stockDisponible) {
      setMensajeStock(
        stockDisponible === 0
          ? `El libro "${producto.titulo}" está agotado.`
          : `Solo hay ${stockDisponible} unidades disponibles de "${producto.titulo}".`
      );

      return false;
    }

    setCarrito((anterior) =>
      agregarProducto(anterior, producto)
    );

    setMensajeStock("");
    return true;
  };

  // Eliminar producto
  const eliminarDelCarrito = (id) => {
    setCarrito((anterior) =>
      eliminarProducto(anterior, id)
    );

    setMensajeStock("");
  };

  // Cambiar cantidad con validación
  const cambiarCantidad = (id, cantidad) => {
    const stockDisponible = obtenerStockDisponible(id);
    const nuevaCantidad = Number(cantidad);

    if (
      Number.isInteger(nuevaCantidad) &&
      nuevaCantidad > stockDisponible
    ) {
      setMensajeStock(
        `No puedes superar el stock disponible (${stockDisponible} unidades).`
      );

      return false;
    }

    setCarrito((anterior) =>
      modificarCantidad(anterior, id, cantidad)
    );

    setMensajeStock("");
    return true;
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito(vaciarProductos());
    setMensajeStock("");
  };

  const cantidadTotal = calcularCantidadTotal(carrito);
  const totalCarrito = calcularTotalCarrito(carrito);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        cantidadTotal,
        totalCarrito,
        mensajeStock,
        limpiarMensajeStock: () => setMensajeStock("")
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error(
      "useCarrito debe utilizarse dentro de CarritoProvider"
    );
  }

  return context;
}
