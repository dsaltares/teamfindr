import PostEventController from './postEvent';
import GetEventsController from './getEvents';
import GetEventController from './getEvent';
import PatchEventController from './patchEvent';
import { RouteDefinitions } from '../routeDef';

const eventRoutes: RouteDefinitions = {
  basePath: '/events',
  routes: () => [
    {
      method: 'post',
      path: '',
      controller: PostEventController,
      requiresAuthentication: true,
    },
    {
      method: 'get',
      path: '',
      controller: GetEventsController,
      requiresAuthentication: true,
    },
    {
      method: 'get',
      path: ':eventId',
      controller: GetEventController,
      requiresAuthentication: true,
    },
    {
      method: 'patch',
      path: ':eventId',
      controller: PatchEventController,
      requiresAuthentication: true,
    },
  ],
};

export default eventRoutes;
