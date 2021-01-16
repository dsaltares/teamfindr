import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ThemeProvider from './ThemeProvider';
import ServicesProvider from './ServicesProvider';
import SocketProvider from './SocketProvider';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactElement | React.ReactElement[];
}

const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ServicesProvider>
        <SnackbarProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SocketProvider>{children}</SocketProvider>
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </ServicesProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default React.memo(Providers);
