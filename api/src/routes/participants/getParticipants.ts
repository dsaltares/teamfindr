import { ControllerCreator } from '../controller';

const GetParticipantsController: ControllerCreator = ({
  getEventById,
  getParticipants,
}) => async ({ params: { eventId } }) => {
  const event = await getEventById(eventId);
  if (!event) {
    return {
      status: 404,
      body: { message: 'Event not found' },
    };
  }

  const participants = await getParticipants(eventId);
  return {
    status: 200,
    body: { participants },
  };
};

export default GetParticipantsController;
