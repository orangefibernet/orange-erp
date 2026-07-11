import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f57c00',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f6fa',
    },
  },

  shape: {
    borderRadius: 8,
  },
});

export default theme;