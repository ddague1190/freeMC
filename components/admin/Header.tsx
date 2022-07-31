import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {adminRouteSelector} from "../../store/admin-route/admin-route";

const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
  onDrawerToggle: () => void;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "Createupdate-receipt":
      return {
        heading: "Receipts",
        tabs: ["Create", "Update"],
      };
    case "Reports":
      return {
        heading: "Reports",
        tabs: ["Sales", "Customer reviews"],
      };
    case "Customers":
      return {
        heading: "Customers",
        tabs: ["With open orders", "All"],
      };
    case "Customer's-bikes":
      return {
        heading: "Serviced motorcycles",
        tabs: ["Active", "Completed"],
      };
    case "Bikes-for-sale":
      return {
        heading: "Inventory",
        tabs: ["New", "Pre-owned"],
      };
    case "Receipts":
      return {
        heading: "Receipt",
        tabs: ["Pending work", "Payment required", "Past work"],
      };
    case "Inventory":
      return {
        heading: "Other inventory",
        tabs: ["Parts", "Accessories", "Gear", "Tires"],
      };
    case "Update-shop-info":
      return {
        heading: "General information",
        tabs: [""],
      };
    case "Customize-website":
      return {
        heading: "Website parameters",
        tabs: [""],
      };
    case "Pages":
      return {
        heading: "Website pages",
        tabs: [""],
      };
    case "Open website":
      return initialState;
    default:
      return initialState;
  }
};

const initialState = {
  heading: "Admin Home",
  tabs: [],
};

export default function Header(props: HeaderProps) {
  const [highlightedTabIndex, setHighlightedTabIndex] = React.useState(0);
  const [headerState, headerDispatch] = React.useReducer(reducer, initialState);
  const {adminRoute} = useSelector(adminRouteSelector);
  const {onDrawerToggle} = props;
  React.useEffect(() => {
    setHighlightedTabIndex(0);
    headerDispatch({type: adminRoute});
  }, [adminRoute]);
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{display: {sm: "none", xs: "block"}}} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            {/* <Grid item>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to docs
              </Link>
            </Grid> */}
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                  <Typography>1</Typography>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{p: 0.5}}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{zIndex: 0}}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {headerState.heading}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0}}>
        <Tabs value={highlightedTabIndex} textColor="inherit">
          {headerState.tabs.map((tab, index) => {
            return (
              <Tab
                label={tab}
                key={index}
                onClick={() => {
                  setHighlightedTabIndex(index);
                }}
              />
            );
          })}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}
