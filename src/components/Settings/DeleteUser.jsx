import { Send } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { useState } from "react";
import { apiUrl } from "../../utils/ApiUrl";

export default function DeleteUser(props) {
  const { user } = props;

  // Establishing states
  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const jwtToken = localStorage.getItem("jwtToken");

    // Sending PATCH request for posting editing user
    fetch(apiUrl + "users/delete/admin/" + user._id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .catch((error) => {
        setSuccessMessage(
          <Alert severity="error">
            Uh oh, we're having a little difficulty here! Please try again.
          </Alert>
        );
        console.error("Error:", error);
      });

    // If successful, set the success message and clear the form data

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
  };

  return (
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
        {/* Display the success message */}
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
      </div>
    </div>
  );
}