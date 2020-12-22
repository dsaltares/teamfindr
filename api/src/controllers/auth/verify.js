const verifyController = () => (req) => {
  if (req.user) {
    return {
      status: 200,
      body: {
        user: req.user,
        cookies: req.cookies,
      },
    };
  }

  return {
    status: 401,
    body: { message: 'user failed to authenticate' },
  };
};

module.exports = verifyController;
