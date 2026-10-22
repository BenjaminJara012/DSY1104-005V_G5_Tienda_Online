
import { Link } from "react-router-dom";

function PagoError() {
  return (
    <main className="container py-5 text-center">
      <div
        className="card shadow-sm p-5 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="text-danger">
          Pago rechazado
        </h1>

        <p className="mt-3">
          No fue posible completar el pago simulado.
        </p>

        <p className="text-muted">
          Tus productos siguen en el carrito.
          Puedes volver a intentarlo.
        </p>

        <Link
          to="/checkout"
          className="btn btn-success mt-3"
        >
          Intentar nuevamente
        </Link>

        <Link
          to="/carrito"
          className="btn btn-outline-secondary mt-2"
        >
          Volver al carrito
        </Link>
      </div>
    </main>
  );
}

export default PagoError;
