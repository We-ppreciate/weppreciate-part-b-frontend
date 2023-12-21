
import { jwtDecode } from 'jwt-decode';

export const AuthService = {
  login: (data) => {
    // Perform login logic and store the token in localStorage
    localStorage.setItem("jwtToken", data.token);
    localStorage.setItem("loggedInUser", JSON.stringify(data));
  },

  logout: () => {
    // Perform logout logic and remove the token from localStorage
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
        // Handle decoding error (e.g., invalid token format)
        return false;
      }
    }

    return false;
  },
};
