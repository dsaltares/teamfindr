import { Services } from '../../setup/setupServices';
import { AppEvent, EventHandler, Subscriber } from '../../utils/eventEmitter';
import withInstrumentation from '../withInstrumentation';

const live = (subscribe: Subscriber) => ({
  logger,
  getSocketsForUserIds,
}: Services) => {
  const events = ['Participants:Left', 'Participants:Joined', 'Event:Updated'];
  const handleEvent: EventHandler = withInstrumentation(
    'live',
    async (event: AppEvent) => {
      logger.info('sending socket event', {
        eventName: event.name,
        users: event.users,
      });
      const sockets = getSocketsForUserIds(event.users);
      sockets.forEach((socket) => socket.emit(event.name, event.payload));
    }
  );
  events.forEach((event) => subscribe(event, handleEvent));
};

export default live;
