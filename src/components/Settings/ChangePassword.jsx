import { Send } from "@mui/icons-material";
import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function ChangePassword(props) {
  // Set default values of formData
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  // Establishing states
  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.newPassword === formData.repeatNewPassword) {
        
      // TODO: get request for current user data, compare current password before submitting change

      // TODO: post request for new password

      // If successful, set the success message and clear the form data

      setSuccessMessage(
        <Alert severity="success">
          Password change successful! The page will refresh in 3 seconds...
        </Alert>
      );

      // Clear the form data once submitted
      setFormData({
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      });

      // Close the modal and refresh page after delay
      setTimeout(() => {
        props.toggle();
        setSuccessMessage("");
        window.location.reload();
      }, 3000);

    } else {
      //   If passwords don't match at front-end
      setSuccessMessage(
        <Alert severity="error">Passwords do not match! Please try again</Alert>
      );
    }
  };

  // Updates formData when change is made to a form value
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <h2 className="formHeading">Change password</h2>
        <form onSubmit={handleSubmit}>
          <div className="cardForm">
            <TextField
              className="passwordField"
              required
              id="currentPassword"
              name="currentPassword"
              type="password"
              variant="outlined"
              label="Current password"
              value={formData.currentPassword}
              onChange={handleChange}
            />

            <TextField
              className="passwordField"
              required
              id="newPassword"
              name="newPassword"
              type="password"
              variant="outlined"
              label="New password"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <TextField
              className="passwordField"
              required
              id="repeatNewPassword"
              name="repeatNewPassword"
              type="password"
              variant="outlined"
              label="Repeat new password"
              value={formData.repeatNewPassword}
              onChange={handleChange}
            />
          </div>
          <div className="formButton">
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Submit change
            </Button>
          </div>
        </form>
        {/* Display the success message */}
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
      </div>
    </div>
  );
}
