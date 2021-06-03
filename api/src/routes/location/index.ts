import GetLocationController from './getLocation';
import { RouteDefinitions } from '../routeDef';

const participantRoutes: RouteDefinitions = {
  basePath: '/location',
  routes: () => [
    {
      method: 'get',
      path: '',
      controller: GetLocationController,
    },
  ],
};

export default participantRoutes;
