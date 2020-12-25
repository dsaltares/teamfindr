import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from '../models';

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export const useUser = () => useStoreState((state) => state.auth.user);
export const useAuthenticate = () =>
  useStoreActions((actions) => actions.auth.authenticate);
export const useLogout = () =>
  useStoreActions((actions) => actions.auth.logout);
export const useLoginViaSocialMedia = () =>
  useStoreActions((actions) => actions.auth.loginViaSocialMedia);

export const useAuthenticated = () =>
  useStoreState((state) => state.auth.authenticated);
export const useAuthenticating = () =>
  useStoreState((state) => state.auth.authenticating);

export const useChangeAvatar = () =>
  useStoreActions((actions) => actions.auth.changeAvatar);
export const useChangingAvatar = () =>
  useStoreState((state) => state.auth.changingAvatar);
