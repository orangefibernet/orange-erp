import Grid from "@mui/material/Grid";
import RouterIcon from "@mui/icons-material/Router";
import CableIcon from "@mui/icons-material/Cable";
import HubIcon from "@mui/icons-material/Hub";
import MemoryIcon from "@mui/icons-material/Memory";

import KpiCard from "../dashboard/KpiCard";
import { useOlts } from "../../hooks/useOlts";

export default function OltSummaryCards() {
  const { data } = useOlts();

  const totalOlts = data?.length ?? 0;

  const activeOlts =
    data?.filter((o) => o.status === "ACTIVE").length ?? 0;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <KpiCard
          title="Total OLTs"
          value={totalOlts}
          icon={<RouterIcon color="primary" fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <KpiCard
          title="Active OLTs"
          value={activeOlts}
          icon={<HubIcon color="success" fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <KpiCard
          title="Protocols"
          value="TELNET"
          icon={<CableIcon color="warning" fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <KpiCard
          title="Vendors"
          value="ZTE"
          icon={<MemoryIcon color="secondary" fontSize="large" />}
        />
      </Grid>
    </Grid>
  );
}