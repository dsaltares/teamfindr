const RootController = require('../controllers/root/root');

const authRoutes = {
  basePath: '',
  routes: [
    {
      method: 'get',
      path: '',
      controller: RootController,
    },
  ],
};

module.exports = authRoutes;
