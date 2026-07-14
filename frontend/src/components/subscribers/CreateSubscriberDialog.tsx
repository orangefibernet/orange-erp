import { useState } from "react";

import Alert from "@mui/material/Alert";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useCreateCustomer } from "../../hooks/useCreateCustomer";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateSubscriberDialog({
  open,
  onClose,
}: Props) {
  const createCustomer = useCreateCustomer();

  const [form, setForm] = useState({
    companyId: "34859b3e-1aec-4765-b63b-afb72831ceb0",
branchId: "77924094-4297-43d8-9092-b3d3e643cf72",

    customerCode: "",

    firstName: "",
    lastName: "",
    fullName: "",

    mobile: "",

    email: "",

    customerType: "HOME",
    status: "LEAD",

    installationAddress: "",

    village: "",
    mandal: "",
    district: "",
    state: "",
    pincode: "",

    remarks: "",
  });

  function update(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,

      ...(field === "firstName" || field === "lastName"
        ? {
            fullName: `${
              field === "firstName"
                ? value
                : prev.firstName
            } ${
              field === "lastName"
                ? value
                : prev.lastName
            }`.trim(),
          }
        : {}),
    }));
  }

  async function handleSubmit() {
    await createCustomer.mutateAsync(form);

    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Create Subscriber
      </DialogTitle>

      <DialogContent>
        {createCustomer.isError && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            Failed to create subscriber.
          </Alert>
        )}

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Customer Code"
              value={form.customerCode}
              onChange={(e) =>
                update(
                  "customerCode",
                  e.target.value,
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Mobile"
              value={form.mobile}
              onChange={(e) =>
                update(
                  "mobile",
                  e.target.value,
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              value={form.firstName}
              onChange={(e) =>
                update(
                  "firstName",
                  e.target.value,
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              value={form.lastName}
              onChange={(e) =>
                update(
                  "lastName",
                  e.target.value,
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Email"
              value={form.email}
              onChange={(e) =>
                update(
                  "email",
                  e.target.value,
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Installation Address"
              value={form.installationAddress}
              onChange={(e) =>
                update(
                  "installationAddress",
                  e.target.value,
                )
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Remarks"
              value={form.remarks}
              onChange={(e) =>
                update(
                  "remarks",
                  e.target.value,
                )
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={createCustomer.isPending}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={createCustomer.isPending}
        >
          {createCustomer.isPending
            ? "Creating..."
            : "Create Subscriber"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}