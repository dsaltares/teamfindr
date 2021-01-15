import authRoutes from '../routes/auth';
import usersRoutes from '../routes/users';
import venueRoutes from '../routes/venues';
import eventRoutes from '../routes/events';
import participantRoutes from '../routes/participants';
import makeController from './makeController';
import withAuthenticatedUser from '../utils/withAuthenticatedUser';
import withAdminUser from '../utils/withAdminUser';
import withRenewSession from '../utils/withRenewSession';
import { Services } from './setupServices';
import setupApp from './setupApp';
import { Route } from '../routes/routeDef';
import { Controller } from '../routes/controller';

type ControllerDecorator = (controller: Controller) => Controller;
type NamedDecorator = {
  name: keyof Route;
  fn: ControllerDecorator;
};

const decorators: NamedDecorator[] = [
  {
    name: 'requiresAuthentication',
    fn: withAuthenticatedUser,
  },
  {
    name: 'requiresAdmin',
    fn: withAdminUser,
  },
  {
    name: 'renewSession',
    fn: withRenewSession,
  },
];

interface GetControllerParams {
  route: Route;
  services: Services;
}

const getController = ({ route, services }: GetControllerParams) => {
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

interface AddRoutesParams {
  app: ReturnType<typeof setupApp>;
  basePath: string;
  routes: Route[];
  services: Services;
}

const addRoutes = ({ app, basePath, routes, services }: AddRoutesParams) => {
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

interface SetupRouteArgs {
  app: ReturnType<typeof setupApp>;
  services: Services;
}

const setupRoutes = ({ app, services }: SetupRouteArgs) => {
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
