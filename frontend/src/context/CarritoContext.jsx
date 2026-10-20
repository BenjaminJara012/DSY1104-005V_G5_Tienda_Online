
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

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

  // Guardar los cambios del carrito
  useEffect(() => {
    localStorage.setItem(
      "carritoLibreria",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  // Agregar un producto
  const agregarAlCarrito = (producto) => {
    setCarrito((anterior) => {
      const existe = anterior.find(
        (item) => item.id === producto.id
      );

      if (existe) {
        return anterior.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...anterior,
        { ...producto, cantidad: 1 }
      ];
    });
  };

  // Eliminar un producto
  const eliminarDelCarrito = (id) => {
    setCarrito((anterior) =>
      anterior.filter((item) => item.id !== id)
    );
  };

  // Cambiar la cantidad
  const cambiarCantidad = (id, cantidad) => {
    const nuevaCantidad = Number(cantidad);

    if (!Number.isInteger(nuevaCantidad) || nuevaCantidad < 1) {
      return;
    }

    setCarrito((anterior) =>
      anterior.map((item) =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  // Vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular cantidad total de unidades
  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  // Calcular precio total
  const totalCarrito = carrito.reduce(
    (total, item) =>
      total + item.precio * item.cantidad,
    0
  );

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
