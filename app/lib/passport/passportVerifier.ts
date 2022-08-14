import createUser from '@lib/data/createUser';
import getUserByEmail from '@lib/data/getUserByEmail';
import logger from '@lib/logger';
import type { AnyProfile, DoneFn, ProfileToUserParamsFn } from './types';

const passportVerifier =
  (profileToUserParams: ProfileToUserParamsFn) =>
  async (
    _accessToken: string,
    _refreshToken: string,
    profile: AnyProfile,
    done: DoneFn
  ) => {
    const params = profileToUserParams(profile);
    if (!params) {
      logger.error('invalid profile', { profile });
      done(new Error('cannot create user, invalid profile'));
      return;
    }
    const existingUser = await getUserByEmail(params.email);
    if (existingUser) {
      done(null, existingUser);
      return;
    }

    const newUser = await createUser(params);
    done(null, newUser);
  };

export default passportVerifier;
