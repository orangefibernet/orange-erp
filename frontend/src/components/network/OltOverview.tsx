import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useOlt } from "../../hooks/useOlt";

interface Props {
  oltId: string;
}

function Label({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Typography
      sx={{
        fontWeight: 600,
      }}
    >
      {children}
    </Typography>
  );
}

export default function OltOverview({
  oltId,
}: Props) {
  const {
    data,
    isLoading,
    error,
  } = useOlt(oltId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return (
      <Alert severity="error">
        Failed to load OLT information.
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ mb: 3 }}
      >
        OLT Information
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Label>Name</Label>
          <Typography color="text.secondary">
            {data.name}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Label>Vendor</Label>
          <Typography color="text.secondary">
            {data.vendor}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Label>Model</Label>
          <Typography color="text.secondary">
            {data.model}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Label>Management IP</Label>
          <Typography color="text.secondary">
            {data.managementIp}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Label>Protocol</Label>
          <Typography color="text.secondary">
            {data.protocol}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Label>Status</Label>
          <Typography color="text.secondary">
            {data.status}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Label>Location</Label>
          <Typography color="text.secondary">
            {data.location}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Label>Telnet Port</Label>
          <Typography color="text.secondary">
            {data.telnetPort}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}