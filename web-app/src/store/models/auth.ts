import { Thunk, Action, Computed, thunk, action, computed } from 'easy-peasy';
import { Injections } from '../services';
import { User, AuthProvider } from '../types';

interface AuthModel {
  user: User | undefined;
  status: undefined | 'Authenticating' | 'Success' | 'Error';
  authenticated: Computed<AuthModel, boolean>;
  authenticating: Computed<AuthModel, boolean>;
  loginStart: Action<AuthModel>;
  loginSuccess: Action<AuthModel, User>;
  loginError: Action<AuthModel>;
  login: Thunk<AuthModel, undefined, Injections>;
  loginViaSocialMedia: Thunk<AuthModel, AuthProvider, Injections>;
  logoutDone: Action<AuthModel>;
  logout: Thunk<AuthModel, undefined, Injections>;
  counter: number;
  increment: Action<AuthModel>;
}

const model: AuthModel = {
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
  login: thunk(async (actions, payload, { injections }) => {
    actions.loginStart();
    try {
      const user = await injections.authService.verify();
      actions.loginSuccess(user);
    } catch (error) {
      actions.loginError();
    }
  }),
  loginViaSocialMedia: thunk((actions, provider, { injections }) => {
    injections.authService.openIdpAuthPage(provider);
  }),
  logoutDone: action((state) => {
    state.user = undefined;
  }),
  logout: thunk((actions, payload, { injections }) => {
    actions.logoutDone();
    injections.authService.logout();
  }),
  counter: 0,
  increment: action((state) => {
    state.counter += 1;
  }),
};

export default model;
