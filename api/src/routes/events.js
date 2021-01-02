const PostEventController = require('../controllers/events/postEvent');
const GetEventsController = require('../controllers/events/getEvents');
const GetEventController = require('../controllers/events/getEvent');

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
