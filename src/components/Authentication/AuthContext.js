
import { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "./AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(AuthService.isAuthenticated());

  useEffect(() => {
    // Update the authentication state when the component mounts
    setAuthenticated(AuthService.isAuthenticated());
  }, []);

  const login = (data) => {
    AuthService.login(data);
    setAuthenticated(true);
  };

  const logout = () => {
    AuthService.logout();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
