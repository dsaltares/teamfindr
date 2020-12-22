const makeController = (controller) => async (req, res) => {
  try {
    const response = await controller(req);
    const { status, body, redirect } = response;
    if (status) {
      res.status(status);
    }
    if (redirect) {
      res.redirect(redirect);
    }
    if (body) {
      res.json(body);
    }
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Unhandled error';
    res.status(status).json({ message });
  }
};

module.exports = makeController;
