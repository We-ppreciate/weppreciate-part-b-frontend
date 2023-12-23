// The logic and rendering for the modal popup for sending recognition

// React imports
import React, { useState } from "react";
// Library imports
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import { Send } from "@mui/icons-material";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken, userData } from "../../utils/LocalStorage";
import FullUsers from "../../utils/FullUsers";
import teamValues from "../../utils/Values";

export default function SendCard(props) {
  // Set default values of formData
  const [formData, setFormData] = useState({
    recipient: "",
    value: "",
    message: "",
    award: false,
  });

  // Establishing states
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Importing users data and loading state for nominations drop-down
  const { fullUsers, loading } = FullUsers();

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Establishing correct date format that's accepted by API
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

    // Takes card form data and converts into correct JSON format for POST request
    const cardJSON = JSON.stringify({
      recipientUser: formData.recipient,
      nominatorFullUser: userData.id,
      nominationValue: formData.value,
      nominationBody: formData.message,
      nominationDate: new Date()
        .toLocaleDateString("en-GB", dateOptions)
        .replace(/\//g, "-"),
      isNominatorFullUser: userData.isFullUser,
      isNominationInstant: !formData.award,
      isAward: false,
      isReleased: false,
    });

    // Sending POST request for posting nomination
    fetch(apiUrl + "nominations/new", {
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
        console.log(data);
        // If successful, set the success message
        setSuccessMessage(
          <Alert severity="success">
            Recognition submitted! The page will refresh in 3 seconds...
          </Alert>
        );

        // Clear the form data once submitted
        setFormData({
          recipient: "",
          value: "",
          message: "",
          award: false,
        });

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
          <h2 className="formHeading">Let's send some recognition!</h2>
          <form onSubmit={handleSubmit}>
            <div className="cardForm">
              <div className="formRow">
                <div className="formSelect">
                  <TextField
                    required
                    name="recipient"
                    className="formSelector"
                    id="recipient"
                    select
                    label="Card recipient"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}
                  >
                    {loading ? (
                      <div className="loader">
                        <CircularProgress />
                      </div>
                    ) : (
                      <div>
                        {fullUsers.map((user) => {
                          const userName = `${user.name.first} ${user.name.last}`;
                          if (
                            userName !==
                            `${userData.name.first} ${userData.name.last}`
                          ) {
                            return (
                              <MenuItem
                                className="cardFormValues"
                                key={user._id}
                                value={user._id}
                              >
                                {userName}
                              </MenuItem>
                            );
                          }
                          // If there is a match with the logged in user's name, it won't be rendered on the list
                          return null;
                        })}
                      </div>
                    )}
                  </TextField>
                </div>
                <div className="formSelect">
                  <TextField
                    required
                    name="value"
                    className="formSelector"
                    id="value"
                    select
                    label="Select a value"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange}
                  >
                    {teamValues.map((option) => (
                      <MenuItem
                        className="cardFormValues"
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <TextField
                className="cardMessage"
                required
                multiline
                id="message"
                name="message"
                variant="outlined"
                label="Card message"
                value={formData.message}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Nominate for award"
                id="award"
                name="award"
                checked={formData.award}
                onChange={handleChange}
              />
              <FormHelperText>
                Award nominations will be reviewed by managers
              </FormHelperText>
            </div>
            <div className="formButton">
              <Button type="submit" variant="contained" endIcon={<Send />}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
