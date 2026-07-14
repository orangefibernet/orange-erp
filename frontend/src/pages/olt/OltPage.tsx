import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import OltSummaryCards from "../../components/olt/OltSummaryCards";
import OltTable from "../../components/olt/OltTable";

export default function OltPage() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        OLT Management
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Manage Optical Line Terminals
      </Typography>

      <OltSummaryCards />

      <Box sx={{ mt: 4 }}>
        <OltTable />
      </Box>
    </Box>
  );
}