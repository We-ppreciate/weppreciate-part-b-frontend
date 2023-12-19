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
import userRoles from "../../utils/UserRoles";
import { apiUrl } from "../../utils/ApiUrl";
import axios from "axios";

export default function AddUser(props) {
  // Set default values of formData
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessUnit: "",
    userLineManager: "",
    userRole: "",
    isLineManager: false,
  });

  // Establishing states
  const [fullUsers, setFullUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  // Importing full users list to render in form
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from local storage
        const jwtToken = localStorage.getItem("jwtToken");

        // Include the token in the GET request header
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

  //   Mapping the user role drop-down to the permission booleans
  const mapUserRole = () => {
    let isSeniorManager = false;
    let isAdmin = false;

    switch (formData.userRole) {
      case "Senior Manager":
        isSeniorManager = true;
        break;
      case "Admin":
        isAdmin = true;
        break;

      default:
        break;
    }

    return { isSeniorManager, isAdmin };
  };

  // Logic for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const { isSeniorManager, isAdmin } = mapUserRole();

    // Takes card form data and converts into correct JSON format for POST request
    const cardJSON = JSON.stringify({
      name: {
        first: formData.firstName,
        last: formData.lastName,
      },
      email: formData.email,
      businessUnit: formData.businessUnit,
      isLineManager: formData.isLineManager,
      isFullUser: true,
      isAdmin: isAdmin,
      isSeniorManager: isSeniorManager,
      userLineManager: formData.userLineManager,
    });

    const jwtToken = localStorage.getItem("jwtToken");

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
          throw new Error("Request failed");
        }
        return response.json();
      })
      .catch((error) => {
        setSuccessMessage(
            <Alert severity="error">Uh oh, we're having a little difficulty here! Please try again.</Alert>
          );
        console.error("Error:", error);
      });

    // If successful, set the success message and clear the form data

    setSuccessMessage(
      <Alert severity="success">
        User added! The page will refresh in 3 seconds...
      </Alert>
    );

    // Clear the form data once submitted
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      businessUnit: "",
      userLineManager: "",
      userRole: "",
      isLineManager: false,
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
                {/* make this a drop-down based on users with line manager permission */}
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
                <div className="formSelect">
                  <TextField
                    required
                    className="formSelector"
                    id="userRole"
                    name="userRole"
                    variant="outlined"
                    label="User role"
                    defaultValue=""
                    select
                    value={formData.userRole}
                    onChange={handleChange}
                  >
                    {userRoles.map((option) => (
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
                Add user
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
