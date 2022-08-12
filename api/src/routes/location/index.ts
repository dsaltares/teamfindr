import GetLocationController from './getLocation';
import { RouteDefinitions } from '../routeDef';

const locationRoutes: RouteDefinitions = {
  basePath: '/location',
  routes: () => [
    {
      method: 'get',
      path: '',
      controller: GetLocationController,
    },
  ],
};

export default locationRoutes;
