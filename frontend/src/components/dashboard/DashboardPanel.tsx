import { Card, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface DashboardPanelProps {
  title: string;
  children: ReactNode;
}

export default function DashboardPanel({
  title,
  children,
}: DashboardPanelProps) {
  return (
    <Card
      elevation={2}
      sx={{ height: "100%" }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        {children}
      </CardContent>
    </Card>
  );
}