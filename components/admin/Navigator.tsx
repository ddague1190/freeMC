import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer, {DrawerProps} from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import slugify from 'slugify';
import { useDispatch, useSelector } from 'react-redux';
import { changeRoute, adminRouteSelector } from "../../store/admin-route/admin-route";

const categories = [
  {
    id: "Actions",
    children: [
      {id: "Create/update receipt", data: true, icon: <DnsRoundedIcon />},
      {id: "Reports", icon: <DnsRoundedIcon />},
    ],
  },
  {
    id: "Records",
    children: [
      {id: "Customers", icon: <PeopleIcon /> },
      {id: "Customer's bikes", icon: <DnsRoundedIcon />},
      {id: "Bikes for sale", icon: <DnsRoundedIcon />},
      {id: "Receipts", icon: <PermMediaOutlinedIcon />},
      {id: "Inventory", icon: <PermMediaOutlinedIcon />},
    ],
  },
  {
    id: "Website build",
    children: [
      {id: "Update shop info", icon: <SettingsInputComponentIcon />},
      {id: "Customize website", icon: <SettingsInputComponentIcon />},
      {id: "Pages", icon: <SettingsIcon />},
      {id: "Open website", icon: <HomeIcon />},
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const {...other} = props;
  const {route} = useSelector(adminRouteSelector);
  const dispatch = useDispatch();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: "#fff"}}>
          Your shop
        </ListItem>
        {categories.map(({id, children}) => (
          <Box key={id} sx={{bgcolor: "#101F33"}}>
            <ListItem sx={{py: 2, px: 3}}>
              <ListItemText sx={{color: "#fff"}}>{id}</ListItemText>
            </ListItem>
            {children.map(({id: childId, icon, active}) => (
              <ListItem disablePadding key={childId} onClick={()=>dispatch(changeRoute({route: slugify(childId)}))}>
                <ListItemButton selected={slugify(childId) === route } sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{mt: 2}} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
