import { Services } from '../setup/setupServices';
import { EventHandler } from '../utils/eventEmitter';

export type EventHandlerCreator = (services: Services) => EventHandler;
