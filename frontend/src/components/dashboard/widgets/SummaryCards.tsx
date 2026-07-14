import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import PeopleIcon from "@mui/icons-material/People";
import RouterIcon from "@mui/icons-material/Router";
import CableIcon from "@mui/icons-material/Cable";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import KpiCard from "../KpiCard";
import { useDashboard } from "../../../hooks/useDashboard";

export default function SummaryCards() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <Box
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Alert severity="error">
        Unable to load dashboard summary.
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <KpiCard
          title="Subscribers"
          value={data.customers.total}
          icon={
            <PeopleIcon
              color="primary"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <KpiCard
          title="Active OLTs"
          value={data.network.olts}
          icon={
            <RouterIcon
              color="success"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <KpiCard
          title="Online ONUs"
          value={data.network.onlineOnus}
          icon={
            <CableIcon
              color="warning"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <KpiCard
          title="Pending Bills"
          value={data.billing.pendingBills}
          icon={
            <ReceiptLongIcon
              color="error"
              fontSize="large"
            />
          }
        />
      </Grid>
    </Grid>
  );
}