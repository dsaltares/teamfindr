import authRoutes from '../routes/auth';
import usersRoutes from '../routes/users';
import venueRoutes from '../routes/venues';
import eventRoutes from '../routes/events';
import participantRoutes from '../routes/participants';
import makeController from './makeController';
import withAuthenticatedUser from '../utils/withAuthenticatedUser';
import withAdminUser from '../utils/withAdminUser';

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

export default setupRoutes;
