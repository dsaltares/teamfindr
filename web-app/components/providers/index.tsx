import React from 'react';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ThemeProvider from './ThemeProvider';
import ServicesProvider from './ServicesProvider';
import SocketProvider from './SocketProvider';
import QueryProvider from './QueryProvider';
import AnalyticsProvider from './AnalyticsProvider';

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const Providers: React.FC<ProviderProps> = ({ children }) => (
  <AnalyticsProvider>
    <QueryProvider>
      <ThemeProvider>
        <ServicesProvider>
          <SnackbarProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <SocketProvider>{children}</SocketProvider>
            </MuiPickersUtilsProvider>
          </SnackbarProvider>
        </ServicesProvider>
      </ThemeProvider>
    </QueryProvider>
  </AnalyticsProvider>
);

export default React.memo(Providers);
