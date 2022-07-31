import * as React from 'react';
import AppBar from "../../components/AppBar";
import AppFooter from "../../components/AppFooter";
import {TodoList} from "../../components/test/TodoList";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import {withIronSessionSsr} from "iron-session/next";
import {ironOptions} from "../../constants/ironOptions";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Paperbase from "../../components/admin/Paperbase";
import Header from "../../components/admin/Header";
import Content from "../../components/admin/Content";
import Navigator from "../../components/admin/Navigator";
import Copyright from "../../components/admin/Copyright";
import { useSelector, useDispatch } from 'react-redux';
import { changeRoute, adminRouteSelector } from "../../store/admin-route/admin-route";
import adminTheme from "../../styles/themes/themeAdmin";
import {  ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';



const drawerWidth = 256;

const AdminPage = (props) => {
  const dispatch = useDispatch();
  const { adminRoute } = useSelector(adminRouteSelector);

  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(adminTheme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  return (
    <ThemeProvider theme={adminTheme}>
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
    </ThemeProvider>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({req}) {
    const user = req.session.user;

    console.log(user);
    if (!user) {
      redirect: {

      }
    }

    return {
      props: {
        user: req.session.user,
      },
    };
  },
  ironOptions
);

export default AdminPage;
