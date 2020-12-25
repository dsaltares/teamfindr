const GetLocationController = require('../controllers/location/getLocation');

const locationRoutes = {
  basePath: '/location',
  routes: [
    {
      method: 'get',
      path: '',
      controller: GetLocationController,
      requiresAuthentication: true,
    },
  ],
};

module.exports = locationRoutes;
