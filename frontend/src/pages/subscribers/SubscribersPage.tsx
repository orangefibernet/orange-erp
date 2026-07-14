import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CreateSubscriberDialog from "../../components/subscribers/CreateSubscriberDialog";
import SubscriberTable from "../../components/subscribers/SubscriberTable";
import { useCustomers } from "../../hooks/useCustomers";

export default function SubscribersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useCustomers({
    page,
    pageSize: 25,
    search,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return (
      <Alert severity="error">
        Failed to load subscribers.
      </Alert>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Subscribers
          </Typography>

          <Typography color="text.secondary">
            Manage customer connections
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            disabled={isFetching}
            onClick={() => refetch()}
          >
            Refresh
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            New Subscriber
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <TextField
        fullWidth
        label="Search subscribers"
        placeholder="Customer code, name or mobile..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
        }}
      />

      <SubscriberTable
        customers={data.items}
        loading={isFetching}
        error={false}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Pagination
          page={page}
          count={Math.max(data.pagination.pages, 1)}
          color="primary"
          onChange={(_, value) => setPage(value)}
        />
      </Box>

      <CreateSubscriberDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          refetch();
        }}
      />
    </Box>
  );
}