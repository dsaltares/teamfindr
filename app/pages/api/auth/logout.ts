import createRoute from '@lib/api/createRoute';
import Config from '@lib/config';

export default createRoute([
  {
    method: 'get',
    handler: (req) => {
      req.logout();
      return {
        status: 307,
        redirect: Config.hostUrl,
      };
    },
    requiresAuth: false,
  },
]);
