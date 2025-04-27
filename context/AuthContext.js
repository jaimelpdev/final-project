import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    fetch("/api/getUserName")
      .then((response) => response.json())
      .then((data) => {
        if (data.user_name) {
          setUserName(data.user_name);
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);