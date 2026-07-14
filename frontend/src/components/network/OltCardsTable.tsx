import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useOltCards } from "../../hooks/useOltCards";

interface Props {
  oltId: string;
}

export default function OltCardsTable({
  oltId,
}: Props) {
  const {
    data,
    isLoading,
    error,
  } = useOltCards(oltId);

  if (isLoading) {
    return (
      <Typography>
        Loading installed cards...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Failed to load cards.
      </Typography>
    );
  }

  if (!data?.length) {
    return (
      <Typography>
        No cards found.
      </Typography>
    );
  }

  return (
    <Paper elevation={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rack</TableCell>
            <TableCell>Shelf</TableCell>
            <TableCell>Slot</TableCell>
            <TableCell>Configured</TableCell>
            <TableCell>Actual</TableCell>
            <TableCell align="center">Ports</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((card) => (
            <TableRow
              key={`${card.rack}-${card.shelf}-${card.slot}`}
              hover
            >
              <TableCell>{card.rack}</TableCell>
              <TableCell>{card.shelf}</TableCell>
              <TableCell>{card.slot}</TableCell>
              <TableCell>{card.configuredType}</TableCell>
              <TableCell>{card.realType}</TableCell>
              <TableCell align="center">
                {card.portCount}
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  label={card.status}
                  color={
                    card.status === "INSERVICE"
                      ? "success"
                      : card.status === "STANDBY"
                      ? "warning"
                      : "default"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
