// Logic and display for the modal popup for deleting a comment

// React imports
import { useState } from "react";
// Library imports
import { Send } from "@mui/icons-material";
import { Alert, Button, CircularProgress } from "@mui/material";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";

export default function DeleteComment(props) {
  const { comment } = props;

  // Establishing states
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitLoading(true);

    // Sending DELETE request for deleting nomination
    fetch(apiUrl + "comments/delete/" + comment._id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setSubmitLoading(false);
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
            Comment deleted! The page will refresh in 3 seconds...
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
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  return (
    <div>
      {/* Display the success or error message */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      <div className="modal">
        <div className="modal_content_smaller">
          <span className="close" onClick={handleClick}>
            &times;
          </span>
          <div className="confirmHeading">
            Are you sure you want to delete this comment?
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formButton">
              <Button type="submit" variant="contained" endIcon={<Send />}>
                Confirm delete
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
