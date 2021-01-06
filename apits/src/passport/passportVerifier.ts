const passportVerifier = (profileToUserParams) => ({
  getUserByEmail,
  createUser,
}) => async (_accessToken, _refreshToken, profile, done) => {
  const params = profileToUserParams(profile);
  const existingUser = await getUserByEmail(params.email);
  if (existingUser) {
    done(null, existingUser);
    return;
  }

  const newUser = await createUser(params);
  done(null, newUser);
};

export default passportVerifier;
