import { Subscriber } from '../utils/eventEmitter';
import { Services } from './setupServices';
import live from '../eventHandlers/live';
import notifications from '../eventHandlers/notifications';

const setupEventHandlers = (subscribe: Subscriber, services: Services) => {
  services.logger.info('setting up event handlers');
  live(subscribe)(services);
  notifications(subscribe)(services);
};

export default setupEventHandlers;
