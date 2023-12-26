// The logic and rendering for the modal popup for adding a user

// React imports
import { useEffect, useState } from "react";
// Library imports
import { Send } from "@mui/icons-material";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";

export default function AddUser(props) {
  // Set default values of formData
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userPhotoKey: "",
    businessUnit: "",
    userLineManager: "",
    isAdmin: false,
    isSeniorManager: false,
    isLineManager: false,
  });

  // Establishing states
  const [fullUsers, setFullUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Importing full users list to render in form and for state to work correctly
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
    setSubmitLoading(true);

    // Takes card form data and converts into correct JSON format for POST request
    const cardJSON = JSON.stringify({
      name: {
        first: formData.firstName,
        last: formData.lastName,
      },
      email: formData.email,
      userPhotoKey: formData.userPhotoKey,
      businessUnit: formData.businessUnit,
      isLineManager: formData.isLineManager,
      isFullUser: true,
      isAdmin: formData.isAdmin,
      isSeniorManager: formData.isSeniorManager,
      lineManagerId: formData.userLineManager,
    });

    // Sending POST request for posting new user
    fetch(apiUrl + "users/new", {
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
          if (response.status === 400) {
            setErrorMessage(
              <Alert severity="error">
                Something doesn't look quite right!
                <p>Please check the following:</p>
                <ul>
                  <li>email address isn't currently in use by another user</li>
                  <li>email address is a valid format</li>
                  <li>names are between 2-60 characters</li>
                  <li>business unit is between 2-60 characters</li>
                </ul>
              </Alert>
            );
          } else {
            setErrorMessage(
              <Alert severity="error">
                Uh oh, we're having a little difficulty here! Please try again.
              </Alert>
            );
          }
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
            User added! The page will refresh in 3 seconds...
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
        {loading ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          <div className="modal_content">
            <span className="close" onClick={handleClick}>
              &times;
            </span>
            <h2 className="formHeading">Add user</h2>
            <form onSubmit={handleSubmit}>
              <div className="cardForm">
                <div className="formRow">
                  <div className="formSelect">
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      variant="outlined"
                      label="First name"
                      className="formSelector"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formSelect">
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      variant="outlined"
                      label="Last name"
                      className="formSelector"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formSelect">
                    {/* add front-end validation on email regex */}
                    <TextField
                      required
                      id="email"
                      name="email"
                      variant="outlined"
                      label="Email"
                      className="formSelector"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formSelect">
                    <TextField
                      required
                      id="userPhotoKey"
                      name="userPhotoKey"
                      variant="outlined"
                      label="Photo URL"
                      className="formSelector"
                      value={formData.userPhotoKey}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="formRow">
                  <div className="formSelect">
                    <TextField
                      required
                      id="businessUnit"
                      name="businessUnit"
                      variant="outlined"
                      className="formSelector"
                      label="Business unit"
                      value={formData.businessUnit}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formSelect">
                    <TextField
                      name="userLineManager"
                      className="formSelector"
                      id="userLineManager"
                      select
                      label="Manager"
                      defaultValue=""
                      variant="outlined"
                      onChange={handleChange}
                    >
                      {fullUsers.map((user) => {
                        const userName = `${user.name.first} ${user.name.last}`;
                        if (user.isLineManager) {
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
                        return null;
                      })}
                    </TextField>
                  </div>
                </div>
                <div className="formRow">
                  <FormControlLabel
                    control={<Checkbox sx={{ pt: 0, pb: 0 }} />}
                    label="Admin"
                    id="isAdmin"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    control={<Checkbox sx={{ pt: 0, pb: 0 }} />}
                    label="Senior manager"
                    id="isSeniorManager"
                    name="isSeniorManager"
                    checked={formData.isSeniorManager}
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    control={<Checkbox sx={{ pt: 0, pb: 0 }} />}
                    label="Line manager"
                    id="isLineManager"
                    name="isLineManager"
                    checked={formData.isLineManager}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="formButton">
                <Button type="submit" variant="contained" endIcon={<Send />}>
                  Add user
                </Button>
              </div>
              <div className="changeLoader">
                {submitLoading && <CircularProgress />}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
