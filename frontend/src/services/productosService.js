
const productosIniciales = [
  {
    id: 1,
    titulo: "Harry Potter y la Piedra Filosofal",
    precio: 16990,
    imagen: "/img/hp1.jpg",
    descripcion: "Novela de fantasía y aventuras escrita por J. K. Rowling que narra los inicios de un niño huérfano en el mundo de la magia.",
    categoria: 'Fantasía',
    oferta: true,
    descuento: 15,
    stock: 10
  },
  {
    id: 2,
    titulo: "Harry Potter y la Cámara Secreta",
    precio: 17500,
    imagen: "/img/hp2.jpg",
    descripcion: "Segunda parte de la historia de Harry Potter escrito por J. K. Rowling.",
    categoria: 'Fantasía',
    oferta: false,
    descuento: 0,
    stock: 10
  },
  {
    id: 3,
    titulo: "Harry Potter y el Prisionero de Azkaban",
    precio: 18990,
    imagen: "/img/hp3.jpg",
    descripcion: "Tercera entrega de la saga creada por J. K. Rowling, donde Harry cumple 13 años y enfrenta el regreso a Hogwarts en medio de una gran amenaza.",
    categoria: 'Fantasía',
    oferta: true,
    descuento: 10,
    stock: 10
  },
  {
    id: 4,
    titulo: "El Duque y Yo (Bridgerton 1)",
    precio: 14390,
    imagen: "/img/bridgerton1.jpg",
    descripcion: "Historia ambientada en la época de la Regencia en Londres y combina romance, humor y los enredos de la alta sociedad.",
    categoria: 'Romance',
    oferta: false,
    descuento: 0,
    stock: 10
  },
  {
    id: 5,
    titulo: "El Vizconde que me Amó (Bridgerton 2)",
    precio: 15990,
    imagen: "/img/bridgerton2.jpg",
    descripcion: "Segundo libro de la exitosa serie romántica histórica Los Bridgerton, escrita por Julia Quinn, donde Anthony Bridgerton decide buscar una esposa para cumplir con sus deberes nobiliarios.",
    categoria: 'Romance',
    oferta: true,
    descuento: 20,
    stock: 10
  },
  {
    id: 6,
    titulo: "Te Doy mi Corazón (Bridgerton 3)",
    precio: 15990,
    imagen: "/img/bridgerton3.jpg",
    descripcion: "Es el tercer libro de la famosa saga Los Bridgerton, y cuenta una romántica historia inspirada en el cuento de la Cenicienta.",
    categoria: 'Romance',
    oferta: false,
    descuento: 0,
    stock: 10
  },
  {
    id: 7,
    titulo: "El Resplandor",
    precio: 13290,
    imagen: "/img/king1.jpg",
    descripcion: "Novela de terror psicológico escrita por Stephen King.",
    categoria: 'Terror',
    oferta: true,
    descuento: 15,
    stock: 10
  },
  {
    id: 8,
    titulo: "It (Eso)",
    precio: 22990,
    imagen: "/img/king2.jpg",
    descripcion: "Novela de terror y horror sobrenatural escrita por Stephen King.",
    categoria: 'Terror',
    oferta: false,
    descuento: 0,
    stock: 10
  },
  {
    id: 9,
    titulo: "Carrie",
    precio: 11690,
    imagen: "/img/king3.jpg",
    descripcion: "Un clásico del género de terror escrito por Stephen King, que narra la adolescencia de una joven marginada con poderes telequinéticos.",
    categoria: 'Terror',
    oferta: true,
    descuento: 10,
    stock: 10
  },
  {
    id: 10,
    titulo: "Seduciendo a Mr. Bridgerton (Bridgerton 4)",
    precio: 16500,
    imagen: "/img/bridgerton4.jpg",
    descripcion: "Cuarto libro de la exitosa serie romántica Bridgerton escrita por Julia Quinn.",
    categoria: 'Romance',
    oferta: false,
    descuento: 0,
    stock: 10
  }
];


export function obtenerProductos() {
  const guardados = localStorage.getItem("productosLibreria");

  if (guardados !== null) {
    try {
      const productos = JSON.parse(guardados);

      if (Array.isArray(productos)) {
        return productos.map((producto) => {
          const inicial = productosIniciales.find(
            (item) => item.id === producto.id
          );

          return {
            categoria: inicial?.categoria ?? "",
            oferta: inicial?.oferta ?? false,
            descuento: inicial?.descuento ?? 0,
            stock: inicial?.stock ?? 10,
            ...producto
          };
        });
      }
    } catch {
      console.error("Error al recuperar productos.");
    }
  }

  return productosIniciales;
}



export function obtenerCategorias() {
  const productos = obtenerProductos();

  return [
    ...new Set(
      productos.map((producto) => producto.categoria)
        .filter(Boolean)
    )
  ];
}

export function obtenerProductosPorCategoria(categoria) {
  return obtenerProductos().filter(
    (producto) =>
      producto.categoria?.toLowerCase() ===
      categoria.toLowerCase()
  );
}

export function obtenerProductosEnOferta() {
  return obtenerProductos().filter(
    (producto) =>
      producto.oferta === true &&
      producto.descuento > 0
  );
}

export function buscarProductos(texto) {
  const busqueda = texto.trim().toLowerCase();

  return obtenerProductos().filter(
    (producto) =>
      producto.titulo.toLowerCase().includes(busqueda)
  );
}

export function calcularPrecioFinal(producto) {
  const porcentaje = producto.oferta
    ? Number(producto.descuento) || 0
    : 0;

  const descuento = Math.min(100, Math.max(0, porcentaje));

  return Math.round(
    producto.precio * (1 - descuento / 100)
  );
}


//ADMIN
export function guardarProductos(productos) {
  localStorage.setItem(
    'productosLibreria',
    JSON.stringify(productos)
  );
}
