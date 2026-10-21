
import {
  calcularPrecioFinal,
  obtenerProductos,
  obtenerCategorias,
  obtenerProductosPorCategoria,
  obtenerProductosEnOferta,
  buscarProductos
} from "../src/services/productosService.js";


//Grupo de test 1
describe("Cálculo de precios de productos", () => {

  it("debe mantener el precio cuando no hay oferta", () => {
    const producto = {
      precio: 20000,
      oferta: false,
      descuento: 0
    };

    const resultado = calcularPrecioFinal(producto);

    expect(resultado).toBe(20000);
  });

  it("debe aplicar correctamente un descuento del 25%", () => {
    const producto = {
      precio: 20000,
      oferta: true,
      descuento: 25
    };

    const resultado = calcularPrecioFinal(producto);

    expect(resultado).toBe(15000);
  });

  it("debe impedir descuentos mayores al 100%", () => {
    const producto = {
      precio: 20000,
      oferta: true,
      descuento: 150
    };

    const resultado = calcularPrecioFinal(producto);

    expect(resultado).toBe(0);
  });

  it("debe impedir descuentos negativos", () => {
    const producto = {
      precio: 20000,
      oferta: true,
      descuento: -20
    };

    const resultado = calcularPrecioFinal(producto);

    expect(resultado).toBe(20000);
  });

});


// Grupo de test 2
describe("Filtros y búsqueda de productos", () => {

  beforeEach(() => {
    // Evita que productos guardados anteriormente
    // alteren los resultados de estas pruebas.
    localStorage.removeItem("productosLibreria");
  });

  it("debe filtrar los libros de Fantasía", () => {
    const productos =
      obtenerProductosPorCategoria("Fantasía");

    expect(productos.length).toBe(3);

    productos.forEach((producto) => {
      expect(producto.categoria).toBe("Fantasía");
    });
  });

  it("debe filtrar los libros de Romance", () => {
    const productos =
      obtenerProductosPorCategoria("Romance");

    expect(productos.length).toBe(4);
  });

  it("debe filtrar los libros de Terror", () => {
    const productos =
      obtenerProductosPorCategoria("Terror");

    expect(productos.length).toBe(3);
  });

  it("debe mostrar solamente productos en oferta", () => {
    const productos = obtenerProductosEnOferta();

    expect(productos.length).toBe(5);

    productos.forEach((producto) => {
      expect(producto.oferta).toBe(true);
      expect(producto.descuento).toBeGreaterThan(0);
    });
  });

  it("debe buscar productos sin distinguir mayúsculas", () => {
    const productos = buscarProductos("HARRY POTTER");

    expect(productos.length).toBe(3);
  });

  it("debe devolver un arreglo vacío si no hay coincidencias", () => {
    const productos = buscarProductos("Libro inexistente");

    expect(productos).toEqual([]);
  });

});


describe("Almacenamiento y recuperación de productos", () => {

  let productosOriginales;

  beforeEach(() => {

    productosOriginales =
      localStorage.getItem("productosLibreria");

    localStorage.removeItem("productosLibreria");
  });

  afterEach(() => {
    if (productosOriginales === null) {
      localStorage.removeItem("productosLibreria");
    } else {
      localStorage.setItem(
        "productosLibreria",
        productosOriginales
      );
    }
  });

  it("debe recuperar los 10 productos iniciales si no hay datos guardados", () => {
    const productos = obtenerProductos();

    expect(productos.length).toBe(10);
    expect(productos[0].titulo)
      .toBe("Harry Potter y la Piedra Filosofal");
  });

  it("debe recuperar productos guardados en localStorage", () => {
    const productosGuardados = [
      {
        id: 100,
        titulo: "Libro agregado por administración",
        precio: 12000,
        categoria: "Ciencia ficción",
        oferta: false,
        descuento: 0
      }
    ];

    localStorage.setItem(
      "productosLibreria",
      JSON.stringify(productosGuardados)
    );

    const productos = obtenerProductos();

    expect(productos.length).toBe(1);
    expect(productos[0].id).toBe(100);
    expect(productos[0].titulo)
      .toBe("Libro agregado por administración");
  });

  it("debe recuperar los productos iniciales si el JSON está corrupto", () => {
    spyOn(console, "error");

    localStorage.setItem(
      "productosLibreria",
      "{datos-invalidos"
    );

    const productos = obtenerProductos();

    expect(productos.length).toBe(10);
    expect(console.error).toHaveBeenCalled();
  });

  it("debe recuperar los productos iniciales si los datos no son un arreglo", () => {
    localStorage.setItem(
      "productosLibreria",
      JSON.stringify({ mensaje: "incorrecto" })
    );

    const productos = obtenerProductos();

    expect(productos.length).toBe(10);
  });

  it("debe completar las propiedades faltantes de un producto original", () => {
    localStorage.setItem(
      "productosLibreria",
      JSON.stringify([
        {
          id: 1,
          titulo: "Harry Potter actualizado",
          precio: 19990
        }
      ])
    );

    const productos = obtenerProductos();

    expect(productos.length).toBe(1);
    expect(productos[0].titulo)
      .toBe("Harry Potter actualizado");

    expect(productos[0].categoria)
      .toBe("Fantasía");

    expect(productos[0].oferta)
      .toBe(true);

    expect(productos[0].descuento)
      .toBe(15);
  });

  it("debe utilizar valores predeterminados para productos nuevos sin categoría ni oferta", () => {
    localStorage.setItem(
      "productosLibreria",
      JSON.stringify([
        {
          id: 200,
          titulo: "Producto nuevo",
          precio: 5000
        }
      ])
    );

    const productos = obtenerProductos();

    expect(productos[0].categoria).toBe("");
    expect(productos[0].oferta).toBe(false);
    expect(productos[0].descuento).toBe(0);
  });

  it("debe obtener las categorías disponibles sin duplicados", () => {
    const categorias = obtenerCategorias();

    expect(categorias.length).toBe(3);
    expect(categorias).toContain("Fantasía");
    expect(categorias).toContain("Romance");
    expect(categorias).toContain("Terror");
  });

  it("debe devolver un arreglo vacío de categorías cuando no hay productos", () => {
    localStorage.setItem(
      "productosLibreria",
      JSON.stringify([])
    );

    const categorias = obtenerCategorias();

    expect(categorias).toEqual([]);
  });

});



