// Purpose: the logic and rendering for the recognition cards that display on the Dashboard

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import { apiUrl } from "../../utils/ApiUrl";
import getValueColor from "../../utils/ValueColor";
import { jwtToken, userData } from "../../utils/LocalStorage";
import DeleteCardButton from "./DeleteCardButton";

export default function DashboardCards() {
  // Establishing states
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullUsers, setFullUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedCard, setSelectedCard] = useState(null);

  // Importing nominations
  useEffect(() => {
    const fetchNominationData = async () => {
      try {
        const response = await axios.get(apiUrl + "nominations/all/", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        // Sort nominations by most recent date
        const sortedNominations = response.data.Nominations.sort((a, b) => {
          const dateA = new Date(
            a.nominationDate.split("-").reverse().join("-")
          );
          const dateB = new Date(
            b.nominationDate.split("-").reverse().join("-")
          );
          return dateB - dateA;
        });
        setNominations(sortedNominations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNominationData();
  }, []);

  // Importing full users info
  useEffect(() => {
    const fetchFullUsers = async () => {
      try {
        const response = await axios.get(apiUrl + "users/all/fullusers", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setFullUsers(response.data.Users);
      } catch (error) {
        console.error("Error fetching full users:", error);
      }
    };
    fetchFullUsers();
  }, []);

  // Extracts full name for cards based on id for nominations
  function getFullName(userId) {
    const fullUser = fullUsers.find((user) => user._id === userId);
    return fullUser ? `${fullUser.name.first} ${fullUser.name.last}` : "";
  }

  // Extracts user's photo for cards based on id for nominations
  function getUserPhoto(userId) {
    const findUser = fullUsers.find((user) => user._id === userId);
    return findUser ? findUser.userPhotoKey : "";
  }

  // Function to handle delete button clicks
  const handleDeleteCard = (nomination) => {
    setSelectedCard(nomination);
  };

  return (
    <div>
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Grid className="cardGrid" container spacing={2}>
            {nominations.map((nomination) => (
              <Card
                key={nomination._id}
                style={{
                  borderColor: getValueColor(nomination.nominationValue),
                }}
              >
                <CardHeader
                  className="cardHeader"
                  avatar={
                    <AvatarGroup>
                      {nomination.isNominatorFullUser ? (
                        <Avatar
                          alt={getFullName(nomination.nominatorFullUser)}
                          src={getUserPhoto(nomination.nominatorFullUser)}
                        />
                      ) : (
                        <Avatar>{`${nomination.nominatorBasicUser.basicName.first.charAt(
                          0
                        )}${nomination.nominatorBasicUser.basicName.last.charAt(
                          0
                        )}`}</Avatar>
                      )}
                      <Avatar
                        alt={getFullName(nomination.recipientUser)}
                        src={getUserPhoto(nomination.recipientUser)}
                      />
                    </AvatarGroup>
                  }
                  action={
                    <Chip
                      style={{
                        borderColor: getValueColor(nomination.nominationValue),
                        backgroundColor: getValueColor(
                          nomination.nominationValue
                        ),
                      }}
                      label={nomination.nominationValue}
                    />
                  }
                  title={
                    nomination.isNominatorFullUser
                      ? `Posted by ${getFullName(nomination.nominatorFullUser)}`
                      : `Posted by ${nomination.nominatorBasicUser.basicName.first} ${nomination.nominatorBasicUser.basicName.last}`
                  }
                  subheader={nomination.nominationDate}
                  titleTypographyProps={{ variant: "subtitle1" }}
                />
                <CardContent className="cardMain">
                  <div className="cardGuts">
                    <div className="cardBody">
                      <Typography variant="h5">
                        {nomination.nominationBody}
                      </Typography>
                    </div>
                    <div className="cardRecipient">
                      <Typography variant="caption">
                        {" "}
                        Recognition for{" "}
                        <Link
                          className="userLink"
                          to={`/profile/${nomination.recipientUser}`}
                        >
                          {getFullName(nomination.recipientUser)}
                        </Link>
                      </Typography>
                    </div>
                  </div>
                  {/* TODO: add interaction on admin delete button */}
                  <div className="cardComment">
                    {userData.isAdmin && <DeleteCardButton nomination={nomination} onClick={handleDeleteCard}/>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}