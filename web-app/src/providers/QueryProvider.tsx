import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const QueryProvider: React.FC<ProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default React.memo(QueryProvider);
