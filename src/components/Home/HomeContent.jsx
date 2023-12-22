import { ArrowForward, Help } from "@mui/icons-material";
import { Alert, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function HomeContent() {
  return (
    <div className="homeContent">
      <div className="homeLeft">
        <Alert className="homeAlert" severity="info">
          You work hard. We'ppreciate you.
        </Alert>
        <Typography className="homeTitle" variant="h2">We'ppreciate</Typography>
        <Typography className="homeSubtext" variant="body1">
          Employee recognition made simple.
        </Typography>
        <Box className="homeButtonBox">
          <Link to="/login">
            <Button variant="contained" className="homeButton" endIcon={<ArrowForward />}>
              Login
            </Button>
          </Link>
          <Link to="https://github.com/We-ppreciate" target="_blank">
            <Button variant="contained" className="homeButton" endIcon={<Help />}>
              Learn more
            </Button>
          </Link>
        </Box>
      </div>
      <div className="homeRight">
        <img
          className="homeRabbit"
          alt="A realistic animated rabbit in a worker jumpsuit"
          src="https://storage.googleapis.com/weppreciate-store/award/anima_rabbit.png"
        ></img>
      </div>
    </div>
  );
}
