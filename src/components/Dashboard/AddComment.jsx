// Logic and display for the modal popup for adding a comment to a card

// React imports
import { useState } from "react";
// Library imports
import { Send } from "@mui/icons-material";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken, userData } from "../../utils/LocalStorage";

export default function AddCommentAction(props) {
  const { nomination } = props;

  // Set default values of formData
  const [formData, setFormData] = useState({
    comment: "",
  });

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

    // Establishing correct date format
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

    // Takes card form data and converts into correct JSON format for POST request
    const cardJSON = JSON.stringify({
      commentBody: formData.comment,
      nominationId: nomination._id,
      commenterId: userData.id,
      commentDate: new Date()
        .toLocaleDateString("en-GB", dateOptions)
        .replace(/\//g, "-"),
    });

    // Sending POST request for adding comment to nomination
    fetch(apiUrl + "comments/post/" + nomination._id, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: cardJSON,
    })
      .then((response) => {
        if (!response.ok) {
          setSubmitLoading(false);
          setErrorMessage(
            <Alert severity="error">
              Uh oh, an error occurred! Please try again.
            </Alert>
          );

          // Clear the error message after 5 seconds
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);

          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        // If successful, set the success message
        setSuccessMessage(
          <Alert severity="success">
            Comment posted! The page will refresh in 3 seconds...
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
    <div>
      {/* Display the success or error message */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={handleClick}>
            &times;
          </span>
          <h2 className="formHeading">Add a comment</h2>
          <form onSubmit={handleSubmit}>
            <div className="cardForm">
              <TextField
                required
                multiline
                id="comment"
                name="comment"
                variant="outlined"
                label="Comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
            <div className="formButton">
              <Button type="submit" variant="contained" endIcon={<Send />}>
                Submit
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
