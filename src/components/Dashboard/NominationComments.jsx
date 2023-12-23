// For importing and rendering the comments on a nomination

// React imports
import React, { useEffect, useState } from "react";
// Library imports
import { Box } from "@mui/system";
import axios from "axios";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";
import FullUsers from "../../utils/FullUsers";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
} from "@mui/material";

export default function NominationComments(props) {
  const { nomination } = props;

  // Establishing states
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Importing comments
  useEffect(() => {
    const fetchNominationData = async () => {
      try {
        const response = await axios.get(
          apiUrl + "comments/all/nomination/" + nomination._id,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          // Sort comments by date and format the dates
          const sortedComments = response.data
            .map((comment) => ({
              ...comment,
              commentDate: new Date(comment.commentDate).toLocaleDateString(
                "en-GB"
              ),
            }))
            .sort((a, b) => {
              const dateA = new Date(
                a.commentDate.split("-").reverse().join("-")
              );
              const dateB = new Date(
                b.commentDate.split("-").reverse().join("-")
              );
              return dateB - dateA;
            });

          setComments(sortedComments);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNominationData();
  }, [nomination._id]);

  // Importing users data
  const { fullUsers } = FullUsers();

  // Extracts full name for cards based on id for comments
  function getFullName(userId) {
    const fullUser = fullUsers.find((user) => user._id === userId);
    return fullUser ? `${fullUser.name.first} ${fullUser.name.last}` : "";
  }

  return (
    <Box>
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Grid sx={{ width: "100%" }}>
          {comments.length === 0 ? (
            // Render a special message when there are no comments
            <Alert severity="info">
              This recognition doesn't have any comments yet... why not add one?
              🤔
            </Alert>
          ) : (
            // Render the list of comments
            comments.map((comment) => (
              <Card className="nominationComment">
                <CardHeader
                  title={getFullName(comment.commenterId)}
                  subheader={comment.commentDate}
                  titleTypographyProps={{ variant: "caption" }}
                  subheaderTypographyProps={{ variant: "caption" }}
                />
                <CardContent className="commentBody">{comment.commentBody}</CardContent>
              </Card>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
}
