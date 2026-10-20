
const productosIniciales = [
  {
    id: 1,
    titulo: "Harry Potter y la Piedra Filosofal",
    precio: 16990,
    imagen: "/img/hp1.jpg",
    descripcion: "Novela de fantasía y aventuras escrita por J. K. Rowling que narra los inicios de un niño huérfano en el mundo de la magia."
  },
  {
    id: 2,
    titulo: "Harry Potter y la Cámara Secreta",
    precio: 17500,
    imagen: "/img/hp2.jpg",
    descripcion: "Segunda parte de la historia de Harry Potter escrito por J. K. Rowling."
  },
  {
    id: 3,
    titulo: "Harry Potter y el Prisionero de Azkaban",
    precio: 18990,
    imagen: "/img/hp3.jpg",
    descripcion: "Tercera entrega de la saga creada por J. K. Rowling, donde Harry cumple 13 años y enfrenta el regreso a Hogwarts en medio de una gran amenaza."
  },
  {
    id: 4,
    titulo: "El Duque y Yo (Bridgerton 1)",
    precio: 14390,
    imagen: "/img/bridgerton1.jpg",
    descripcion: "Historia ambientada en la época de la Regencia en Londres y combina romance, humor y los enredos de la alta sociedad."
  },
  {
    id: 5,
    titulo: "El Vizconde que me Amó (Bridgerton 2)",
    precio: 15990,
    imagen: "/img/bridgerton2.jpg",
    descripcion: "Segundo libro de la exitosa serie romántica histórica Los Bridgerton, escrita por Julia Quinn, donde Anthony Bridgerton decide buscar una esposa para cumplir con sus deberes nobiliarios."
  },
  {
    id: 6,
    titulo: "Te Doy mi Corazón (Bridgerton 3)",
    precio: 15990,
    imagen: "/img/bridgerton3.jpg",
    descripcion: "Es el tercer libro de la famosa saga Los Bridgerton, y cuenta una romántica historia inspirada en el cuento de la Cenicienta."
  },
  {
    id: 7,
    titulo: "El Resplandor",
    precio: 13290,
    imagen: "/img/king1.jpg",
    descripcion: "Novela de terror psicológico escrita por Stephen King."
  },
  {
    id: 8,
    titulo: "It (Eso)",
    precio: 22990,
    imagen: "/img/king2.jpg",
    descripcion: "Novela de terror y horror sobrenatural escrita por Stephen King."
  },
  {
    id: 9,
    titulo: "Carrie",
    precio: 11690,
    imagen: "/img/king3.jpg",
    descripcion: "Un clásico del género de terror escrito por Stephen King, que narra la adolescencia de una joven marginada con poderes telequinéticos."
  },
  {
    id: 10,
    titulo: "Seduciendo a Mr. Bridgerton (Bridgerton 4)",
    precio: 16500,
    imagen: "/img/bridgerton4.jpg",
    descripcion: "Cuarto libro de la exitosa serie romántica Bridgerton escrita por Julia Quinn."
  }
];

export function obtenerProductos() {
  const guardados = localStorage.getItem("productosLibreria");

  if (guardados !== null) {
    try {
      const productos = JSON.parse(guardados);
      if (Array.isArray(productos)) return productos;
    } catch {
      console.error("No se pudieron leer los productos guardados.");
    }
  }

  return productosIniciales;
}
