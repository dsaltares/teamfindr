const PostVenueController = require('./postVenue');
const GetVenuesController = require('./getVenues');
const GetVenueController = require('./getVenue');

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
