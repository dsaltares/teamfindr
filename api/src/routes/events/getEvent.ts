import { ControllerCreator } from '../controller';

const GetEventsController: ControllerCreator = ({ getEventById }) => async ({
  params: { eventId },
}) => {
  const event = await getEventById(eventId);
  if (!event) {
    return {
      status: 404,
      body: { message: 'event not found' },
    };
  }
  return {
    status: 200,
    body: { event },
  };
};

export default GetEventsController;
