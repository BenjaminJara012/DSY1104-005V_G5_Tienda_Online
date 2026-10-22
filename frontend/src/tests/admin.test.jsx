
 // @vitest-environment jsdom

import React from "react";

import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi
} from "vitest";

import { AdminPage } from "../pages/admin/AdminPage";

const PRODUCTOS_PRUEBA = [
  {
    id: 1,
    titulo: "Harry Potter y la Piedra Filosofal",
    precio: 16990,
    stock: 10,
    categoria: "Fantasía",
    imagen: "/img/hp1.jpg",
    descripcion: "Primer libro de Harry Potter.",
    oferta: false,
    descuento: 0
  },
  {
    id: 2,
    titulo: "El Resplandor",
    precio: 13290,
    stock: 5,
    categoria: "Terror",
    imagen: "/img/king1.jpg",
    descripcion: "Novela de Stephen King.",
    oferta: false,
    descuento: 0
  }
];

async function abrirProductos() {
  fireEvent.click(
    screen.getByRole("button", {
      name: "Productos",
      exact: true
    })
  );

  await waitFor(() => {
    expect(
      screen.getAllByTestId("fila-producto")
    ).toHaveLength(2);
  });
}

describe("Pruebas unitarias - Administración de librería", () => {
  beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
      "productosLibreria",
      JSON.stringify(PRODUCTOS_PRUEBA)
    );

    vi.stubGlobal("scrollTo", vi.fn());
    vi.stubGlobal("confirm", vi.fn(() => true));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("6. Renderizar productos en la tabla administrativa", async () => {
    render(<AdminPage />);

    await abrirProductos();

    expect(
      screen.getByText("Harry Potter y la Piedra Filosofal")
    ).toBeInTheDocument();

    expect(
      screen.getByText("El Resplandor")
    ).toBeInTheDocument();
  });

  it("7. Crear un libro desde el formulario", async () => {
    render(<AdminPage />);

    await abrirProductos();

    fireEvent.change(
      screen.getByPlaceholderText("Título del libro"),
      {
        target: { value: "El Principito" }
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Precio"),
      {
        target: { value: "12990" }
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Crear Producto"
      })
    );

    expect(
      screen.getByText("El Principito")
    ).toBeInTheDocument();

    expect(
      screen.getAllByTestId("fila-producto")
    ).toHaveLength(3);

    const productosGuardados = JSON.parse(
      localStorage.getItem("productosLibreria")
    );

    expect(productosGuardados).toHaveLength(3);

    expect(
      productosGuardados.some(
        (producto) => producto.titulo === "El Principito"
      )
    ).toBe(true);
  });

  it("8. Modificar un libro y actualizar sus datos", async () => {
    render(<AdminPage />);

    await abrirProductos();

    const botonesEditar = screen.getAllByRole("button", {
      name: "Editar",
      exact: true
    });

    fireEvent.click(botonesEditar[0]);

    fireEvent.change(
      screen.getByPlaceholderText("Título del libro"),
      {
        target: { value: "Harry Potter - Edición Especial" }
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Guardar Cambios"
      })
    );

    expect(
      screen.getByText("Harry Potter - Edición Especial")
    ).toBeInTheDocument();

    const productosGuardados = JSON.parse(
      localStorage.getItem("productosLibreria")
    );

    expect(productosGuardados[0].titulo).toBe(
      "Harry Potter - Edición Especial"
    );
  });

  it("9. Eliminar un libro después de confirmar", async () => {
    render(<AdminPage />);

    await abrirProductos();

    const botonesEliminar = screen.getAllByRole("button", {
      name: "Eliminar",
      exact: true
    });

    fireEvent.click(botonesEliminar[0]);

    expect(window.confirm).toHaveBeenCalled();

    expect(
      screen.getAllByTestId("fila-producto")
    ).toHaveLength(1);

    expect(
      screen.queryByText("Harry Potter y la Piedra Filosofal")
    ).not.toBeInTheDocument();

    const productosGuardados = JSON.parse(
      localStorage.getItem("productosLibreria")
    );

    expect(productosGuardados).toHaveLength(1);
  });

  it("10. Mostrar un error cuando falta el título", async () => {
    render(<AdminPage />);

    await abrirProductos();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Crear Producto"
      })
    );

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent(
      "El título y la categoría son obligatorios."
    );

    expect(
      screen.getAllByTestId("fila-producto")
    ).toHaveLength(2);
  });
});
