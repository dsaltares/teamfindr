import { Services } from '../../setup/setupServices';
import { Subscriber } from '../../utils/eventEmitter';
import onParticipantsJoined from './onParticipantsJoined';
import onParticipantsLeft from './onParticipantsLeft';
import onEventCanceled from './onEventCanceled';

const notifications = (subscribe: Subscriber) => (services: Services) => {
  subscribe('Participants:Left', onParticipantsLeft(services));
  subscribe('Participants:Joined', onParticipantsJoined(services));
  subscribe('Event:Canceled', onEventCanceled(services));
};

export default notifications;
