const PatchUserController = require('./patchUser');

const usersRoutes = {
  basePath: '/users',
  routes: () => [
    {
      method: 'patch',
      path: ':userId',
      controller: PatchUserController,
      requiresAuthentication: true,
    },
  ],
};

module.exports = usersRoutes;
