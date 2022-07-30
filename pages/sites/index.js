import React from 'react'
import AppBar from '../../components/AppBar';
import AppFooter from "../../components/AppFooter";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '../../components/elements/Typography';
import { NextLinkComposed } from "../../components/elements/Link";

const SiteIndex = () => {
  return (
    <>
      <AppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Current shops
          </Typography>
          <Box>
            <NextLinkComposed
            to='/sites/test'>
              Test
            </NextLinkComposed>
          </Box>
        </Box>
      </Container>
      <AppFooter />
    </>
  )
}

export default SiteIndex