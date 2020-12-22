const getConfig = require('./getConfig');
const setupServices = require('./setupServices');
const setupPassport = require('./setupPassport');
const setupApp = require('./setupApp');
const setupRoutes = require('./setupRoutes');

const startServer = async () => {
  const config = await getConfig();
  const services = await setupServices(config);
  const app = setupApp(config);

  setupPassport(services);
  setupRoutes({ app, services });

  const port = services.config.port;
  app.listen(port, () => console.log(`server running on port ${port}`));
};

module.exports = startServer;
