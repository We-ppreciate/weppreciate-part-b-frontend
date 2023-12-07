import { Comment } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";


export default function CardElement() {
  // TODO: add logic for fetching values from backend:
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card>
        {/* TODO: add logic to display the user avatars */}
        <CardHeader
          avatar={<AvatarGroup><Avatar/><Avatar/></AvatarGroup>}
          action={<Button>Value</Button>}
          title="Card title"
          subheader="Card timestamp"
        />
        <CardContent>
          <div>
            <Typography variant="body1">Card body</Typography>
          </div>
          {/* TODO: update styling on these elements */}
          <div>
            <Typography variant="body2">Card author</Typography>
          </div>
        </CardContent>
        <CardActions>
          
          {/* TODO: look at whether this button expands to display the comments? */}
          <Button startIcon={<Comment />}>Comments</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
