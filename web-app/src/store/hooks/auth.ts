import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from '../models';

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export const useUser = () => useStoreState((state) => state.auth.user);
export const useLogin = () => useStoreActions((actions) => actions.auth.login);
export const useLogout = () =>
  useStoreActions((actions) => actions.auth.logout);
export const useLoginViaFacebook = () =>
  useStoreActions((actions) => actions.auth.loginViaFacebook);
export const useLoginViaTwitter = () =>
  useStoreActions((actions) => actions.auth.loginViaTwitter);
export const useLoginViaGoogle = () =>
  useStoreActions((actions) => actions.auth.loginViaGoogle);
export const useIncrement = () =>
  useStoreActions((actions) => actions.auth.increment);

export const useAuthenticated = () =>
  useStoreState((state) => state.auth.authenticated);
export const useAuthenticating = () =>
  useStoreState((state) => state.auth.authenticating);
export const useCounter = () => useStoreState((state) => state.auth.counter);
