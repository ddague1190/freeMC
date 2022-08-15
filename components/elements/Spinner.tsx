import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  show: boolean
}

export default function LinearIndeterminate({show}:Props) {

  return (
    <>
      {show && (
        <Box sx={{width: "100%"}}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}
