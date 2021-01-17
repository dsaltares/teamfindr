import { EventHandlerCreator } from '../eventHandler';

const onParticipantsLeft: EventHandlerCreator = ({
  config,
  sendPushNotificationToUser,
}) => (appEvent) => {
  const payload = appEvent.payload;
  const userIds = appEvent.users.filter(
    (userId) => userId !== payload.participant.user.id
  );
  const user = payload.participant.user;
  const event = payload.event;
  userIds.forEach((userId) =>
    sendPushNotificationToUser({
      userId,
      message: {
        title: `${event.sport} at ${event.venue.name}`,
        body: `${user.firstName} ${user.lastName} left`,
        url: `${config.clientUrl}/#/events/${event.id}`,
        tag: `participants/${event.id}`,
        original: payload,
      },
    })
  );
};

export default onParticipantsLeft;
