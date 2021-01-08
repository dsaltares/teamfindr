import { RouteDefinitions } from '../routeDef';
import PatchUserController from './patchUser';

const usersRoutes: RouteDefinitions = {
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
