
import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, esAdministrador } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (esAdministrador) {
    return <Navigate to="/admin" replace />;
  }

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate("/admin", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="container py-5">
      <div
        className="card shadow-sm mx-auto"
        style={{ maxWidth: "440px" }}
      >
        <div className="card-body p-4">
          <h1 className="h3 text-center mb-3">
            Iniciar sesión
          </h1>

          <p className="text-muted text-center mb-4">
            Acceso al panel administrativo de
            Relatos & Páginas.
          </p>

          {error && (
            <div
              className="alert alert-danger"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={manejarSubmit}>
            <div className="mb-3">
              <label
                htmlFor="loginEmail"
                className="form-label"
              >
                Correo electrónico
              </label>

              <input
                id="loginEmail"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="loginPassword"
                className="form-label"
              >
                Contraseña
              </label>

              <input
                id="loginPassword"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Ingresar
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/" className="text-decoration-none">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
