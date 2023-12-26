// The logic and rendering for the modal popup for reset password

// React imports
import React, { useState } from "react";
// Library imports
import { Send } from "@mui/icons-material";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";

export default function ResetPassword(props) {
  const { user } = props;

  const [formData, setFormData] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleClick = () => {
    props.toggle();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitLoading(true);

    // Perform password validation
    const isValidPassword = validatePassword(formData.newPassword);

    if (
      isValidPassword &&
      formData.newPassword === formData.repeatNewPassword
    ) {
      const jsonData = JSON.stringify({
        newPassword: formData.newPassword,
      });

      fetch(apiUrl + "auth/reset/" + user._id, {
        method: "PATCH",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => {
          if (!response.ok) {
            setSubmitLoading(false);
            setErrorMessage(
              <Alert severity="error">
                Uh oh, we're having a little difficulty here! Please try again.
              </Alert>
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
            throw new Error("Request failed");
          }
        })
        .then((data) => {
          setSuccessMessage(
            <Alert severity="success">
              Password change successful! The page will refresh in 3 seconds...
            </Alert>
          );

          setTimeout(() => {
            props.toggle();
            setSuccessMessage("");
            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      setSubmitLoading(false);
      setErrorMessage(
        <Alert severity="error">
          {isValidPassword
            ? "Passwords do not match! Please try again."
            : "Invalid password. Password must be between 8 and 120 characters and contain at least one digit and one special character."}
        </Alert>
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return (
      password.length >= 8 && password.length <= 120 && regex.test(password)
    );
  };

  return (
    <div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={handleClick}>
            &times;
          </span>
          <h2 className="formHeading">Reset {user.name.first}'s password</h2>
          <form onSubmit={handleSubmit}>
            <div className="cardForm">
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
            <div className="changeLoader">
              {submitLoading && <CircularProgress />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
