import * as React from "react";
import Button from "./elements/Button";
import Typography from "@mui/material/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import NavLink from "./elements/NavLink";

const backgroundImage = "/static/images/hero.jpg";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{display: "none"}}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{mb: 4, mt: {sx: 4, sm: 10}}}>
        Focused tools to help you manage your business
      </Typography>
      <Typography color="inherit" align="center" variant="h4" marked="center" sx={{mb: 4}}>
        freeMC: the open-source motorcycle dealership management system
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{minWidth: 200}}>
        What is a dealership management system?
      </Button>
    </ProductHeroLayout>
  );
}
