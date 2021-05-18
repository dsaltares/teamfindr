import React from 'react';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#24822B',
    },
    action: {
      hover: 'rgba(36, 130, 43, 0.1)',
    },
    background: {
      default: '#F7F7FC',
    },
    error: {
      main: '#EF2B2B',
      light: 'rgba(239, 43, 43, 0.1)',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    button: {
      textTransform: 'none',
    },
    h1: {
      fontSize: 55,
    },
    h2: {
      fontSize: 30,
    },
    h3: {
      fontSize: 20,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
    },
  },
  props: {
    MuiPaper: {
      elevation: 0,
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        padding: 6,
      },
    },
  },
});

const TeamFindrThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default TeamFindrThemeProvider;
