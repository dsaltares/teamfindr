import PostVenueController from './postVenue';
import GetVenuesController from './getVenues';
import GetVenueController from './getVenue';

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

export default usersRoutes;
