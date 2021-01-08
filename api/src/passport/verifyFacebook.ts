import passportVerifier from './passportVerifier';
import splitFullName from '../utils/splitFullName';
import { AnyProfile } from './types';

const profileToUserParams = (profile: AnyProfile) => {
  const email = profile.emails[0].value;
  const avatar = profile.photos[0].value;
  const facebookId = profile.id;

  return {
    email,
    ...splitFullName(profile.displayName),
    avatar,
    facebook: {
      id: facebookId,
    },
  };
};

const verifyFacebook = passportVerifier(profileToUserParams);

export default verifyFacebook;
