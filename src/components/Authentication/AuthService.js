// For use with AuthContext, establishing the different authentication steps

// Library imports
import { jwtDecode } from "jwt-decode";

export const AuthService = {
  login: (data) => {
    // Perform login logic and store the token and user details in localStorage
    localStorage.setItem("jwtToken", data.token);
    localStorage.setItem("loggedInUser", JSON.stringify(data));
  },

  logout: () => {
    // Perform logout logic and remove the token and user details from localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
  },

  getToken: () => {
    // Retrieve the token from localStorage
    return localStorage.getItem("jwtToken");
  },

  isAuthenticated: () => {
    const token = AuthService.getToken();

    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if the token is expired
        return decoded.exp > Date.now() / 1000;
      } catch (error) {
        return false;
      }
    }
    return false;
  },
};
