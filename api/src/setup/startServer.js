const getConfig = require('./getConfig');
const setupLogger = require('./setupLogger');
const setupServices = require('./setupServices');
const setupPassport = require('./setupPassport');
const setupApp = require('./setupApp');
const setupRoutes = require('./setupRoutes');

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

module.exports = startServer;
