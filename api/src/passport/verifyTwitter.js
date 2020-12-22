const passportVerifier = require('./passportVerifier');

const profileToUserParams = (profile) => {
  const email = profile.emails[0].value;
  const name = profile.displayName;
  const avatar = profile.photos[0].value;
  const twitterId = profile.id;
  const twitterHandle = profile.username;

  return {
    email,
    name,
    avatar,
    twitter: {
      id: twitterId,
      handle: twitterHandle,
    },
  };
};

const verifyTwitter = passportVerifier(profileToUserParams);

module.exports = verifyTwitter;
