import { loggers } from 'winston';
import { ServiceDependencies } from '../setup/setupServiceDependencies';
import formatEvent from '../utils/formatEvent';

interface UpdateEventParams {
  userId: string;
  eventId: string;
  updates: {
    canceledAt?: string;
  };
}

const updateEvent = ({
  logger,
  eventCollection,
}: ServiceDependencies) => async ({
  userId,
  eventId,
  updates,
}: UpdateEventParams) => {
  logger.info('updating event', { userId, eventId });
  const setFields: any = {};
  if (updates.canceledAt) {
    setFields.canceledAt = new Date(updates.canceledAt);
  }

  if (Object.keys(setFields).length > 0) {
    setFields.updatedAt = new Date();
  }

  const { value: updatedEvent } = await eventCollection.findOneAndUpdate(
    { _id: eventId },
    {
      $set: setFields,
    },
    { returnOriginal: false }
  );
  return formatEvent(updatedEvent);
};

export default updateEvent;
