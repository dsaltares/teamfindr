import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import model from './store/models';

test('renders learn react link', () => {
  const injections = {
    authService: {
      openTwitterAuthPage: jest.fn(),
    },
  };
  const store = createStore(model, {
    injections,
  });
  const { getByText } = render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );

  const loginViaTwitter = getByText('Login via Twitter');
  fireEvent.click(loginViaTwitter);

  expect(injections.authService.openTwitterAuthPage).toHaveBeenCalled();
});
