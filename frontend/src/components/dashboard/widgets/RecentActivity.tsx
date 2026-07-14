import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import DashboardPanel from "../DashboardPanel";

export default function RecentActivity() {
  return (
    <DashboardPanel title="Recent Provisioning">
      <List dense>
        <ListItem>
          <ListItemText
            primary="ONU Added"
            secondary="Customer #10251"
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="ONU Rebooted"
            secondary="OLT-03 / PON-08"
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="ONU Renamed"
            secondary="FTTH-2201"
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Service Activated"
            secondary="PPPoE Account Created"
          />
        </ListItem>
      </List>
    </DashboardPanel>
  );
}