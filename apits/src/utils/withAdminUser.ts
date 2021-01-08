import { Controller } from '../routes/controller';

const withAdminUser = (controller: Controller): Controller => async (req) => {
  const { user } = req;
  if (!user || !user.roles.includes('admin')) {
    return {
      status: 403,
      body: { message: 'user is not an admin' },
    };
  }

  return controller(req);
};

export default withAdminUser;
