// Creating context to wrap around app to continually check authentication on private routes

// React imports
import { createContext, useContext, useState, useEffect } from "react";
// Local imports
import { AuthService } from "./AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(AuthService.isAuthenticated());

  useEffect(() => {
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
