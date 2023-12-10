import React from "react";
import { Avatar, Button, Card, CardContent, CardHeader, Grid } from "@mui/material";

export default function ProfileCard({ apiData }) {
  const userDetails = apiData.User;
  const { first: firstName, last: lastName } = userDetails.name;
  const businessUnit = userDetails.businessUnit;
  const userTagLine = userDetails.userTagLine;

  return (
    <Grid className="cardGrid" container spacing={0}>
      <Card className="profileCardHeader">
        <CardHeader
          className="profileCardHeader"
          avatar={<Avatar />} // Need to link this to the user's avatar
          action={<Button variant="contained">Button here</Button>}
          title={`${firstName} ${lastName}`}
          subheader={businessUnit}
        />
        <CardContent className="profileCardBio">{userTagLine}</CardContent>
      </Card>
      <Card>Awards here</Card>
      <Card>Recognition cards here</Card>
    </Grid>
  );
}
