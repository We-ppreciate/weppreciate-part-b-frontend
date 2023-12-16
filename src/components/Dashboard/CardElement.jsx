// import { Comment } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  // Button,
  Card,
  // CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import "../../styles/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../../utils/FormatDate";
import { Link } from "react-router-dom";

export default function CardElement() {
  // Importing nominations info:
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <div className="profileLoader">
          <CircularProgress />
        </div>
      ) : (
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
      )}
    </div>
  );
}
