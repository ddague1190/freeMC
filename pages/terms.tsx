import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '../components/elements/Markdown';
import Typography from '../components/elements/Typography';
import AppBar from '../components/AppBar';
import AppFooter from '../components/AppFooter';
import terms from '../data/markdown/terms.md';

export default function Terms() {
  return (
    <React.Fragment>
      <AppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

