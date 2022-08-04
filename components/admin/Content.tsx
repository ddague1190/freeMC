import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import {useSelector, useReducer} from "react-redux";
import {adminRouteSelector, COMPONENT_MAP} from "../../store/admin-route/admin-route";




export default function Content() {
  const adminRouteData = useSelector(adminRouteSelector);
  const COMPONENT_ID = adminRouteData.tabs[adminRouteData.selectedTabIndex].component;
  const COMPONENT = COMPONENT_MAP[COMPONENT_ID]
  return (
    <COMPONENT />
  );
}
