const logoutController = ({ config }) => (req) => {
  req.logout();
  return {
    redirect: config.clientUrl,
  };
};

module.exports = logoutController;
