import createRoute, { type Handler } from '@lib/api/createRoute';
import getVenueById from '@lib/data/getVenueById';

const getVenueHandler: Handler = async ({ query: { venueId } }) => {
  const venue = await getVenueById(venueId as string);
  if (!venue) {
    return {
      status: 404,
      body: { message: 'venue not found' },
    };
  }
  return {
    status: 200,
    body: { venue },
  };
};

export default createRoute([
  {
    method: 'get',
    handler: getVenueHandler,
    requiresAuth: false,
  },
]);
