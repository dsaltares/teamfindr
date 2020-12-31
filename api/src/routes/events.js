const PostEventController = require('../controllers/events/postEvent');
const GetEventsController = require('../controllers/events/getEvents');

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
  ],
};

module.exports = usersRoutes;
