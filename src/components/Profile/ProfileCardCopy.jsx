// NASTY WIP COPY OF PROFILECARD.JSX - NOT WORKING :)


import React, { useEffect, useState } from "react";
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import SendCardButton from "../SendCardButton";
import { AddReaction, EmojiEvents } from "@mui/icons-material";


const RecognitionCard = ({ nomination }) => {
  const { nominationBody, nominationDate, nominatorFullUser } = nomination;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={`Nominated by ${nominatorFullUser ? nominatorFullUser.basicName.first : "Anonymous"}`}
        subheader={new Date(nominationDate).toLocaleDateString()}
        titleTypographyProps={{ variant: "subtitle1" }}
      />
      <CardContent>
        <Typography variant="body1">{nominationBody}</Typography>
      </CardContent>
    </Card>
  );
};

const RecognitionCards = ({ nominations }) => {
  return (
    <Card>
      <CardHeader avatar={<EmojiEvents />} title="Awards" titleTypographyProps={{ variant: "h5" }} />
      <CardContent>
        {nominations.map((nomination) => (
          <RecognitionCard key={nomination._id} nomination={nomination} />
        ))}
      </CardContent>
    </Card>
  );
};

const ProfileCard = ({ apiData }) => {
  const userDetails = apiData.User;
  const { first: firstName, last: lastName } = userDetails.name;
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    // Fetch nominations for the user and update the state
    const fetchNominations = async () => {
      try {
        const response = await fetch(`https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/nominations/all/recipient/${userDetails.id}`);
        const data = await response.json();
        setNominations(data.Nominations);
      } catch (error) {
        console.error("Error fetching nominations:", error);
      }
    };

    fetchNominations();
  }, [userDetails.id]);

  
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
      <RecognitionCards nominations={nominations} />
      {/* commenting these out while testing something... */}
      {/* <Card><CardHeader avatar={<EmojiEvents />} title={"Awards"} titleTypographyProps={{ variant: "h5" }}/><CardContent>Awards here...</CardContent></Card> */}
      {/* <Card><CardHeader avatar={<AddReaction />} title={"Cards"}titleTypographyProps={{ variant: "h5" }} /><CardContent>Recognition cards here...</CardContent></Card> */}
    </Grid>
  );
}

export default ProfileCard;


// TODO: fetch and render the cards from API, example URL: https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/nominations/all/recipient/6575733ec77e4fcca14b175d