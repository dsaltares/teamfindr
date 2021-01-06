import PatchUserController from './patchUser';

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

export default usersRoutes;
