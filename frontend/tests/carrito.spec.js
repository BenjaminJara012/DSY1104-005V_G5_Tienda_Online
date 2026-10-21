
import {
  agregarProducto,
  eliminarProducto,
  modificarCantidad,
  vaciarProductos,
  calcularCantidadTotal,
  calcularTotalCarrito
} from "../src/services/carritoService.js";

describe("Carrito de compras", () => {

  const producto = {
    id: 1,
    titulo: "Harry Potter",
    precio: 20000,
    oferta: true,
    descuento: 25
  };

  it("debe agregar un producto al carrito", () => {
    const carrito = agregarProducto([], producto);

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(1);
    expect(carrito[0].precio).toBe(15000);
  });

  it("debe aumentar la cantidad de un producto existente", () => {
    let carrito = agregarProducto([], producto);

    carrito = agregarProducto(carrito, producto);

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  it("debe modificar la cantidad de un producto", () => {
    let carrito = agregarProducto([], producto);

    carrito = modificarCantidad(carrito, 1, 3);

    expect(carrito[0].cantidad).toBe(3);
  });

  it("debe eliminar un producto del carrito", () => {
    let carrito = agregarProducto([], producto);

    carrito = eliminarProducto(carrito, 1);

    expect(carrito.length).toBe(0);
  });

  it("debe calcular el total con descuento", () => {
    let carrito = agregarProducto([], producto);

    carrito = modificarCantidad(carrito, 1, 2);

    const total = calcularTotalCarrito(carrito);
    const cantidad = calcularCantidadTotal(carrito);

    expect(total).toBe(30000);
    expect(cantidad).toBe(2);
  });

  it("debe vaciar el carrito completamente", () => {
    const carrito = agregarProducto([], producto);

    const resultado = vaciarProductos();

    expect(carrito.length).toBe(1);
    expect(resultado).toEqual([]);
  });

});
