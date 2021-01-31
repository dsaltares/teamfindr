import events from 'events';

class EventEmitter extends events.EventEmitter {}

export type AppEvent = {
  name: string;
  users: string[];
  payload: any;
};

export type EventHandler = (event: AppEvent) => Promise<void>;
export type Subscriber = (name: string, handler: EventHandler) => void;

export const pushEvent = (emitter: EventEmitter) => (event: AppEvent) => {
  process.nextTick(() => {
    emitter.emit(event.name, event);
  });
};

export const subscribe = (emitter: EventEmitter): Subscriber => (
  name,
  handler
) => {
  emitter.on(name, handler);
};

export default EventEmitter;
