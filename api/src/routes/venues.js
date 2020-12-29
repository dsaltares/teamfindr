const PostVenueController = require('../controllers/venues/postVenue');
const GetVenuesController = require('../controllers/venues/getVenues');
const GetVenueController = require('../controllers/venues/getVenue');

const usersRoutes = {
  basePath: '/venues',
  routes: () => [
    {
      method: 'post',
      path: '',
      controller: PostVenueController,
      requiresAuthentication: true,
      requiresAdmin: true,
    },
    {
      method: 'get',
      path: '',
      controller: GetVenuesController,
      requiresAuthentication: true,
    },
    {
      method: 'get',
      path: ':venueId',
      controller: GetVenueController,
      requiresAuthentication: true,
    },
  ],
};

module.exports = usersRoutes;
