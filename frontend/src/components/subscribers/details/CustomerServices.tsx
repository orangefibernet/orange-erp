import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  customer: any;
}

export default function CustomerServices({
  customer,
}: Props) {
  const subscriptions =
    customer.subscriptions ?? [];

  if (subscriptions.length === 0) {
    return (
      <Alert severity="info">
        No active services found for this customer.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      {subscriptions.map((service: any) => (
        <Card key={service.id}>
          <CardContent>
            <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  }}
>
              <Typography variant="h6">
                Internet Service
              </Typography>

              <Chip
                label={service.status}
                color="success"
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Typography>
              <strong>Package ID:</strong>{" "}
              {service.packageId}
            </Typography>

            <Typography>
              <strong>Monthly Price:</strong> ₹
              {service.monthlyPrice}
            </Typography>

            <Typography>
              <strong>Billing Cycle:</strong>{" "}
              {service.billingCycle}
            </Typography>

            <Typography>
              <strong>Billing Day:</strong>{" "}
              {service.billingDay}
            </Typography>

            <Typography>
              <strong>Start Date:</strong>{" "}
              {new Date(
                service.startDate,
              ).toLocaleDateString()}
            </Typography>

            <Typography>
              <strong>Expiry Date:</strong>{" "}
              {new Date(
                service.expiryDate,
              ).toLocaleDateString()}
            </Typography>

            <Typography>
              <strong>Auto Renew:</strong>{" "}
              {service.autoRenew
                ? "Yes"
                : "No"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}