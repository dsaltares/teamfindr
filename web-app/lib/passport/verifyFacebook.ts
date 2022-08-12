import splitFullName from '@lib/utils/splitFullName';
import passportVerifier from './passportVerifier';
import type { AnyProfile } from './types';

const profileToUserParams = (profile: AnyProfile) => {
  const email = profile.emails?.[0]?.value;
  if (!email || !profile.displayName) {
    return null;
  }

  const avatar = profile.photos?.[0]?.value || '';
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
