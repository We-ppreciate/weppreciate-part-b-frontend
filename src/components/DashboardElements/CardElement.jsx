import { AddComment, Comment } from "@mui/icons-material";
import { Avatar, Button, Card, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function CardElement() {
  // TODO: add logic for fetching values from backend:
  return (
    <Container
      sx={{
        width: "70vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            {/* TODO: add a second avatar inline, one for recipient and one for poster */}
              <Avatar />
          </Grid>
          <Grid item xs={8}>
            <div>
              <div>
                <Typography variant="h4">Card title</Typography>
              </div>
              <div>
                <Typography variant="body1">Card body</Typography>
              </div>
              {/* TODO: update styling on these elements */}
              <div>
                <Typography variant="body2">Card author</Typography>
              </div>
              <div>
                <Typography variant="body2">Card timestamp</Typography>
              </div>
              <div>
                <Button startIcon={<Comment />}>See comments</Button>
                <Button startIcon={<AddComment />}>Add comment</Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div>
              {/* TODO: make this aligned to the right and vary based on the value attached to the card */}
              <Button>Value button</Button>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
