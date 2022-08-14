import passportVerifier from './passportVerifier';
import type { AnyProfile } from './types';

const profileToUserParams = (profile: AnyProfile) => {
  const email = profile.emails?.[0]?.value;

  if (!profile.name) {
    return null;
  }

  const { familyName, givenName } = profile?.name;

  if (!email || !familyName || !givenName) {
    return null;
  }

  const avatar = profile.photos?.[0]?.value || '';
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
