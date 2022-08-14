import createRoute, { type Handler } from '@lib/api/createRoute';
import createVenue from '@lib/data/createVenue';
import searchVenues from '@lib/data/searchVenues';
import { parseSearchVenuesQuery } from '@lib/utils/parseQueries';

const getVenuesHandler: Handler = async ({ query }) => {
  const venues = await searchVenues(parseSearchVenuesQuery(query));
  return {
    status: 200,
    body: { venues },
  };
};

const postVenueHandler: Handler = async ({ body: { venue }, user }) => {
  const createdVenue = await createVenue({ userId: user?.id as string, venue });
  return {
    status: 201,
    body: { venue: createdVenue },
  };
};

export default createRoute([
  {
    method: 'get',
    handler: getVenuesHandler,
    requiresAuth: false,
  },
  {
    method: 'post',
    handler: postVenueHandler,
    requiresAuth: true,
  },
]);
