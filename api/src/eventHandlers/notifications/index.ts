import { Services } from '../../setup/setupServices';
import { Subscriber } from '@lib/utils/eventEmitter';
import onParticipantsJoined from './onParticipantsJoined';
import onParticipantsLeft from './onParticipantsLeft';
import onEventCanceled from './onEventCanceled';
import withInstrumentation from '../withInstrumentation';

const notifications = (subscribe: Subscriber) => (services: Services) => {
  subscribe(
    'Participants:Left',
    withInstrumentation('push', onParticipantsLeft(services))
  );
  subscribe(
    'Participants:Joined',
    withInstrumentation('push', onParticipantsJoined(services))
  );
  subscribe(
    'Event:Canceled',
    withInstrumentation('push', onEventCanceled(services))
  );
};

export default notifications;
