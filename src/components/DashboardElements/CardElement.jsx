import { Comment } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import "../../styles/index.css"


export default function CardElement() {
  // TODO: add logic for fetching values from backend:
  return (
    <Grid  
    className="cardGrid"
    container
    spacing={0}>
      <Card>
        {/* TODO: add logic to display the user avatars */}
        <CardHeader className="cardHeader"
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
            <Typography variant="body2">Posted by Card author</Typography>
          </div>
        </CardContent>
        <CardActions className="cardComment">
          
          {/* TODO: look at whether this button expands to display the comments? */}
          <Button startIcon={<Comment />}>Comments</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
