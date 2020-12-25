const passportVerifier = require('./passportVerifier');

const profileToUserParams = (profile) => {
  const email = profile.emails[0].value;
  const name = profile.displayName;
  const avatar = profile.photos[0].value;
  const instagramId = profile.id;

  return {
    email,
    name,
    avatar,
    instagram: {
      id: instagramId,
    },
  };
};

const verifyInstagram = passportVerifier(profileToUserParams);

module.exports = verifyInstagram;
