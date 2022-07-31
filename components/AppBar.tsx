import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import {NextLinkComposed} from "./elements/Link";
import NavLink from "./elements/NavLink";
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["Features", "Tutorials", "Pricing", "About"];
const settings = ["Profile", "Account", "Admin"];
import {notificationSelector} from "../store/notification/notification";
import {useDispatch, useSelector} from "react-redux";
import SnackBar from "./elements/SnackBar";
import {clearUserInfo, userInfoSelector} from "../store/user-info/user-info";

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const {messageNotification, isShownNotification} = useSelector(notificationSelector);
  const user = useSelector(userInfoSelector);


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <SnackBar open={isShownNotification} message={messageNotification} />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{display: {xs: "none", md: "flex"}, mr: 1}} />

            {/* md and larger screens */}
            <NextLinkComposed
              variant="h6"
              nowrap="true"
              component="a"
              to="/"
              sx={{
                mr: 2,
                display: {xs: "none", md: "flex"},
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              freeMC
            </NextLinkComposed>

            {/* hamburger icon and dropdown menu - md and smaller screens */}

            <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: "block", md: "none"},
                }}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <NextLinkComposed
                      sx={{textDecoration: "none", color: "black"}}
                      to={`/${page.toLowerCase()}`}
                      textalign="center">
                      {page}
                    </NextLinkComposed>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* xs screen logo  */}
            <AdbIcon sx={{display: {xs: "flex", md: "none"}, mr: 1}} />
            <NextLinkComposed
              variant="h5"
              nowrap="true"
              component="a"
              to="/"
              sx={{
                mr: 2,
                display: {xs: "flex", md: "none"},
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              freeMC
            </NextLinkComposed>
            <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
              {pages.map((page) => (
                <NavLink
                  to={`/${page.toLowerCase()}`}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{my: 2, color: "white", display: "block"}}>
                  {page}
                </NavLink>
              ))}
            </Box>

            <Box sx={{flexGrow: 0, gap: "5px"}}>
              {user.id ? (
                <NavLink sx={{color: "white"}} to="" onClick={() => dispatch(clearUserInfo())}>
                  Sign Out
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/sign-in"
                    sx={{color: "white", bgcolor: "secondary.main"}}>
                    Sign In
                  </NavLink>
                  <NavLink sx={{color: "white"}} to="/sign-up">
                    Sign Up
                  </NavLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
