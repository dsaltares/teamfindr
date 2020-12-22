const serializeUser = () => (user, done) => {
  done(null, user.id);
};

module.exports = serializeUser;
