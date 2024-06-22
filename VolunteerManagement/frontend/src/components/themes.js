import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#17252A',
      backColorMain: '#2f4050',
      backColorSecondary: '#293846'
    },
    secondary: {
      main: '#DEF2F1',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
});

export default theme;