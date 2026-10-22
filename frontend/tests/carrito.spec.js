
import {
  agregarProducto,
  eliminarProducto,
  modificarCantidad,
  vaciarProductos,
  calcularCantidadTotal,
  calcularTotalCarrito
} from "../src/services/carritoService.js";

import {
  calcularPrecioFinal,
  obtenerProductos
} from "../src/services/productosService.js";

describe("Carrito de compras", () => {

  const producto = {
    id: 1,
    titulo: "Harry Potter",
    precio: 20000,
    oferta: true,
    descuento: 25
  };

  it("debe agregar un producto al carrito", () => {
    const productoCatalogo = obtenerProductos().find(
      (item) => item.id === producto.id
    );

    const precioEsperado = calcularPrecioFinal(productoCatalogo);

    const carrito = agregarProducto([], producto);

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(1);
    expect(carrito[0].precio).toBe(precioEsperado);
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
    const productoCatalogo = obtenerProductos().find(
      (item) => item.id === producto.id
    );

    const precioEsperado = calcularPrecioFinal(productoCatalogo);

    let carrito = agregarProducto([], producto);

    carrito = modificarCantidad(carrito, producto.id, 2);

    const total = calcularTotalCarrito(carrito);
    const cantidad = calcularCantidadTotal(carrito);

    expect(total).toBe(precioEsperado * 2);
    expect(cantidad).toBe(2);
  });

  it("debe vaciar el carrito completamente", () => {
    const carrito = agregarProducto([], producto);

    const resultado = vaciarProductos();

    expect(carrito.length).toBe(1);
    expect(resultado).toEqual([]);
  });

});
