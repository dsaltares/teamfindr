import { Services } from '../../setup/setupServices';
import { Subscriber } from '../../utils/eventEmitter';
import onParticipantsJoined from './onParticipantsJoined';
import onParticipantsLeft from './onParticipantsLeft';

const notifications = (subscribe: Subscriber) => (services: Services) => {
  subscribe('Participants:Left', onParticipantsLeft(services));
  subscribe('Participants:Joined', onParticipantsJoined(services));
};

export default notifications;
