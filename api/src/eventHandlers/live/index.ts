import { Services } from '../../setup/setupServices';
import { AppEvent, EventHandler, Subscriber } from '../../utils/eventEmitter';

const live = (subscribe: Subscriber) => ({
  getSocketsForUserIds,
}: Services) => {
  const events = ['Participants:Left', 'Participants:Joined'];
  const handleEvent: EventHandler = (event: AppEvent) => {
    const sockets = getSocketsForUserIds(event.users);
    sockets.forEach((socket) => socket.emit(event.name, event.payload));
  };
  events.forEach((event) => subscribe(event, handleEvent));
};

export default live;
