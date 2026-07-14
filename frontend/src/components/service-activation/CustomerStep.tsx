import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface Props {
  connectionNumber: string;
  pppoeUsername: string;
  pppoePassword: string;
  serviceType: string;

  onConnectionNumberChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onServiceTypeChange: (value: string) => void;
}

export default function ConnectionStep({
  connectionNumber,
  pppoeUsername,
  pppoePassword,
  serviceType,
  onConnectionNumberChange,
  onUsernameChange,
  onPasswordChange,
  onServiceTypeChange,
}: Props) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ mb: 3 }}
      >
        Connection Details
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Connection Number"
            value={connectionNumber}
            onChange={(e) =>
              onConnectionNumberChange(
                e.target.value,
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="PPPoE Username"
            value={pppoeUsername}
            onChange={(e) =>
              onUsernameChange(
                e.target.value,
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="PPPoE Password"
            value={pppoePassword}
            onChange={(e) =>
              onPasswordChange(
                e.target.value,
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Service Type"
            value={serviceType}
            onChange={(e) =>
              onServiceTypeChange(
                e.target.value,
              )
            }
          >
            <MenuItem value="INTERNET">
              Internet
            </MenuItem>

            <MenuItem value="IPTV">
              IPTV
            </MenuItem>

            <MenuItem value="VOICE">
              Voice
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
}