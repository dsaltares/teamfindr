import { createStore, thunk, action, computed } from 'easy-peasy';
import axios from 'axios';
import StoreModel from './model';

const store = createStore<StoreModel>({
  user: undefined,
  status: undefined,
  authenticated: computed((state) => !!state.user),
  authenticating: computed((state) => state.status === 'Authenticating'),
  loginStart: action((state) => {
    state.status = 'Authenticating';
  }),
  loginSuccess: action((state, user) => {
    state.status = 'Success';
    state.user = user;
  }),
  loginError: action((state) => {
    state.status = 'Error';
    state.user = undefined;
  }),
  login: thunk(async (actions) => {
    actions.loginStart();
    try {
      const response = await axios.get('http://localhost:5000/auth/success', {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });

      actions.loginSuccess(response.data.user);

      axios.get('http://localhost:5000/', {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
    } catch (error) {
      actions.loginError();
    }
  }),
  loginViaTwitter: action((state) => {
    window.open('http://localhost:5000/auth/twitter', '_self');
  }),
  loginViaFacebook: action((state) => {
    window.open('http://localhost:5000/auth/facebook', '_self');
  }),
  logout: action((state) => {
    window.open('http://localhost:5000/auth/logout', '_self');
    state.user = undefined;
  }),
});

export default store;
