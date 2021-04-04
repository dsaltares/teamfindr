import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ThemeProvider from './ThemeProvider';
import ServicesProvider from './ServicesProvider';
import SocketProvider from './SocketProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 12 * 60 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: 'always',
      refetchOnMount: true,
      keepPreviousData: true,
    },
  },
});

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
