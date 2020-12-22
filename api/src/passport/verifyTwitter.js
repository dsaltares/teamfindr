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

const verifyTwitter = ({ getUserByEmail, createUser }) => async (
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

module.exports = verifyTwitter;
