import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useParams } from "react-router-dom";

import { useOnuDetail } from "../../hooks/useOnuDetail";

import {
  useDisableOnu,
  useEnableOnu,
  useFactoryResetOnu,
  useRebootOnu,
} from "../../hooks/useOnuOperations";

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

export default function OnuDetailsPage() {
  const {
    id,
    interfaceName,
  } = useParams();

  if (!id || !interfaceName) {
    return (
      <Alert severity="error">
        Invalid ONU.
      </Alert>
    );
  }

  const {
    data,
    isLoading,
    error,
  } = useOnuDetail(
    id,
    decodeURIComponent(interfaceName),
  );

  const reboot = useRebootOnu();
  const enable = useEnableOnu();
  const disable = useDisableOnu();
  const factoryReset =
    useFactoryResetOnu();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return (
      <Alert severity="error">
        Failed to load ONU details.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        ONU Details
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        {data.interfaceName}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          startIcon={<RestartAltIcon />}
          disabled={reboot.isPending}
          onClick={() =>
            reboot.mutate({
              oltId: id,
              interfaceName,
            })
          }
        >
          Reboot
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircleIcon />}
          disabled={enable.isPending}
          onClick={() =>
            enable.mutate({
              oltId: id,
              interfaceName,
            })
          }
        >
          Enable
        </Button>

        <Button
          variant="contained"
          color="warning"
          startIcon={<BlockIcon />}
          disabled={disable.isPending}
          onClick={() =>
            disable.mutate({
              oltId: id,
              interfaceName,
            })
          }
        >
          Disable
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteForeverIcon />}
          disabled={
            factoryReset.isPending
          }
          onClick={() => {
            if (
              window.confirm(
                "Factory reset this ONU?"
              )
            ) {
              factoryReset.mutate({
                oltId: id,
                interfaceName,
              });
            }
          }}
        >
          Factory Reset
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Description</Label>
            <Typography color="text.secondary">
              {data.description || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Serial Number</Label>
            <Typography color="text.secondary">
              {data.serialNumber || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Vendor</Label>
            <Typography color="text.secondary">
              {data.vendor || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Model</Label>
            <Typography color="text.secondary">
              {data.model || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Status</Label>
            <Typography color="text.secondary">
              {data.status || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Authentication</Label>
            <Typography color="text.secondary">
              {data.authenticationType || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Distance</Label>
            <Typography color="text.secondary">
              {data.distance || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Password</Label>
            <Typography color="text.secondary">
              {data.password || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Firmware</Label>
            <Typography color="text.secondary">
              {data.firmwareVersion || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Hardware</Label>
            <Typography color="text.secondary">
              {data.hardwareVersion || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>Registration Time</Label>
            <Typography color="text.secondary">
              {data.registrationTime || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Label>ONU Index</Label>
            <Typography color="text.secondary">
              {data.onuIndex}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}