// Retrieves the token and userData of logged in user from local storage for use in API calls

const jwtToken = localStorage.getItem("jwtToken");
const userData = JSON.parse(localStorage.getItem("loggedInUser"));

export { jwtToken, userData };
