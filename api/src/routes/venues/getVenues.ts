import { ControllerCreator } from '../controller';

const GetVenuesController: ControllerCreator = ({ searchVenues }) => async ({
  query,
}) => {
  const venues = await searchVenues(query);
  return {
    status: 200,
    body: { venues },
  };
};

export default GetVenuesController;
