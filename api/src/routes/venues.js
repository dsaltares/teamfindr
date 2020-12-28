const PostVenueController = require('../controllers/venues/postVenue');

const usersRoutes = {
  basePath: '/venues',
  routes: [
    {
      method: 'post',
      path: '',
      controller: PostVenueController,
      requiresAuthentication: true,
      requiresAdmin: true,
    },
  ],
};

module.exports = usersRoutes;
