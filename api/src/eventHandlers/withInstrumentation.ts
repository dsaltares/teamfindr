import newrelic from 'newrelic';
import { EventHandler } from '../utils/eventEmitter';

const withInstrumentation = (
  prefix: string,
  handler: EventHandler
): EventHandler => (event) =>
  newrelic.startBackgroundTransaction(`${prefix}/${event.name}`, () =>
    handler(event)
  );

export default withInstrumentation;
