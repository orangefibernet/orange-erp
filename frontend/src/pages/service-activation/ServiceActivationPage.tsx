import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// import { useCreateConnection } from "../../hooks/useCreateConnection";
import PackageStep from "../../components/service-activation/PackageStep";
import ConnectionStep from "../../components/service-activation/ConnectionStep";
import { useServiceActivation } from "../../hooks/useServiceActivation";
import { useCustomer } from "../../hooks/useCustomer";

import type { Package } from "../../api/package.api";

const steps = [
  "Customer",
  "Package",
  "Subscription",
  "Connection",
];

export default function ServiceActivationPage() {
  const navigate = useNavigate();

  const { customerId = "" } = useParams();

  const {
    data: customer,
    isLoading,
  } = useCustomer(customerId);

  const [activeStep, setActiveStep] = useState(0);

  const [packageId, setPackageId] = useState("");

  const [selectedPackage, setSelectedPackage] =
    useState<Package | null>(null);

  const [billingDay, setBillingDay] = useState(1);
  const [connectionNumber, setConnectionNumber] =
  useState("");

const [pppoeUsername, setPppoeUsername] =
  useState("");

const [pppoePassword, setPppoePassword] =
  useState("");

const [serviceType, setServiceType] =
  useState("INTERNET");

 const {
  activate,
  isPending,
} = useServiceActivation();

 //   const connectionMutation =
 // useCreateConnection();

  if (isLoading || !customer) {
    return <CircularProgress />;
  }

 async function finish() {
  if (!selectedPackage) {
    return;
  }

  try {
    await activate({
      customerId,

      packageId,

      selectedPackage,

      billingDay,

      connectionNumber,

      pppoeUsername,

      pppoePassword,

      serviceType,
    });

    navigate(`/subscribers/${customerId}`);
  } catch (error) {
    console.error(error);
  }
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
        Activate Internet Service
      </Typography>

      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 4,
        }}
      >
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper
        sx={{
          p: 3,
        }}
      >
        {activeStep === 0 && (
          <>
            <Typography
              variant="h6"
            >
              Customer
            </Typography>

            <Typography
              sx={{
                mt: 2,
              }}
            >
              {customer.fullName}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {customer.customerCode}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {customer.mobile}
            </Typography>
          </>
        )}

        {activeStep === 1 && (
          <>
            <PackageStep
              value={packageId}
              onChange={(
                id,
                pkg,
              ) => {
                setPackageId(id);
                setSelectedPackage(pkg);
              }}
            />

            {selectedPackage && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  border: "1px solid",
                  borderColor:
                    "divider",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Selected Package
                </Typography>

                <Typography>
                  <strong>
                    Name:
                  </strong>{" "}
                  {
                    selectedPackage.name
                  }
                </Typography>

                <Typography>
                  <strong>
                    Speed:
                  </strong>{" "}
                  {
                    selectedPackage.downloadMbps
                  }
                  /
                  {
                    selectedPackage.uploadMbps
                  }
                  Mbps
                </Typography>

                <Typography>
                  <strong>
                    Monthly Price:
                  </strong>{" "}
                  ₹
                  {
                    selectedPackage.monthlyPrice
                  }
                </Typography>

                <Typography>
                  <strong>
                    Billing Cycle:
                  </strong>{" "}
                  {
                    selectedPackage.billingCycle
                  }
                </Typography>
              </Box>
            )}
          </>
        )}

        {activeStep === 2 && (
          <>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
              }}
            >
              Subscription
            </Typography>

            <TextField
              fullWidth
              label="Billing Day"
              type="number"
              value={billingDay}
              onChange={(e) =>
                setBillingDay(
                  Number(
                    e.target.value,
                  ),
                )
              }
            />

            {mutation.isError && (
              <Alert
                severity="error"
                sx={{
                  mt: 2,
                }}
              >
                Failed to create
                subscription.
              </Alert>
            )}
          </>
        )}

        {activeStep === 3 && (
  <ConnectionStep
    connectionNumber={connectionNumber}
    pppoeUsername={pppoeUsername}
    pppoePassword={pppoePassword}
    serviceType={serviceType}
    onConnectionNumberChange={
      setConnectionNumber
    }
    onUsernameChange={
      setPppoeUsername
    }
    onPasswordChange={
      setPppoePassword
    }
    onServiceTypeChange={
      setServiceType
    }
  />
)}

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            mt: 4,
          }}
        >
          <Button
            disabled={
              activeStep === 0
            }
            onClick={() =>
              setActiveStep(
                activeStep - 1,
              )
            }
          >
            Back
          </Button>

          {activeStep < 3 ? (
            <Button
              variant="contained"
              onClick={() =>
                setActiveStep(
                  activeStep + 1,
                )
              }
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={finish}
              disabled={
                mutation.isPending ||
                !selectedPackage
              }
            >
              Activate Service
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}