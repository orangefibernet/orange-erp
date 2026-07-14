import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import type { Customer } from "../../../api/customer.api";

interface Props {
  customer: Customer;
}

function Row({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <>
      <Grid size={{ xs: 4 }}>
        <Typography
  color="text.secondary"
  sx={{
    fontWeight: 600,
  }}
>
  
          {label}
        </Typography>
      </Grid>

      <Grid size={{ xs: 8 }}>
        <Typography>
          {value || "-"}
        </Typography>
      </Grid>
    </>
  );
}

export default function CustomerOverview({
  customer,
}: Props) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Customer Information
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={2}
        >
          <Row
            label="Customer Code"
            value={customer.customerCode}
          />

          <Row
            label="Full Name"
            value={customer.fullName}
          />

          <Row
            label="Mobile"
            value={customer.mobile}
          />

          <Row
            label="Email"
            value={customer.email}
          />

          <Row
            label="Status"
            value={customer.status}
          />

          <Row
            label="Customer Type"
            value={customer.customerType}
          />

          <Row
            label="Company"
            value={customer.company?.name}
          />

          <Row
            label="Branch"
            value={customer.branch?.name}
          />

          <Row
            label="Installation Address"
            value={customer.installationAddress}
          />

          <Row
            label="Village"
            value={customer.village}
          />

          <Row
            label="Mandal"
            value={customer.mandal}
          />

          <Row
            label="District"
            value={customer.district}
          />

          <Row
            label="State"
            value={customer.state}
          />

          <Row
            label="Pincode"
            value={customer.pincode}
          />

          <Row
            label="Remarks"
            value={customer.remarks}
          />
        </Grid>
      </CardContent>
    </Card>
  );
}