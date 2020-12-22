const passportVerifier = require('./passportVerifier');

const profileToUserParams = (profile) => {
  const email = profile.emails[0].value;
  const name = profile.displayName;
  const avatar = profile.photos[0].value;
  const facebookId = profile.id;

  return {
    email,
    name,
    avatar,
    facebook: {
      id: facebookId,
    },
  };
};

const verifyFacebook = passportVerifier(profileToUserParams);

module.exports = verifyFacebook;
