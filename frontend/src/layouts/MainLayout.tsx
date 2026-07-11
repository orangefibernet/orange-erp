import {
  Box,
  Toolbar,
} from '@mui/material';

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />

        OrangeERP Dashboard
      </Box>
    </Box>
  );
}