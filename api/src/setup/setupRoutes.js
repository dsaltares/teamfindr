const rootRoutes = require('../routes/root');
const authRoutes = require('../routes/auth');
const usersRoutes = require('../routes/users');
const venueRoutes = require('../routes/venues');
const eventRoutes = require('../routes/events');
const participantRoutes = require('../routes/participants');
const makeController = require('./makeController');
const withAuthenticatedUser = require('../utils/withAuthenticatedUser');
const withAdminUser = require('../utils/withAdminUser');

const decorators = [
  {
    name: 'requiresAuthentication',
    fn: withAuthenticatedUser,
  },
  {
    name: 'requiresAdmin',
    fn: withAdminUser,
  },
];

const getController = ({ route, services }) => {
  if (route.controller) {
    const controller = decorators.reduce(
      (acc, decorator) => (route[decorator.name] ? decorator.fn(acc) : acc),
      route.controller(services)
    );
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

const allRoutes = [
  rootRoutes,
  authRoutes,
  usersRoutes,
  venueRoutes,
  eventRoutes,
  participantRoutes,
];

const setupRoutes = ({ app, services }) => {
  allRoutes.forEach(({ basePath, routes }) => {
    addRoutes({
      app,
      basePath,
      routes: routes(services.config),
      services,
    });
  });
};

module.exports = setupRoutes;
