const verifyController = () => (req) => {
  return {
    status: 200,
    body: {
      user: req.user,
      cookies: req.cookies,
    },
  };
};

module.exports = verifyController;
