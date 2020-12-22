const rootRoutes = require('../routes/root');
const authRoutes = require('../routes/auth');
const makeController = require('./makeController');
const withAuthenticatedUser = require('../utils/withAuthenticatedUser');

const getController = ({ route, services }) => {
  if (route.controller) {
    let controller = route.controller(services);
    if (route.requiresAuthentication) {
      controller = withAuthenticatedUser(controller);
    }
    return makeController({ controller, services });
  } else {
    return route.handler;
  }
};

const addRoutes = ({ app, basePath, routes, services }) => {
  routes.forEach((route) => {
    const fullPath = `${basePath}/${route.path}`;

    services.logger.info('setting up route', {
      method: route.method,
      path: fullPath,
    });
    app[route.method](fullPath, getController({ route, services }));
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
