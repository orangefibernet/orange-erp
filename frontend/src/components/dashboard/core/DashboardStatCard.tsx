import type { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
}

export default function DashboardStatCard({
  title,
  value,
  subtitle,
  icon,
}: Props) {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Stack
            sx={{
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              {value}
            </Typography>

            {subtitle && (
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}
          </Stack>

          {icon}
        </Stack>
      </CardContent>
    </Card>
  );
}