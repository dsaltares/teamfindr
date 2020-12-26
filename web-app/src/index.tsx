import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'typeface-roboto';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './providers/ThemeProvider';
import ServicesProvider from './providers/ServicesProvider';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider>
        <ServicesProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ServicesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
