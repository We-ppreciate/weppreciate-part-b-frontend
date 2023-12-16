import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import formatDate from "../../utils/FormatDate";

export default function CardElement() {
  // Importing nominations info:
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleNominations, setVisibleNominations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/nominations/all/"
        );
        // Sort nominations by most recent date
        const sortedNominations = response.data.Nominations.sort(
          (a, b) => new Date(b.nominationDate) - new Date(a.nominationDate)
        );
        setNominations(sortedNominations);
        // Initially, display the first 10 nominations
        // TODO - this isn't working as expected, to fix
        setVisibleNominations(sortedNominations.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleLoadMore() {
    // Load the next 10 nominations
    const currentLength = visibleNominations.length;
    const nextNominations = nominations.slice(currentLength, currentLength + 10);
    setVisibleNominations((prevNominations) => [
      ...prevNominations,
      ...nextNominations,
    ]);
  }

  // Importing full users info:
  const [fullUsers, setFullUsers] = useState([]);

  useEffect(() => {
    const fetchFullUsers = async () => {
      try {
        const response = await axios.get(
          "https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/users/all/fullusers"
        );
        setFullUsers(response.data.Users);
      } catch (error) {
        console.error("Error fetching full user data:", error);
      }
    };

    fetchFullUsers();
  }, []);

  function getFullName(userId) {
    const fullUser = fullUsers.find((user) => user._id === userId);
    return fullUser ? `${fullUser.name.first} ${fullUser.name.last}` : "";
  }

  // Conditional colours based on values:
  function getButtonColor(nominationValue) {
    const value =
      nominationValue && nominationValue.length > 0 ? nominationValue[0] : null;

    switch (value) {
      case "Say/Do":
        return "#E9DFB7";
      case "Commitment":
        return "#CB9EAF";
      case "Collaborate":
        return "#A6B5BE";
      case "Challenging":
        return "#BDD3D0";
      case "Learning":
        return "#C1D8C5";
      case "Spirited":
        return "#E9B682";
      default:
        return "#0B4EA2";
    }
  }

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
                  borderColor: getButtonColor(nomination.nominationValue),
                }}
              >
                <CardHeader
                  className="cardHeader"
                  avatar={
                    <AvatarGroup>
                      {/* Avatar for nominator - need to get URL import from DB once ready */}
                      {nomination.isNominatorFullUser ? (
                        <Avatar
                          alt={getFullName(
                            nomination.nominatorFullUser
                          )} /* Full user photo URL to go here */
                        />
                      ) : (
                        <Avatar>{`${nomination.nominatorBasicUser.basicName.first.charAt(
                          0
                        )}${nomination.nominatorBasicUser.basicName.last.charAt(
                          0
                        )}`}</Avatar>
                      )}

                      {/* Avatar for recipient - need to get URL import from DB once ready */}
                      <Avatar
                        alt={getFullName(
                          nomination.recipientUser
                        )} /* Recipient photo URL to go here */
                      />
                    </AvatarGroup>
                  }
                  action={
                    <Chip
                      style={{
                        borderColor: getButtonColor(nomination.nominationValue),
                        backgroundColor: getButtonColor(
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
                  subheader={formatDate(nomination.nominationDate)}
                  titleTypographyProps={{ variant: "subtitle1" }}
                />
                <CardContent>
                  <div>
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
                </CardContent>
                {/* TODO: Add comment button back in when API is ready */}

                {/* <CardActions className="cardComment">
            <Button startIcon={<Comment />}>Comments</Button>
          </CardActions> */}
              </Card>
            ))}
          </Grid>
          <Grid className="cardGrid" container spacing={2}>
            {visibleNominations.length < nominations.length && (
              <Button onClick={handleLoadMore}>Load more</Button>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}
