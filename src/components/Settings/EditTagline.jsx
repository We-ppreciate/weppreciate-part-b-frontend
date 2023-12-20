import { Send } from "@mui/icons-material";
import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken, userData } from "../../utils/LocalStorage";

export default function EditTagline(props) {
  // Set default values of formData
  const [formData, setFormData] = useState({
    userTagLine: "",
  });

  // Establishing states
  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Preparing JSON data for API request
    const jsonData = JSON.stringify({
      userTagLine: formData.userTagLine,
    });

    // Sending PATCH request for changing own tagline
    fetch(apiUrl + "users/update/self/" + userData.id, {
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
          throw new Error("Request failed");
        } else {
          // If successful, set the success message
          setSuccessMessage(
            <Alert severity="success">
              Tagline update successful! The page will refresh in 3 seconds...
            </Alert>
          );

          // Clear the form data once submitted
          setFormData({
            userTagLine: "",
          });

          // Close the modal and refresh page after delay
          setTimeout(() => {
            props.toggle();
            setSuccessMessage("");
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => {
        setSuccessMessage(
          <Alert severity="error">
            Uh oh, we're having a little difficulty here! Please try again.
          </Alert>
        );
        console.error("Error:", error);
      });
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
        <h2 className="formHeading">Edit profile tagline</h2>
        <form onSubmit={handleSubmit}>
          <div className="cardForm">
            <TextField
              required
              multiline
              id="userTagLine"
              name="userTagLine"
              variant="outlined"
              label="Your tagline"
              value={formData.userTagLine}
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
