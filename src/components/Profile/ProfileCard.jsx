import React from "react";
import { Avatar, Card, CardContent, CardHeader, Grid } from "@mui/material";
import SendCardButton from "../SendCardButton";
import { AddReaction } from "@mui/icons-material";

export default function ProfileCard({ apiData }) {
  const userDetails = apiData.User;
  const { first: firstName, last: lastName } = userDetails.name;
  
  return (
    <Grid className="cardGrid" container spacing={0}>
      <Card className="profileCardHeader">
        <CardHeader
          className="profileCardHeader"
          avatar={<Avatar />} // Need to link this to the user's avatar
        //   Note - need to add validation later to change this to edit a profile for own user
          action={<SendCardButton/>}
          title={`${firstName} ${lastName}`}
          subheader={apiData.User.businessUnit}
          titleTypographyProps={{ variant: "h4" }}
        />
        <CardContent className="profileCardTagline">{apiData.User.userTagLine}</CardContent>
      </Card>
      
      {/* commenting these out while testing something... */}
      {/* <Card><CardHeader avatar={<EmojiEvents />} title={"Awards"} titleTypographyProps={{ variant: "h5" }}/><CardContent>Awards here...</CardContent></Card> */}
      <Card><CardHeader avatar={<AddReaction />} title={"Cards"}titleTypographyProps={{ variant: "h5" }} /><CardContent>Recognition cards here...</CardContent></Card>
    </Grid>
  );
}


// TODO: fetch and render the cards from API, example URL: https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/nominations/all/recipient/6575733ec77e4fcca14b175d