import PostVenueController from './postVenue';
import GetVenuesController from './getVenues';
import GetVenueController from './getVenue';
import { RouteDefinitions } from '../routeDef';

const venueRoutes: RouteDefinitions = {
  basePath: '/venues',
  routes: () => [
    {
      method: 'post',
      path: '',
      controller: PostVenueController,
      requiresAuthentication: true,
    },
    {
      method: 'get',
      path: '',
      controller: GetVenuesController,
    },
    {
      method: 'get',
      path: ':venueId',
      controller: GetVenueController,
    },
  ],
};

export default venueRoutes;
