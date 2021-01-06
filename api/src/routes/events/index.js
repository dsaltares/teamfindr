const PostEventController = require('./postEvent');
const GetEventsController = require('./getEvents');
const GetEventController = require('./getEvent');

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

module.exports = usersRoutes;
