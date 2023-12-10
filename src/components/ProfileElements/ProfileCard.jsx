import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid
} from "@mui/material";
import "../../styles/index.css"

export default function ProfileCard() {
  return (
    <Grid  
    className="cardGrid"
    container
    spacing={0}>
      <Card className="profileCardHeader">
        <CardHeader className="profileCardHeader"
          avatar={
            // Need to link this to the user's avatar
            <Avatar />
          }
          action={
            // What renders here depends if it's own profile or another user's profile
            <Button variant="contained">Button here</Button>
          }
          title="Employee name here"
          subheader="Employee title here"
        />
        <CardContent className="profileCardBio">
        Info on employee here
        </CardContent>
      </Card>
      <Card>
          Awards here
      </Card>
      <Card>
        Recognition cards here
      </Card>
    </Grid>
  );
}
