// For validation functions that will be used in other components

function validatePassword(password) {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return password.length >= 8 && password.length <= 120 && regex.test(password);
}

function validateEmail(email) {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

export { validatePassword, validateEmail };
