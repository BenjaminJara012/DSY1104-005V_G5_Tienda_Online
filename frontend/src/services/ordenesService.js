
const CLAVE_ORDENES = "ordenesLibreria";

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
