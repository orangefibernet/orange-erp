import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import RefreshIcon from "@mui/icons-material/Refresh";

import { useParams } from "react-router-dom";

import OltOverview from "../../components/network/OltOverview";
import OltCardsTable from "../../components/network/OltCardsTable";
import PonPortsTable from "../../components/network/PonPortsTable";
import OnuTable from "../../components/network/OnuTable";

import { useSyncOltCards } from "../../hooks/useSyncOltCards";

export default function OltDetailsPage() {
  const { id } = useParams();

  const [tab, setTab] = useState(0);

  const {
    mutate,
    isPending,
  } = useSyncOltCards();

  if (!id) {
    return (
      <Typography color="error">
        Invalid OLT ID
      </Typography>
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
            OLT Details
          </Typography>

          <Typography color="text.secondary">
            {id}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          disabled={isPending}
          onClick={() => mutate(id)}
        >
          {isPending
            ? "Synchronizing..."
            : "Sync Cards"}
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        sx={{ mb: 3 }}
      >
        <Tab label="Overview" />
        <Tab label="Cards" />
        <Tab label="PON Ports" />
        <Tab label="ONUs" />
      </Tabs>

      {tab === 0 && (
        <OltOverview oltId={id!} />
      )}

      {tab === 1 && (
        <OltCardsTable oltId={id!} />
      )}

      {tab === 2 && (
        <PonPortsTable oltId={id!} />
      )}

      {tab === 3 && (
        <OnuTable oltId={id!} />
      )}
    </Box>
  );
}