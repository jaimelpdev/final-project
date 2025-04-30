import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null); // User state

  useEffect(() => {
    // Verify if the user is logged in when the component mounts
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/getUserName");
        if (response.ok) {
          const data = await response.json();
          setUserName(data.user_name); // Update the user state with the fetched name
        } else {
          setUserName(null); // If there are no session, clear the state
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserName(null);
      }
    };

    fetchUser();
  }, []);

  const login = (name) => {
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUserName(null);
      localStorage.removeItem("userName");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
