const withAdminUser = (controller) => (req) => {
  const { user } = req;
  console.log('user: ', user);
  if (!user || !user.roles.includes('admin')) {
    return {
      status: 403,
      body: { message: 'user is not an admin' },
    };
  }

  return controller(req);
};

module.exports = withAdminUser;
