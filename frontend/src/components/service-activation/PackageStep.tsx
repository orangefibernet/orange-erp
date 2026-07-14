import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import {
  usePackages,
} from "../../hooks/usePackages";

import type {
  Package,
} from "../../api/package.api";

interface Props {
  value: string;
  onChange: (
    packageId: string,
    pkg: Package,
  ) => void;
}

export default function PackageStep({
  value,
  onChange,
}: Props) {
  const {
    data: packages,
    isLoading,
  } = usePackages();

  if (isLoading) {
    return (
      <Typography>
        Loading packages...
      </Typography>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{ p: 3 }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Select Internet Package
      </Typography>

      <FormControl fullWidth>
        <InputLabel>
          Package
        </InputLabel>

        <Select
          value={value}
          label="Package"
          onChange={(e) => {
            const id = e.target.value;

            const pkg =
              packages?.find(
                (p) => p.id === id,
              );

            if (pkg) {
              onChange(id, pkg);
            }
          }}
        >
          {(packages ?? []).map((pkg) => (
            <MenuItem
              key={pkg.id}
              value={pkg.id}
            >
              {pkg.name}
              {" • "}
              {pkg.downloadMbps}/
              {pkg.uploadMbps} Mbps
              {" • ₹"}
              {pkg.monthlyPrice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}