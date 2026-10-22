
import {
  obtenerOrdenes,
  guardarOrden
} from "../src/services/ordenesService.js";

describe("Registro de órdenes", () => {
  const clave = "ordenesLibreria";
  let datosOriginales;

  const crearOrden = (id) => ({
    id,
    fecha: "2026-10-20T12:00:00.000Z",
    cliente: {
      nombre: "Cliente Prueba",
      email: "cliente@ejemplo.cl"
    },
    productos: [
      {
        id: 1,
        titulo: "Harry Potter",
        precio: 15000,
        cantidad: 1,
        subtotal: 15000
      }
    ],
    total: 15000,
    estadoPago: "aprobado",
    estadoPedido: "pendiente"
  });

  beforeEach(() => {
    datosOriginales = localStorage.getItem(clave);
    localStorage.removeItem(clave);
  });

  afterEach(() => {
    if (datosOriginales === null) {
      localStorage.removeItem(clave);
    } else {
      localStorage.setItem(clave, datosOriginales);
    }
  });

  it("debe devolver un arreglo vacío si no existen órdenes", () => {
    expect(obtenerOrdenes()).toEqual([]);
  });

  it("debe guardar una orden correctamente", () => {
    const orden = crearOrden("ORD-TEST-001");

    guardarOrden(orden);

    const resultado = obtenerOrdenes();

    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe("ORD-TEST-001");
    expect(resultado[0].total).toBe(15000);
  });

  it("debe conservar las órdenes anteriores", () => {
    guardarOrden(crearOrden("ORD-TEST-001"));
    guardarOrden(crearOrden("ORD-TEST-002"));

    const resultado = obtenerOrdenes();

    expect(resultado.length).toBe(2);
    expect(resultado[0].id).toBe("ORD-TEST-001");
    expect(resultado[1].id).toBe("ORD-TEST-002");
  });

  it("debe recuperar los datos de una orden guardada", () => {
    guardarOrden(crearOrden("ORD-TEST-003"));

    const resultado = obtenerOrdenes();
    const orden = resultado[0];

    expect(orden.cliente.nombre).toBe("Cliente Prueba");
    expect(orden.productos[0].precio).toBe(15000);
    expect(orden.estadoPago).toBe("aprobado");
    expect(orden.estadoPedido).toBe("pendiente");
  });
});
