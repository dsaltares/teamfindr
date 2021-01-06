const verifyController = () => (req) => ({
  status: 200,
  body: {
    user: req.user,
    cookies: req.cookies,
  },
});

export default verifyController;
