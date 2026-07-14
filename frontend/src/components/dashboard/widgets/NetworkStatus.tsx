import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import DashboardPanel from "../DashboardPanel";

export default function NetworkStatus() {
  return (
    <DashboardPanel title="Network Status">
      <List dense>
        <ListItem>
          <ListItemText
            primary="OLTs Online"
            secondary="18 / 18"
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="PON Ports"
            secondary="112 Active"
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Online ONUs"
            secondary="8,764"
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Offline ONUs"
            secondary="247"
          />
        </ListItem>
      </List>
    </DashboardPanel>
  );
}