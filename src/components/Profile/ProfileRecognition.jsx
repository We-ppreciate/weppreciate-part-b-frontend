// Purpose: the rendering for a user's profile using params/API data on ProfilePage.jsx

import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import { AddReaction } from "@mui/icons-material";
import axios from "axios";
import { fullUsersUrl } from "../../utils/ApiPaths";
import getValueColor from "../../utils/ValueColor";
import formatDate from "../../utils/FormatDate";

export default function ProfileRecognition({ apiData }) {
  // Establishing states
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullUsers, setFullUsers] = useState([]);

  // Importing nominations for user
  useEffect(() => {
    const fetchNominationData = async () => {
      try {
        // Retrieve JWT from local storage
        const jwtToken = localStorage.getItem("jwtToken");

        // Include the token in the GET request header
        const response = await axios.get(
          "https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/nominations/all/recipient/" +
            apiData._id,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        // Sort nominations by most recent date
        const sortedNominations = response.data.Nominations.sort(
          (a, b) => new Date(b.nominationDate) - new Date(a.nominationDate)
        );
        setNominations(sortedNominations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNominationData();
  }, [apiData._id]);

  // Importing full users info for displaying sender name on cards
  useEffect(() => {
    const fetchFullUsers = async () => {
      try {
        // Retrieve JWT from local storage
        const jwtToken = localStorage.getItem("jwtToken");

        // Include the token in the GET request header
        const response = await axios.get(fullUsersUrl, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        setFullUsers(response.data.Users);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  return (
    // TODO: update styling so CardHeader elements are all aligned vertically centred
    <Card>
      <CardHeader
        avatar={<AddReaction />}
        title={`${apiData.name.first}'s Cards`}
        titleTypographyProps={{ variant: "h4" }}
      />

      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div>
          {nominations.map((nomination) => (
            <Card className="profileNominationCard" key={nomination._id}>
              <CardHeader
                className="nominationCardHeader"
                avatar={
                  <AvatarGroup>
                    {/* Avatar for nominator - need to get URL import from DB once ready */}
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
                title={nomination.nominationBody}
                titleTypographyProps={{ variant: "h5" }}
              />

              <CardContent className="profileNominationsSubtitle">
                <Typography variant="subtitle2">
                  {nomination.isNominatorFullUser
                    ? `Posted by ${getFullName(nomination.nominatorFullUser)}`
                    : `Posted by ${nomination.nominatorBasicUser.basicName.first} ${nomination.nominatorBasicUser.basicName.last}`}
                </Typography>
                <Typography variant="caption">
                  {formatDate(nomination.nominationDate)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
