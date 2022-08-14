import React from 'react';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import type {} from '@material-ui/lab/themeAugmentation';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#24822B',
    },
    secondary: {
      main: '#EF2B2B',
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
    MuiLink: {
      target: '_blank',
      rel: 'nofollow noreferrer',
      underline: 'none',
    },
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
      margin: 'dense',
    },
    MuiCircularProgress: {
      color: 'primary',
    },
    MuiAutocomplete: {
      fullWidth: true,
      popupIcon: <ExpandMoreIcon />,
    },
  },
  overrides: {
    MuiPaper: {
      elevation0: {
        boxShadow: '0px 4px 21px rgba(32, 32, 32, 0.15)',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
      },
    },
    MuiAutocomplete: {
      paper: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#24822B',
      },
      popupIndicator: {
        color: '#24822B',
      },
      clearIndicator: {
        color: '#EF2B2B',
      },
    },
  },
});

const TeamFindrThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default TeamFindrThemeProvider;
