import getConfig from './getConfig';
import setupLogger from './setupLogger';
import setupServices from './setupServices';
import setupPassport from './setupPassport';
import setupApp from './setupApp';
import setupRoutes from './setupRoutes';

const startServer = async () => {
  const config = await getConfig();
  const logger = setupLogger(config);
  const services = await setupServices({ config, logger });
  const app = setupApp(config);

  setupPassport(services);
  setupRoutes({ app, services });

  const port = config.port;
  app.listen(port, () => logger.info(`server started on port ${config.port}`));
};

export default startServer;
