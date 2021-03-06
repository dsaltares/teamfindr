import { EventHandlerCreator } from '../eventHandler';

const onParticipantsJoined: EventHandlerCreator = ({
  config,
  sendPushNotificationToUser,
}) => async (appEvent) => {
  const payload = appEvent.payload;
  const userIds = appEvent.users.filter(
    (userId) => userId !== payload.participant.user.id
  );
  const user = payload.participant.user;
  const event = payload.event;
  await Promise.all(
    userIds.map((userId) =>
      sendPushNotificationToUser({
        userId,
        message: {
          title: `${event.sport} at ${event.venue.name}`,
          body: `${user.firstName} ${user.lastName} joined`,
          url: `${config.clientUrl}/#/events/${event.id}`,
          tag: `participants/${event.id}`,
          original: payload,
        },
      })
    )
  );
};

export default onParticipantsJoined;
