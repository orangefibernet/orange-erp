import Chip from "@mui/material/Chip";

interface Props {
  online: boolean;
}

export default function OnuStatusChip({
  online,
}: Props) {
  return (
    <Chip
      size="small"
      label={
        online ? "ONLINE" : "OFFLINE"
      }
      color={
        online ? "success" : "error"
      }
      variant="filled"
      sx={{
        minWidth: 90,
        fontWeight: 600,
      }}
    />
  );
}