import passportVerifier from './passportVerifier';
import { AnyProfile } from './types';

const profileToUserParams = (profile: AnyProfile) => {
  const email = profile.emails[0].value;
  const { familyName, givenName } = profile.name;
  const avatar = profile.photos[0].value;
  const googleId = profile.id;

  return {
    email,
    firstName: givenName,
    lastName: familyName,
    avatar,
    google: {
      id: googleId,
    },
  };
};

const verifyGoogle = passportVerifier(profileToUserParams);

export default verifyGoogle;
