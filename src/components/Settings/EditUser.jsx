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
import { useEffect, useState } from "react";
import axios from "axios";

import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";

export default function EditUser(props) {
  const { user } = props;

  // Set default values of formData
  const [formData, setFormData] = useState({
    firstName: user.name.first,
    lastName: user.name.last,
    email: user.email,
    businessUnit: user.businessUnit,
    userLineManager: user.lineManagerId,
    isAdmin: user.isAdmin,
    isSeniorManager: user.isSeniorManager,
    isLineManager: user.isLineManager,
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
        // Set the initial value for userLineManager based on user.lineManagerId
        setFormData((prevFormData) => ({
          ...prevFormData,
          userLineManager: user.lineManagerId,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.lineManagerId]);

  const handleClick = () => {
    props.toggle();
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Takes card form data and converts into correct JSON format for POST request
    const cardJSON = JSON.stringify({
      name: {
        first: formData.firstName,
        last: formData.lastName,
      },
      email: formData.email,
      businessUnit: formData.businessUnit,
      isLineManager: formData.isLineManager,
      isAdmin: formData.isAdmin,
      isSeniorManager: formData.isSeniorManager,
      lineManagerId: formData.userLineManager,
    });

    // Sending PATCH request for posting editing user
    fetch(apiUrl + "users/update/admin/" + user._id, {
      method: "PATCH",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: cardJSON,
    })
      .then((response) => {
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
        User updated! The page will refresh in 3 seconds...
      </Alert>
    );

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
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="modal_content">
          <span className="close" onClick={handleClick}>
            &times;
          </span>
          <h2 className="formHeading">Edit user</h2>
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
                    value={formData.userLineManager}
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
                  control={<Checkbox />}
                  label="Admin"
                  id="isAdmin"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Senior manager"
                  id="isSeniorManager"
                  name="isSeniorManager"
                  checked={formData.isSeniorManager}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox />}
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
                Update
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
