import 'newrelic';
import { createServer } from 'http';
import getConfig from './getConfig';
import setupLogger from './setupLogger';
import setupServiceDependencies from './setupServiceDependencies';
import createIndexes from './createIndexes';
import setupServices from './setupServices';
import setupPassport from './setupPassport';
import setupApp from './setupApp';
import setupRoutes from './setupRoutes';
import setupEventHandlers from './setupEventHandlers';
import setupSocket from './setupSocket';

const startServer = async () => {
  const config = await getConfig();
  const logger = setupLogger(config);
  const dependencies = await setupServiceDependencies({ config, logger });
  await createIndexes(dependencies);
  const services = setupServices(dependencies);
  const app = setupApp(config, logger);
  const server = createServer(app);

  setupSocket(dependencies, server);
  setupPassport(services);
  setupRoutes({ app, services });
  setupEventHandlers(dependencies.subscribe, services);

  const port = config.port;
  server.listen(port, () => logger.info(`server started on port ${port}`));
};

export default startServer;
