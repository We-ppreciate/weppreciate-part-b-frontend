import React from "react";
import { Avatar, Card, CardContent, CardHeader, Grid } from "@mui/material";
import SendCardButton from "../SendCardButton";
import { AddReaction, EmojiEvents } from "@mui/icons-material";

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
        //   Note - need to add validation later to change this to edit a profile for own user
          action={<SendCardButton/>}
          title={`${firstName} ${lastName}`}
          subheader={businessUnit}
        />
        <CardContent className="profileCardTagline">{userTagLine}</CardContent>
      </Card>
      {/* need to style these better... */}
      <Card><CardHeader avatar={<EmojiEvents />} title={"Awards"}/><CardContent>Awards here...</CardContent></Card>
      <Card><CardHeader avatar={<AddReaction />} title={"Cards"}/><CardContent>Recognition cards here...</CardContent></Card>
    </Grid>
  );
}


// TODO: fetch and render the cards from API, example URL: https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/nominations/all/recipient/6575733ec77e4fcca14b175d