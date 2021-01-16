import { Subscriber } from '../utils/eventEmitter';
import { Services } from './setupServices';
import live from '../eventHandlers/live';

const setupEventHandlers = (subscribe: Subscriber, services: Services) => {
  live(subscribe)(services);
};

export default setupEventHandlers;
