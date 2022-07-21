import * as React from "react";
import {Theme} from "@mui/material/styles";
import {SxProps} from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "./elements/Button";
import Typography from "./elements/Typography";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
  marginBottom: '24px',
};

const image = {
  height: 55,
  my: 4,
};

const stepTypography = {
    height: {md: '100px'}
}

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{display: "flex", bgcolor: "secondary.light", overflow: "hidden"}}>
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Box
          component="img"
          src="/static/images/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{mb: 14}}>
          Getting started
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Typography sx={stepTypography} variant="h5" align="center">
                  Create an account for your shop and explore the features
                  during a 14-day trial period.
                </Typography>
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  component="a"
                  href="/features"
                  sx={{mt: 8}}>
                    Features
                  </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Typography sx={stepTypography} variant="h5" align="center">
                  After the trial period, enroll in one of the subscription
                  tiers.
                </Typography>
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  component="a"
                  href="/pricing"
                  sx={{mt: 8}}>
                    Pricing
                  </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Typography sx={stepTypography} variant="h5" align="center">
                  Optionally connect your website url to your shop here.
                  Customize your online presence.
                </Typography>
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  component="a"
                  href="/tutorials"
                  sx={{mt: 8}}>
                  Tutorials
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>

      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
