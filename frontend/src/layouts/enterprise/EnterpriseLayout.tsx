import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { Outlet } from "react-router-dom";

import TopBar from "../../components/layout/TopBar";
import Sidebar from "../../components/navigation/Sidebar";

export default function EnterpriseLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}