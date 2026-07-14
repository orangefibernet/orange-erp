import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { usePonPorts } from "../../hooks/usePonPorts";

interface Props {
  oltId: string;
}

export default function PonPortsTable({
  oltId,
}: Props) {
  const {
    data,
    isLoading,
    error,
  } = usePonPorts(oltId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load PON ports.
      </Alert>
    );
  }

  if (!data?.length) {
    return (
      <Typography>
        No PON ports found.
      </Typography>
    );
  }

  return (
    <Paper elevation={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>PON</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Online</TableCell>
            <TableCell align="center">Offline</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((port) => (
            <TableRow
              hover
              key={port.id}
            >
              <TableCell>
                {port.name}
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  label={port.status}
                  color={
                    port.status === "ACTIVE"
                      ? "success"
                      : "default"
                  }
                />
              </TableCell>

              <TableCell align="center">
                {port.onlineOnus}
              </TableCell>

              <TableCell align="center">
                {port.offlineOnus}
              </TableCell>

              <TableCell align="center">
                {port.totalOnus}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}