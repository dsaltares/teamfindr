import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import ThemeProvider from './components/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <CssBaseline />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
