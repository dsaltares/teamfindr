import PostEventController from './postEvent';
import GetEventsController from './getEvents';
import GetEventController from './getEvent';

const usersRoutes = {
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
  ],
};

export default usersRoutes;
