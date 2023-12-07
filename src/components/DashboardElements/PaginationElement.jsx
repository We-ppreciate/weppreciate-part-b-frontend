import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/system";

export default function PaginationElement() {
  return (
    <Container
      sx={{
        marginTop: "1rem",
        width: "xs",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
        {/* TODO: add interactivity with cards */}
      <Stack spacing={2}>
        <Pagination count={10} />
      </Stack>
    </Container>
  );
}
