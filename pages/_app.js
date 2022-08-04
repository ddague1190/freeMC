import * as React from 'react';
import '../styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../styles/themes/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { wrapper } from "../store/configureStore";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../store/user-info/user-info';

async function checkForLoggedInUser(dispatch) {
  const { data } = await axios.get('/api/user/');
  if(data.user) {
    dispatch(setUserInfo(data.user))
  }
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps, ...rest }) {
  const dispatch = useDispatch();

  React.useEffect(()=>{
    checkForLoggedInUser(dispatch)
  }, [])
  

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
