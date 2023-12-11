import { ArrowRight } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";

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
  const [formData, setFormData] = useState({
    recipient: "",
    value: "",
    message: "",
    award: false,
  });

  const handleClick = () => {
    props.toggle();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: update for when card recipient is a list not text:
    if (!formData.recipient.trim() || !formData.message.trim()) {
      alert("Card recipient and message cannot be blank.");
      return;
    }

    alert(
      `Recipient: ${formData.recipient}, Value: ${formData.value}, Message: ${formData.message}, Award: ${formData.award}`
    );
    // Additional logic for form submission goes here
  };

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
        <h3>Let's send some recognition!</h3>
        <form onSubmit={handleSubmit}>
          <div className="cardForm">
            <div className="formRow">
            <div className="formSelect">
                  <TextField
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
                      <MenuItem className="cardFormValues" key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="formSelect">
                  <TextField
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
                      <MenuItem className="cardFormValues" key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

              </div>
            </div>
            <TextField
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
              <label htmlFor="award">Is this an award nomination?</label>
              <input
                type="checkbox"
                name="award"
                checked={formData.award}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="formButton">
            <Button type="submit" variant="contained" endIcon={<ArrowRight />}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
