import Paper from "../elements/Paper";
import Box from "@mui/material/Box";
import UploadButtons from "../elements/UploadButton";
import React from "react";

const UploadBox = () => {
  return (
    <Box
    padding={5}
      sx={{
        display: "flex",
        justifyContent: 'center',
        margin: "0 auto",
      }}>
      <Paper elevation={12} padding={12}>
        <UploadButtons />
      </Paper>
    </Box>
  );
};

export default UploadBox;
