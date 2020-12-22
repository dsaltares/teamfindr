const deserializeUser = ({ getUserById }) => async (id, done) => {
  const user = await getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('Failed to deserialize user'));
  }
};

module.exports = deserializeUser;
