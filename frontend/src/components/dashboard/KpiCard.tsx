import { Box, Card, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export default function KpiCard({
  title,
  value,
  icon,
}: KpiCardProps) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{ fontWeight: 700 }}
            >
              {value}
            </Typography>
          </Box>

          <Box>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}