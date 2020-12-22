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

const verifyFacebook = ({ getUserByEmail, createUser }) => async (
  _accessToken,
  _refreshToken,
  profile,
  done
) => {
  const params = profileToUserParams(profile);
  const existingUser = await getUserByEmail(params.email);
  if (existingUser) {
    done(null, existingUser);
    return;
  }

  const newUser = await createUser(params);
  done(null, newUser);
};

module.exports = verifyFacebook;
