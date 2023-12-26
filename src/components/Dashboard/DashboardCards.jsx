// Purpose: the logic and rendering for the recognition cards that display on the Dashboard

// React imports
import React, { useEffect, useState } from "react";
// Library imports
import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import styled from "styled-components";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken, userData } from "../../utils/LocalStorage";
import FullUsers from "../../utils/FullUsers";
import getValueColor from "../../utils/ValueColor";
import getValueImage from "../../utils/ValueImage";
import DeleteCardButton from "./DeleteCardButton";
import AddCommentButton from "./AddCommentButton";
import NominationComments from "./NominationComments";

// MUI styling for expandable comments section
const ExpandMoreStyle = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "0",
}));

export default function DashboardCards() {
  // Establishing states
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [selectedCard, setSelectedCard] = useState(null);
  const [expandedMap, setExpandedMap] = useState({});

  // Importing nominations
  useEffect(() => {
    const fetchNominationData = async () => {
      try {
        const response = await fetch(apiUrl + "nominations/all/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Filter and sort nominations
        const filteredNominations = data.Nominations.filter((nomination) => {
          if (nomination.isNominationInstant) {
            // Show nominations where isNominationInstant is true
            nomination.displayDate = nomination.nominationDate;
            return true;
          } else if (!nomination.isNominationInstant && nomination.isReleased) {
            // Show nominations where isNominationInstant is false, but isReleased is true
            nomination.displayDate = nomination.releaseDate;
            return true;
          }
          return false;
        }).sort((a, b) => {
          const dateA = new Date(a.displayDate.split("-").reverse().join("-"));
          const dateB = new Date(b.displayDate.split("-").reverse().join("-"));
          return dateB - dateA;
        });

        setNominations(filteredNominations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNominationData();
  }, []);

  // Importing users data
  const { fullUsers } = FullUsers();

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

  // Handling clicks on card buttons
  const handleSelectCard = (nomination) => {
    setSelectedCard(nomination);
  };

  // Handling comment expansion for a specific nomination
  const handleExpandClick = (nominationId) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [nominationId]: !prevExpandedMap[nominationId],
    }));
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
                className="nominationCard"
                key={nomination._id}
                style={{
                  borderColor: getValueColor(nomination.nominationValue),
                }}
              >
                <Avatar
                  className="valueImage"
                  alt="animal working hard"
                  src={getValueImage(nomination.nominationValue)}
                />
                <div className="cardWrapper">
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
                        className="valueChip"
                        style={{
                          borderColor: getValueColor(
                            nomination.nominationValue
                          ),
                          backgroundColor: getValueColor(
                            nomination.nominationValue
                          ),
                        }}
                        label={nomination.nominationValue}
                      />
                    }
                    title={
                      nomination.isNominationInstant
                        ? nomination.isNominatorFullUser
                          ? `Posted by ${
                              getFullName(nomination.nominatorFullUser) ||
                              "Deleted user"
                            }`
                          : `Posted by ${nomination.nominatorBasicUser.basicName.first} ${nomination.nominatorBasicUser.basicName.last}`
                        : nomination.isNominatorFullUser
                        ? `Nominated by ${
                            getFullName(nomination.nominatorFullUser) ||
                            "Deleted user"
                          }`
                        : `Nominated by ${nomination.nominatorBasicUser.basicName.first} ${nomination.nominatorBasicUser.basicName.last}`
                    }
                    subheader={nomination.displayDate}
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
                          {nomination.isNominationInstant
                            ? "Recognition for "
                            : "Award for "}
                          {getFullName(nomination.recipientUser) ? (
                            <Link
                              className="userLink"
                              to={`/profile/${nomination.recipientUser}`}
                            >
                              {getFullName(nomination.recipientUser)}
                            </Link>
                          ) : (
                            "Deleted user"
                          )}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions className="cardActions">
                    <ExpandMoreStyle
                      expand={expandedMap[nomination._id]}
                      onClick={() => handleExpandClick(nomination._id)}
                      aria-expanded={expandedMap[nomination._id]}
                      aria-label="show more"
                    >
                      <ExpandMore />
                    </ExpandMoreStyle>
                    <AddCommentButton
                      nomination={nomination}
                      onClick={handleSelectCard}
                    />
                    {userData.isAdmin && (
                      <DeleteCardButton
                        nomination={nomination}
                        onClick={handleSelectCard}
                      />
                    )}
                  </CardActions>
                  <Collapse
                    in={expandedMap[nomination._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent className="commentWrapper">
                      <NominationComments nomination={nomination} />
                    </CardContent>
                  </Collapse>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
