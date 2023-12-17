// Purpose: the rendering for a user's profile using params/API data on ProfilePage.jsx

import React from "react";
import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import SendCardButton from "../SendCardButton";
import { Container } from "@mui/system";

export default function ProfileCard({ apiData }) {
  const userDetails = apiData.User;
  const { first: firstName, last: lastName } = userDetails.name;
  
  return (
  <Container className="profileContainer">
      <Card className="profileCardHeader">
        <CardHeader
          className="profileCardHeader"
          avatar={<Avatar />} // Need to link this to the user's avatar
        //   Note - need to add validation later to change this to edit a profile for own user
          title={`${firstName} ${lastName}`}
          subheader={apiData.User.businessUnit}
          titleTypographyProps={{ variant: "h3" }}
          subheaderTypographyProps={{ variant: "subtitle1" }}
        />
        <CardContent className="profileCardTagline">{apiData.User.userTagLine}</CardContent>
      </Card>
      <Card className="profileButton"><SendCardButton/></Card>
      </Container>
  );
}