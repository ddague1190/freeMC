import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '../src/components/elements/Markdown';
import Typography from '../src/components/elements/Typography';
import AppAppBar from '../src/components/AppBar';
import AppFooter from '../src/components/AppFooter';
import privacy from '../data/markdown/privacy.md';

export default function Privacy() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Privacy
          </Typography>
          <Markdown>{privacy}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}
