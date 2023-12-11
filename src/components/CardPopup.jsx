import { Send } from "@mui/icons-material";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

// Temporary until these are held within another file:
const teamValues = [
  {
    value: "Say/Do",
    label: "Say/Do",
  },
  {
    value: "Commitment",
    label: "Commitment",
  },
  {
    value: "Collaborate",
    label: "Collaborate",
  },
  {
    value: "Challenging",
    label: "Challenging",
  },
  {
    value: "Learning",
    label: "Learning",
  },
  {
    value: "Spirited",
    label: "Spirited",
  },
];

// Temporary until these are pulled via API:
const fullUsers = [
  {
    value: "Nate Picone",
    label: "Nate Picone",
  },
  {
    value: "Ed Doherty",
    label: "Ed Doherty",
  },
  {
    value: "Hannah Sallows",
    label: "Hannah Sallows",
  },
  {
    value: "Katie Lock",
    label: "Katie Lock",
  },
];

export default function PopUp(props) {
  // Set default values of formData
  const [formData, setFormData] = useState({
    recipient: "",
    value: "",
    message: "",
    award: false,
  });

  const handleClick = () => {
    props.toggle();
  };

  // Add a state variable for success message to display
  const [successMessage, setSuccessMessage] = useState("");

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: add API call here to submit

    // If successful, set the success message and clear the form data
    setSuccessMessage(
      <Alert severity="success">
        Recognition submitted! The page will refresh in 3 seconds...
      </Alert>
    );

    // Clear the form data
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
                  {fullUsers.map((option) => (
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
            <div className="formRow">
              <FormControlLabel
                control={<Checkbox />}
                label="Nominate for award"
                id="award"
                name="award"
                checked={formData.award}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="formButton">
            <Button type="submit" variant="contained" endIcon={<Send />}>
              Submit
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
