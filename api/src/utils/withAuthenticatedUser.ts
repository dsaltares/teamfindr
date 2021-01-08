import { Controller } from '../routes/controller';

const withAuthenticatedUser = (controller: Controller): Controller => async (
  req
) => {
  if (!req.user) {
    return {
      status: 401,
      body: { message: 'user failed to authenticate' },
    };
  }

  return controller(req);
};

export default withAuthenticatedUser;
