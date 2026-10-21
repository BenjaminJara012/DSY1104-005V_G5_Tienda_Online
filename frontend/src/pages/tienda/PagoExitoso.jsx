
import { Link, useParams } from "react-router-dom";
import { obtenerOrdenes } from "../../services/ordenesService";

function PagoExitoso() {
  const { id } = useParams();

  const orden = obtenerOrdenes().find(
    (item) => item.id === id &&
      item.estadoPago === "aprobado"
  );

  if (!orden) {
    return (
      <main className="container py-5 text-center">
        <h2>Orden no encontrada</h2>
        <p>No encontramos una compra aprobada con ese identificador.</p>
        <Link to="/productos" className="btn btn-success">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5 text-center">
      <div className="card shadow-sm p-5 mx-auto"
           style={{ maxWidth: "600px" }}>
        <h1 className="text-success">
          ¡Pago aprobado!
        </h1>

        <p className="mt-3">
          Tu compra se registró correctamente.
        </p>

        <p>
          <strong>Número de orden:</strong>
          <br />
          {orden.id}
        </p>

        <p>
          <strong>Total pagado:</strong>
          <br />
          ${orden.total.toLocaleString("es-CL")}
        </p>

        <p className="text-muted">
          Estado del pedido: {orden.estadoPedido}
        </p>

        <Link to="/productos" className="btn btn-success mt-3">
          Seguir comprando
        </Link>
      </div>
    </main>
  );
}

export default PagoExitoso;
