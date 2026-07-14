import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import RouterIcon from "@mui/icons-material/Router";
import CableIcon from "@mui/icons-material/Cable";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { getNavigationItems } from "../../core/modules";
import { Link, useLocation } from "react-router-dom";

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <DashboardIcon />,
  subscribers: <PeopleIcon />,
  billing: <PaymentsIcon />,
  inventory: <Inventory2Icon />,
  olt: <RouterIcon />,
  onu: <CableIcon />,
  reports: <AssessmentIcon />,
  settings: <SettingsIcon />,
};

const drawerWidth = 250;



export default function Sidebar() {
  const location = useLocation();
  const menu = getNavigationItems();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#f57c00",
          }}
        >
          OrangeERP
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Enterprise ISP Platform
        </Typography>
      </Box>

      <Divider />

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 2,
            }}
          >
            <ListItemIcon>
  {item.icon ? iconMap[item.icon] : null}
</ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="body2">
          OrangeERP v1.0
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          Orange Fibernet
        </Typography>
      </Box>
    </Drawer>
  );
}