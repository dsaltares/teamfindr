const passportVerifier = require('./passportVerifier');
const splitFullName = require('../utils/splitFullName');

const profileToUserParams = (profile) => {
  const email = profile.emails[0].value;
  const avatar = profile.photos[0].value;
  const twitterId = profile.id;
  const twitterHandle = profile.username;

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

module.exports = verifyTwitter;
