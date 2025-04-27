import React, { createContext, useContext, useState, useEffect } from "react"; // Asegúrate de importar useState y useEffect

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null); // Estado del usuario

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  const login = (name) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    setUserName(null);
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ userName, setUserName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
