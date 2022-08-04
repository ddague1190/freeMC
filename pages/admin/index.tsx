import * as React from 'react';
import getMongoDb from '../../utils/db/mongodb';
import {withIronSessionSsr} from "iron-session/next";
import {ironOptions} from "../../constants/ironOptions";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../components/admin/Header";
import Content from "../../components/admin/Content";
import Navigator from "../../components/admin/Navigator";
import Copyright from "../../components/admin/Copyright";
import adminTheme from "../../styles/themes/themeAdmin";
import Box from '@mui/material/Box';
import {NextPage} from 'next';
import {connect} from 'react-redux';
import { setUserInfo } from '../../store/user-info/user-info';
import { wrapper, RootState } from '../../store/configureStore';



const drawerWidth = 256;

const AdminPage = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(adminTheme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (

      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            <Content />
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
  );
};


export const getServerSideProps = withIronSessionSsr(wrapper.getServerSideProps(store =>async ({req, res, ...etc}) => {
  const user = req.session.user;

  const db = await getMongoDb();
}), ironOptions);

export default connect((state: RootState) => state)(AdminPage);

// export const getServerSideProps = withIronSessionSsr(
//   async function getServerSideProps({req}) {
//     const user = req.session.user;
//     const db = await getMongoDb();
//     const store

//     if (!user) {
//       redirect: {

//       }
//     }

//     return {
//       props: {
//         user: req.session.user,
//       },
//     };
//   },
//   ironOptions
// );

// export default AdminPage;
