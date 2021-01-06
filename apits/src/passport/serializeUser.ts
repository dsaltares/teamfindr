const serializeUser = () => (user, done) => {
  done(null, user.id);
};

export default serializeUser;
