import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import type { Customer } from "../../api/customer.api";

interface Props {
  customers: Customer[];
  loading: boolean;
  error: boolean;
}

export default function SubscriberTable({
  customers,
  loading,
  error,
}: Props) {
  const navigate = useNavigate();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load subscribers.
      </Alert>
    );
  }

  if (!customers.length) {
    return (
      <Alert severity="info">
        No subscribers found.
      </Alert>
    );
  }

  return (
    <Paper elevation={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Customer Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/subscribers/${customer.id}`)
              }
            >
              <TableCell>
                {customer.customerCode}
              </TableCell>

              <TableCell>
                {customer.fullName}
              </TableCell>

              <TableCell>
                {customer.mobile}
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  label={customer.status}
                  color={
                    customer.status === "ACTIVE"
                      ? "success"
                      : customer.status === "LEAD"
                        ? "warning"
                        : "default"
                  }
                />
              </TableCell>

              <TableCell>
                {customer.branch?.name ?? "-"}
              </TableCell>

              <TableCell>
                {new Date(
                  customer.createdAt,
                ).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}