import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '../src/components/elements/Markdown';
import Typography from '../src/components/elements/Typography';
import AppBar from '../src/components/AppBar';
import AppFooter from '../src/components/AppFooter';
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

