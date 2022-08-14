import logger from '@lib/logger';
import formatEvent from '@lib/utils/formatEvent';
import mongodb from './mongodb';

interface UpdateEventParams {
  userId: string;
  eventId: string;
  updates: {
    canceledAt?: string;
  };
}

const updateEvent = async ({ userId, eventId, updates }: UpdateEventParams) => {
  logger.info('updating event', { userId, eventId });
  const setFields: any = {};
  if (updates.canceledAt) {
    setFields.canceledAt = new Date(updates.canceledAt);
  }

  if (Object.keys(setFields).length > 0) {
    setFields.updatedAt = new Date();
  }

  const db = await mongodb;
  const { value: updatedEvent } = await db.collection('Event').findOneAndUpdate(
    { _id: eventId },
    {
      $set: setFields,
    }
  );
  return formatEvent(updatedEvent);
};

export default updateEvent;
