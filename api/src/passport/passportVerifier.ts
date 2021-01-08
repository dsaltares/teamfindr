import { Services } from '../setup/setupServices';
import { AnyProfile, DoneFn, ProfileToUserParamsFn } from './types';

const passportVerifier = (profileToUserParams: ProfileToUserParamsFn) => ({
  getUserByEmail,
  createUser,
}: Services) => async (
  _accessToken: string,
  _refreshToken: string,
  profile: AnyProfile,
  done: DoneFn
) => {
  const params = profileToUserParams(profile);
  const existingUser = await getUserByEmail(params.email);
  if (existingUser) {
    done(null, existingUser);
    return;
  }

  const newUser = await createUser(params);
  done(null, newUser);
};

export default passportVerifier;
