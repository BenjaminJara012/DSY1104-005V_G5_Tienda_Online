
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
  calcularTotalCarrito
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

  // Persistir el carrito
  useEffect(() => {
    localStorage.setItem(
      "carritoLibreria",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  // Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito((anterior) =>
      agregarProducto(anterior, producto)
    );
  };

  // Eliminar producto
  const eliminarDelCarrito = (id) => {
    setCarrito((anterior) =>
      eliminarProducto(anterior, id)
    );
  };

  // Cambiar cantidad
  const cambiarCantidad = (id, cantidad) => {
    setCarrito((anterior) =>
      modificarCantidad(anterior, id, cantidad)
    );
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito(vaciarProductos());
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
        totalCarrito
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
