import { ControllerCreator } from '../controller';

const GetEventsController: ControllerCreator = ({ searchEvents }) => async ({
  query,
  user,
}) => {
  const events = await searchEvents({ query, userId: user.id });
  return {
    status: 200,
    body: { events },
  };
};

export default GetEventsController;
