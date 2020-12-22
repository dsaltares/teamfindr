const rootRoutes = require('../routes/root');
const authRoutes = require('../routes/auth');
const makeController = require('./makeController');

const addRoutes = ({ app, basePath, routes, services }) => {
  routes.forEach((route) => {
    const fullPath = `${basePath}/${route.path}`;
    const controller = route.controller
      ? makeController(route.controller(services))
      : route.handler;

    services.logger.info('setting up route', {
      method: route.method,
      path: fullPath,
    });
    app[route.method](fullPath, controller);
  });
};

const allRoutes = [rootRoutes, authRoutes];

const setupRoutes = ({ app, services }) => {
  allRoutes.forEach(({ basePath, routes }) => {
    addRoutes({
      app,
      basePath,
      routes,
      services,
    });
  });
};

module.exports = setupRoutes;
