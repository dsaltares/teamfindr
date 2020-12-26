import React from 'react';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

const TeamFindrThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default TeamFindrThemeProvider;
