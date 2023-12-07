import { AddReaction } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

export default function SendCardButton() {
  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button variant="contained" endIcon={<AddReaction />}>
        Send recognition
      </Button>
    </Box>
  );
}
