import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/components/elements/Link';
import Copyright from '../src/Copyright';
import ResponsiveAppBar from '../src/components/AppBar';
import BackToTop from '../src/components/ScrollTop';
import { Toolbar } from "@mui/material";
import ProductHero from '../src/components/ProductHero';
import ProductValues from '../src/components/ProductValues';
import ProductCategories from '../src/components/ProductCategories';
import ProductHowItWorks from '../src/components/ProductHowItWorks';
import ProductSmokingHero from '../src/components/ProductSmokingHero';
import AppFooter from '../src/components/AppFooter';

export default function Index() {
  return (
    <>
      <div id="back-to-top-anchor" />
      <ResponsiveAppBar />
      <BackToTop />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductSmokingHero />
      <AppFooter />
    </>
  );
}
