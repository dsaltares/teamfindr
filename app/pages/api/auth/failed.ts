import createRoute from '@lib/api/createRoute';

export default createRoute([
  {
    method: 'get',
    handler: () => ({
      status: 401,
      body: { message: 'Failed to authenticate' },
    }),
    requiresAuth: false,
  },
]);
