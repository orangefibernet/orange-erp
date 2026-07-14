import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { useNavigate } from "react-router-dom";

import { useOlts } from "../../hooks/useOlts";

export default function OltTable() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
  } = useOlts();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Paper elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Vendor</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Management IP</TableCell>
            <TableCell>Protocol</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((olt) => (
            <TableRow
              key={olt.id}
              hover
            >
              <TableCell>{olt.name}</TableCell>

              <TableCell>{olt.vendor}</TableCell>

              <TableCell>{olt.model}</TableCell>

              <TableCell>{olt.managementIp}</TableCell>

              <TableCell>{olt.protocol}</TableCell>

              <TableCell>
                <Chip
                  label={olt.status}
                  color={
                    olt.status === "ACTIVE"
                      ? "success"
                      : "default"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell>{olt.location}</TableCell>

              <TableCell align="center">
                <Tooltip title="View OLT">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/olt/${olt.id}`)
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}