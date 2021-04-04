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
  },
  typography: {
    fontFamily: 'Poppins',
    button: {
      textTransform: 'none',
    },
  },
});

const TeamFindrThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default TeamFindrThemeProvider;
