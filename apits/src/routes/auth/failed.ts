const failedController = () => () => ({
  status: 401,
  body: { message: 'user failed to authenticate' },
});

export default failedController;
