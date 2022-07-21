import * as React from 'react';
import Button from './elements/Button';
import Typography from '@mui/material/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  '/static/images/hero.jpg';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
        <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Focused tools to help you manage your business
      </Typography>
      <Typography color="inherit" align="center" variant="h4" marked="center">
        freeMC: the open-source motorcycle dealership platform 
      </Typography>
    </ProductHeroLayout>
  );
}
