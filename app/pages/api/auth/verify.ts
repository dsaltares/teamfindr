import createRoute from '@lib/api/createRoute';

export default createRoute([
  {
    method: 'get',
    handler: ({ user }) => ({
      status: 200,
      body: { user },
    }),
    requiresAuth: true,
  },
]);
