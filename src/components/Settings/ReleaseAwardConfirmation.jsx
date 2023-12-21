import { Send } from "@mui/icons-material";
import { Alert, Button, Typography } from "@mui/material";
import { useState } from "react";

import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";

export default function ReleaseAwardConfirmation(props) {
  const { nomination } = props;

  // Establishing states
  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // establishing correct date format
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

    // Converts into correct JSON format for PATCH request
    const cardJSON = JSON.stringify({
      nominationId: nomination._id,
      isReleased: true,
      isAward: true,
      releaseDate: new Date()
        .toLocaleDateString("en-GB", dateOptions)
        .replace(/\//g, "-"),
    });

    // Sending PATCH request for updating nomination
    fetch(apiUrl + "nominations/update/nom/" + nomination._id, {
      method: "PATCH",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: cardJSON,
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

    // If successful, set the success message
    setSuccessMessage(
      <Alert severity="success">
        Award released! The page will refresh in 3 seconds...
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
        <Typography variant="h5">
          Please confirm you want to release this nomination as an award:
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="formButton">
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Confirm release award
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
