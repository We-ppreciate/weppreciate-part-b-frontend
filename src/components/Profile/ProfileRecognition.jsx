// The rendering for a user's cards on their profile using params/API data on ProfilePage.jsx

// React imports
import React, { useEffect, useState } from "react";
// Library imports
import {
  Alert,
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
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";
import FullUsers from "../../utils/FullUsers";
import getValueColor from "../../utils/ValueColor";
import getValueImage from "../../utils/ValueImage";

export default function ProfileRecognition({ apiData }) {
  // Establishing states
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Importing nominations for user
  useEffect(() => {
    const fetchNominationData = async () => {
      try {
        const response = await fetch(
          apiUrl + "nominations/all/recipient/" + apiData._id,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
  
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
            // Show nominations where isNominationInstant is false and isReleased is true
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
  }, [apiData._id]);  

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

  return (
    <Card className="profileCards">
      <CardHeader
        title={`${apiData.name.first}'s recognition and awards`}
        titleTypographyProps={{ variant: "h4" }}
      />
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Grid sx={{ width: "100%" }}>
          {nominations.length === 0 ? (
            // Render a special message when there are no nominations
            <Alert severity="info" className="noCards">
              {apiData.name.first} doesn't have any cards to show yet... why not
              send them one? 🤔
            </Alert>
          ) : (
            // Render the list of nominations
            nominations.map((nomination) => (
              <Card
                className="profileNominationCard"
                key={nomination._id}
                style={{
                  borderColor: getValueColor(nomination.nominationValue),
                }}
              >
                <CardHeader
                  className="nominationCardHeader"
                  avatar={
                    <AvatarGroup>
                      <Avatar
                        alt="animal working hard"
                        src={getValueImage(nomination.nominationValue)}
                      />
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
                    {nomination.isNominationInstant
                      ? nomination.isNominatorFullUser
                        ? `Posted by ${getFullName(
                            nomination.nominatorFullUser
                          )}`
                        : `Posted by ${nomination.nominatorBasicUser.basicName.first} ${nomination.nominatorBasicUser.basicName.last}`
                      : nomination.isNominatorFullUser
                      ? `Nominated by ${getFullName(
                          nomination.nominatorFullUser
                        )}`
                      : `Nominated by ${nomination.nominatorBasicUser.basicName.first} ${nomination.nominatorBasicUser.basicName.last}`}
                  </Typography>
                  <Typography variant="caption">
                    {nomination.displayDate}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      )}
    </Card>
  );
}
