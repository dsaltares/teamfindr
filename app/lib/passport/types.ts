import type TwitterPassport from 'passport-twitter';
import type FacebookPassport from 'passport-facebook';
import type GooglePassport from 'passport-google-oauth20';
import type { User } from '@lib/types';

export type DoneFn = (error: Error | null, user?: User) => void;

export type AnyProfile =
  | FacebookPassport.Profile
  | TwitterPassport.Profile
  | GooglePassport.Profile;

export interface UserParams {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  facebook?: {
    id: string;
  };
  google?: {
    id: string;
  };
  twitter?: {
    id: string;
    handle: string;
  };
}

export type ProfileToUserParamsFn = (profile: AnyProfile) => UserParams | null;
