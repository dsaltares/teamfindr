const PostEventController = require('../controllers/events/postEvent');

const usersRoutes = {
  basePath: '/events',
  routes: () => [
    {
      method: 'post',
      path: '',
      controller: PostEventController,
      requiresAuthentication: true,
    },
  ],
};

module.exports = usersRoutes;
