const logoutController = ({ config }) => (req) => {
  req.logout();
  return {
    redirect: config.clientUrl,
  };
};

export default logoutController;
