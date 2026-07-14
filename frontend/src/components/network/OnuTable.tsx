import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import { useOnus } from "../../hooks/useOnus";

interface Props {
  oltId: string;
}

export default function OnuTable({
  oltId,
}: Props) {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
  } = useOnus(oltId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load ONUs.
      </Alert>
    );
  }

  if (!data?.length) {
    return (
      <Alert severity="info">
        No ONUs found.
      </Alert>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "interfaceName",
      headerName: "Interface",
      flex: 2,
      minWidth: 220,
    },
    {
      field: "onuId",
      headerName: "ONU ID",
      width: 100,
    },
    {
      field: "adminState",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "omccState",
      headerName: "OMCC",
      width: 140,
    },
    {
      field: "phaseState",
      headerName: "Phase",
      width: 140,
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Chip
          size="small"
          color={
            params.row.online
              ? "success"
              : "error"
          }
          label={
            params.row.online
              ? "ONLINE"
              : "OFFLINE"
          }
        />
      ),
    },
  ];

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 700,
        }}
      >
        ONU Management
      </Typography>

      <DataGrid
        rows={data.map((onu) => ({
          ...onu,
          id: onu.interfaceName,
        }))}
        columns={columns}
        autoHeight
        pageSizeOptions={[
          10,
          25,
          50,
          100,
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
              page: 0,
            },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
        onRowClick={(params) =>
          navigate(
            `/olt/${oltId}/onu/${encodeURIComponent(
              params.row.interfaceName,
            )}`,
          )
        }
      />
    </Box>
  );
}