const passportVerifier = require('./passportVerifier');
const splitFullName = require('../utils/splitFullName');

const profileToUserParams = (profile) => {
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

module.exports = verifyFacebook;
