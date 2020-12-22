import { Thunk, Action, Computed, thunk, action, computed } from 'easy-peasy';
import { Injections } from '../services';
import { User } from '../types';

interface AuthModel {
  user: User | undefined;
  status: undefined | 'Authenticating' | 'Success' | 'Error';
  authenticated: Computed<AuthModel, boolean>;
  authenticating: Computed<AuthModel, boolean>;
  loginStart: Action<AuthModel>;
  loginSuccess: Action<AuthModel, User>;
  loginError: Action<AuthModel>;
  login: Thunk<AuthModel, undefined, Injections>;
  loginViaTwitter: Thunk<AuthModel, undefined, Injections>;
  loginViaFacebook: Thunk<AuthModel, undefined, Injections>;
  loginViaGoogle: Thunk<AuthModel, undefined, Injections>;
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
  loginViaTwitter: thunk((actions, payload, { injections }) => {
    injections.authService.openTwitterAuthPage();
  }),
  loginViaFacebook: thunk((actions, payload, { injections }) => {
    injections.authService.openFacebookAuthPage();
  }),
  loginViaGoogle: thunk((actions, payload, { injections }) => {
    injections.authService.openGoogleAuthPage();
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
