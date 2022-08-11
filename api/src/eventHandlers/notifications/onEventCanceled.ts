import { EventHandlerCreator } from '../eventHandler';
import { Event } from '@lib/types';

const onEventCanceled: EventHandlerCreator = ({
  config,
  sendPushNotificationToUser,
}) => async (appEvent) => {
  const event = appEvent.payload.event as Event;
  const createdBy = event.createdBy;
  const userIds = appEvent.users.filter(
    (userId) => userId !== event.createdBy.id
  );
  await Promise.all(
    userIds.map((userId) =>
      sendPushNotificationToUser({
        userId,
        message: {
          title: `${event.sport} at ${event.venue.name}`,
          body: `${createdBy.firstName} ${createdBy.lastName} canceled the event`,
          url: `${config.clientUrl}/#/events/${event.id}`,
          original: appEvent.payload,
        },
      })
    )
  );
};

export default onEventCanceled;
