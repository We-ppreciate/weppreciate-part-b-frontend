// For importing and rendering the comments on a nomination

// React imports
import React, { useEffect, useState } from "react";
// Library imports
import { Box } from "@mui/system";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken, userData } from "../../utils/LocalStorage";
import FullUsers from "../../utils/FullUsers";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
} from "@mui/material";
import DeleteCommentButton from "./DeleteCommentButton";

export default function NominationComments(props) {
  const { nomination } = props;

  // Establishing states
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [selectedComment, setSelectedComment] = useState(null);

  // Importing comments
  useEffect(() => {
    const fetchNominationData = async () => {
      try {
        const response = await fetch(
          apiUrl + "comments/all/nomination/" + nomination._id,
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

        // Check if response.data is an array
        if (Array.isArray(data)) {
          // Sort comments by date and format the dates
          const sortedComments = data
            .map((comment) => {
              // Check if the date is in the specified format
              const isDateFormat = /^\d{2}-\d{2}-\d{4}$/.test(
                comment.commentDate
              );

              // If not in the specified format, convert it
              if (!isDateFormat) {
                const dateObj = new Date(comment.commentDate);
                const formattedDate = `${dateObj
                  .getDate()
                  .toString()
                  .padStart(2, "0")}-${(dateObj.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${dateObj.getFullYear()}`;
                return { ...comment, commentDate: formattedDate };
              }

              return comment;
            })
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
          console.error("Invalid response format:", data);
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

  // Handling clicks on card buttons
  const handleSelectComment = (comment) => {
    setSelectedComment(comment);
  };

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
              <Card className="nominationComment" key={comment._id}>
                <CardHeader
                  title={getFullName(comment.commenterId)}
                  subheader={comment.commentDate}
                  titleTypographyProps={{ variant: "caption" }}
                  subheaderTypographyProps={{ variant: "caption" }}
                />
                <Grid className="commentGrid">
                  <CardContent className="commentBody">
                    {comment.commentBody}
                  </CardContent>
                  {userData.isAdmin && (
                    <DeleteCommentButton
                      comment={comment}
                      onClick={handleSelectComment}
                    />
                  )}
                </Grid>
              </Card>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
}
