
import {
  createContext,
  useContext,
  useState
} from "react";

import {
  iniciarSesion,
  obtenerSesion,
  cerrarSesion
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    () => obtenerSesion()
  );

  const login = (email, password) => {
    const usuarioAutenticado = iniciarSesion(
      email,
      password
    );

    setUsuario(usuarioAutenticado);

    return usuarioAutenticado;
  };

  const logout = () => {
    cerrarSesion();
    setUsuario(null);
  };

  const esAdministrador =
    usuario?.rol === "administrador";

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        esAdministrador
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return contexto;
}
