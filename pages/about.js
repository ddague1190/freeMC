import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '../components/elements/Markdown';
import Typography from '../components/elements/Typography';
import AppAppBar from '../components/AppBar';
import AppFooter from '../components/AppFooter';
import privacy from '../data/markdown/privacy.md';
import { Grid } from "@mui/material";


export default function AboutPage() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
      <Box sx={{ mt: 7, mb: { xs: 10, md: 20 } }}>

        <Typography variant="h4" gutterBottom marked="left" >
          About
        </Typography>
        <Typography variant="h5" gutterBottom marked="center" >
          I am a programmer and veteran motorcyclist. My brother - pictured below - was a race mechanic who dreamed of opening his own motorcycle shop. He passed away while riding. Thus this project is personal. However - first and foremost - this project is an exercise in engineering cloud-based software to serve a specialized business need. I will maintain this platform indefinitely.
        </Typography>
        </Box>
        <Box sx={{ mt: 7, mb: { xs: 10, md: 20 } }}>


          <Grid container>
            <Grid item xs={12} md={6} sx={{ zIndex: 1 }} >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10rem',
                  justifyContent: 'center',
                  bgcolor: 'warning.main',
                  py: 12,
                  px: 3,
                }}
              >
                <Typography variant='h5'>
                  I believe that the world would be a better place if more people rode motorcycles. I hope this project will help one person who makes it their business to bring this vision to actuality.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }} >
              <Box
                sx={{
                  position: 'absolute',
                  top: -67,
                  left: -67,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  background: 'url(/static/images/imageDots.png)',
                }}
              />

              <Box component='div'
                sx={{
                  position: 'absolute',
                  top: -60,
                  left: -50,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  maxWidth: 400,
                }}>
                <Box
                  component="img"
                  src="/static/images/damon.jpeg"
                  alt="call to action"
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                />
                <Typography
                  variant='h5'
                  sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    position: 'absolute',
                    display: 'block',
                    textAlign: 'center',
                    transform: 'translate(-50%, 0)',
                    left: '50%',
                    top: '100%',
                    width: '100%',
                    zIndex: 100,
                    fontWeight: 700,
                    p: 3
                  }}>
                  My brother Damon with his 1987 Honda Hurricane
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

      </Container>
      <AppFooter />
    </React.Fragment>
  );
}
