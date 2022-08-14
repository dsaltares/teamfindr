import splitFullName from '@lib/utils/splitFullName';
import passportVerifier from './passportVerifier';
import type { AnyProfile } from './types';

const profileToUserParams = (profile: AnyProfile) => {
  const email = profile.emails?.[0]?.value;
  if (!email || !profile.displayName) {
    return null;
  }

  const avatar = profile.photos?.[0]?.value || '';
  const twitterId = profile.id;
  const twitterHandle = profile.username as string;

  return {
    email,
    ...splitFullName(profile.displayName),
    avatar,
    twitter: {
      id: twitterId,
      handle: twitterHandle,
    },
  };
};

const verifyTwitter = passportVerifier(profileToUserParams);

export default verifyTwitter;
