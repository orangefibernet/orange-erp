import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import CableIcon from "@mui/icons-material/Cable";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PeopleIcon from "@mui/icons-material/People";
import RouterIcon from "@mui/icons-material/Router";

import DashboardPanel from "../../components/dashboard/DashboardPanel";
import KpiCard from "../../components/dashboard/KpiCard";

export default function DashboardPage() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        OrangeERP Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Welcome to the OrangeERP Network Operations Center
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Subscribers"
            value="6,012"
            icon={<PeopleIcon color="primary" fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Active OLTs"
            value="18"
            icon={<RouterIcon color="success" fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Online ONUs"
            value="8,764"
            icon={<CableIcon color="warning" fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Today's Revenue"
            value="₹42,380"
            icon={<CurrencyRupeeIcon color="success" fontSize="large" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardPanel title="Network Status">
            <List dense>
              <ListItem>
                <ListItemText primary="OLTs Online" secondary="18 / 18" />
              </ListItem>
              <ListItem>
                <ListItemText primary="PON Ports" secondary="112 Active" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Online ONUs" secondary="8,764" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Offline ONUs" secondary="247" />
              </ListItem>
            </List>
          </DashboardPanel>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardPanel title="Recent Provisioning">
            <List dense>
              <ListItem>
                <ListItemText primary="ONU Added" secondary="Customer #10251" />
              </ListItem>
              <ListItem>
                <ListItemText primary="ONU Rebooted" secondary="OLT-03 / PON-8" />
              </ListItem>
              <ListItem>
                <ListItemText primary="ONU Renamed" secondary="FTTH-2201" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Service Activated" secondary="PPPoE Created" />
              </ListItem>
            </List>
          </DashboardPanel>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <DashboardPanel title="System Health">
            <Typography>
              ✔ Backend API Connected
            </Typography>

            <Typography>
              ✔ Database Online
            </Typography>

            <Typography>
              ✔ Network Management Ready
            </Typography>

            <Typography>
              ✔ Plugin System Loaded
            </Typography>
          </DashboardPanel>
        </Grid>
      </Grid>
    </Box>
  );
}