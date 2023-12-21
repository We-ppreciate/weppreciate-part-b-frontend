// Purpose: the rendering for a user's profile using params/API data on ProfilePage.jsx

import React from "react";
import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import { Container } from "@mui/system";

import SendCardButton from "../Dashboard/SendCardButton";
import { userData } from "../../utils/LocalStorage";

export default function ProfileCard({ apiData }) {
  const { first: firstName, last: lastName } = apiData.name;

  return (
    <Container className="profileContainer">
      <Card className="profileCardHeader">
        <CardHeader
          
          avatar={
            <Avatar
              className="profileImage"
              alt={`${firstName} ${lastName}`}
              src={apiData.userPhotoKey}
            />
          }
          title={`${firstName} ${lastName}`}
          subheader={apiData.businessUnit}
          titleTypographyProps={{ variant: "h3" }}
          subheaderTypographyProps={{ variant: "subtitle1" }}
        />
        <CardContent className="profileCardTagline">
          {apiData.userTagLine}
        </CardContent>
      </Card>
      {/* Send card button hidden on user's own profile */}
      {apiData._id !== userData.id && (
        <Card className="profileButton">
          <SendCardButton />
        </Card>
      )}
    </Container>
  );
}
