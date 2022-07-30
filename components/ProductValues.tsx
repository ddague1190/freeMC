import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues(theme) {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light'}}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/images/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box

                component="img"
                src="/static/svg/website.svg"
                alt="website"

              />
              <Typography variant="h6" sx={{ my: 5 }}>
                A fast and powerful website
              </Typography>
              <Typography variant="h5">
                {
                  'With freeMC, you get the dealership management software,'
                }
                {
                  ', but you also have a linked website - which you can customize via your admin page.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/svg/sales.svg"
                alt="graph"

              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Game-changing sales tools
              </Typography>
              <Typography variant="h5">
                {
                  'A plethora of tools related to logistics of parts, gear, and motorcycles.'
                }
                {'your Sundays will not be alike.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/svg/mechanics.svg"
                alt="clock"

              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Service 
              </Typography>
              <Typography variant="h5">
                {'Track your labor hours, document work performed, import recommended services based on motorcycle model.... '}
                {'The list goes on, but the price is free.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
