import { Thunk, Action, Computed, thunk, action, computed } from 'easy-peasy';
import { Injections } from '../services';
import { User, AuthProvider } from '../types';

interface AuthModel {
  user: User | undefined;
  status: undefined | 'Authenticating' | 'Success' | 'Error';
  authenticated: Computed<AuthModel, boolean>;
  authenticating: Computed<AuthModel, boolean>;
  authenticateStart: Action<AuthModel>;
  authenticateSuccess: Action<AuthModel, User>;
  authenticateError: Action<AuthModel>;
  authenticate: Thunk<AuthModel, undefined, Injections>;
  loginViaSocialMedia: Thunk<AuthModel, AuthProvider, Injections>;
  logoutDone: Action<AuthModel>;
  logout: Thunk<AuthModel, undefined, Injections>;
}

const model: AuthModel = {
  user: undefined,
  status: undefined,
  authenticated: computed((state) => !!state.user),
  authenticating: computed(
    (state) => !state.status || state.status === 'Authenticating'
  ),
  authenticateStart: action((state) => {
    state.status = 'Authenticating';
  }),
  authenticateSuccess: action((state, user) => {
    state.status = 'Success';
    state.user = user;
  }),
  authenticateError: action((state) => {
    state.status = 'Error';
    state.user = undefined;
  }),
  authenticate: thunk(async (actions, payload, { injections }) => {
    actions.authenticateStart();
    try {
      const user = await injections.authService.verify();
      actions.authenticateSuccess(user);
    } catch (error) {
      actions.authenticateError();
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
};

export default model;
