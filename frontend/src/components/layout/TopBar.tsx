import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function TopBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          OrangeERP
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="body2">
          Enterprise ISP Management Platform
        </Typography>
      </Toolbar>
    </AppBar>
  );
}