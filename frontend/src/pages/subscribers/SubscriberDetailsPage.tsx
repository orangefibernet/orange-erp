import { useState } from "react";
import { useParams } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CustomerOverview from "../../components/subscribers/details/CustomerOverview";
import { useCustomer } from "../../hooks/useCustomer";

export default function SubscriberDetailsPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const {
    data: customer,
    isLoading,
    isError,
  } = useCustomer(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !customer) {
    return (
      <Alert severity="error">
        Unable to load subscriber.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        {customer.fullName}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
          >
            <Tab label="Overview" />
            <Tab label="Network" />
            <Tab label="Billing" />
            <Tab label="Timeline" />
          </Tabs>
        </CardContent>
      </Card>
      <Box
  sx={{
    mb: 3,
  }}
>
  <Button
    variant="contained"
    onClick={() =>
      navigate(`/service-activation/${customer.id}`)
    }
  >
    Activate Internet Service
  </Button>
</Box>

      {tab === 0 && (
        <CustomerOverview customer={customer} />
      )}

      {tab === 1 && (
        <Alert severity="info">
          Network module coming next.
        </Alert>
      )}

      {tab === 2 && (
        <Alert severity="info">
          Billing module coming next.
        </Alert>
      )}

      {tab === 3 && (
        <Alert severity="info">
          Timeline module coming next.
        </Alert>
      )}
    </Box>
  );
}