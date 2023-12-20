// Purpose: the logic and rendering for the modal popup for sending recognition

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { Send } from "@mui/icons-material";

import { apiUrl } from "../../utils/ApiUrl";
import teamValues from "../../utils/Values";
import { jwtToken, userData } from "../../utils/LocalStorage";

export default function PopUp(props) {
  // Set default values of formData
  const [formData, setFormData] = useState({
    recipient: "",
    value: "",
    message: "",
    award: false,
  });

  // Establishing states
  const [fullUsers, setFullUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  // Importing full users list to render in form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "users/all/fullusers", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const sortedUsers = response.data.Users.sort((a, b) =>
          `${a.name.first} ${a.name.last}`.localeCompare(
            `${b.name.first} ${b.name.last}`
          )
        );

        setFullUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // establishing correct date format
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

    // Takes card form data and converts into correct JSON format for POST request
    const cardJSON = JSON.stringify({
      recipientUser: formData.recipient,
      nominatorFullUser: userData.id,
      nominationValue: [formData.value],
      nominationBody: formData.message,
      nominationDate: new Date()
        .toLocaleDateString("en-GB", dateOptions)
        .replace(/\//g, "-"),
      isNominatorFullUser: userData.isFullUser,
      isNominationInstant: !formData.award,
      isAward: formData.award,
      isReleased: false,
      releaseDate: new Date()
        .toLocaleDateString("en-GB", dateOptions)
        .replace(/\//g, "-"),
    });

    // Sending POST request for posting card
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
          // TODO: front-end validation here
          throw new Error("Login failed");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        // TODO: Add front-end validation when this occurs
        console.error("Error:", error);
      });

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

  // TODO: drop-down menus are shifting elements on screen upon click, check styling for these to resolve

  return (
    <div className="modal">
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
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
      )}
    </div>
  );
}
