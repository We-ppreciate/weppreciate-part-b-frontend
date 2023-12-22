import { Send } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { useState } from "react";

import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";

export default function DeleteUser(props) {
  const { user } = props;

  // Establishing states
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Sending DELETE request for deleting user
    fetch(apiUrl + "users/delete/admin/" + user._id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setErrorMessage(
            <Alert severity="error">
              Uh oh, we're having a little difficulty here! Please try again.
            </Alert>
          );
          // Clear the error message after 5 seconds
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        // If successful, set the success message
        setSuccessMessage(
          <Alert severity="success">
            User deleted! The page will refresh in 3 seconds...
          </Alert>
        );

        // Close the modal and refresh page after delay
        setTimeout(() => {
          props.toggle();
          setSuccessMessage("");
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {/* Display the success or error message */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={handleClick}>
            &times;
          </span>
          <h3 className="formHeading">
            Are you sure you want to delete {user.name.first}?
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="formButton">
              <Button type="submit" variant="contained" endIcon={<Send />}>
                Confirm delete
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
