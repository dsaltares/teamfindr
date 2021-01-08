import { ControllerCreator } from '../controller';

const GetVenuesController: ControllerCreator = ({ getVenueById }) => async ({
  params: { venueId },
}) => {
  const venue = await getVenueById(venueId);
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

export default GetVenuesController;
