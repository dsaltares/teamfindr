const passportVerifier = require('./passportVerifier');

const profileToUserParams = (profile) => {
  const email = profile.emails[0].value;
  const name = profile.displayName;
  const avatar = profile.photos[0].value;
  const googleId = profile.id;

  return {
    email,
    name,
    avatar,
    google: {
      id: googleId,
    },
  };
};

const verifyGoogle = passportVerifier(profileToUserParams);

module.exports = verifyGoogle;
