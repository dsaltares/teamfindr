import { Thunk, Action, Computed } from 'easy-peasy';

interface User {}

interface StoreModel {
  user: User | undefined;
  status: undefined | 'Authenticating' | 'Success' | 'Error';
  authenticated: Computed<StoreModel, boolean>;
  authenticating: Computed<StoreModel, boolean>;
  loginStart: Action<StoreModel>;
  loginSuccess: Action<StoreModel, User>;
  loginError: Action<StoreModel>;
  login: Thunk<StoreModel>;
  loginViaTwitter: Action<StoreModel>;
  loginViaFacebook: Action<StoreModel>;
  logout: Action<StoreModel>;
}

export default StoreModel;
