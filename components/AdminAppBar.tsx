import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link, {NextLinkComposed} from "./elements/Link";
import NavLink from "./elements/NavLink";
import AdbIcon from "@mui/icons-material/Adb";
const pages = ["Features", "Tutorials", "Pricing", "About"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AdminAppBar = () => {
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{display: {xs: "flex"}, mr: 1}} />
          <Typography>Currently logged in as admin for 'site'</Typography>

          <Box sx={{flexGrow: 0, gap: "5px"}}>
            <NavLink to="/sign-in" sx={{bgcolor: "secondary.main"}}>
              Admin page
            </NavLink>
            <NavLink sx={{color: "white"}} to="/sign-up">
              Logout
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AdminAppBar;
